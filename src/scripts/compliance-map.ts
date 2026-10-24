import earcut, { flatten } from 'earcut';
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  Group,
  LineBasicMaterial,
  BackSide,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Quaternion,
  Raycaster,
  Scene,
  ShaderMaterial,
  SphereGeometry,
  Vector2,
  Vector3,
  WebGLRenderer,
} from 'three';
import worldFile from '../data/world-polygons.json';

interface WorldCountry {
  id: string;
  lon: number;
  lat: number;
  small: boolean;
  parts: number[][][][];
}

interface WorldFile {
  notice: string;
  countries: WorldCountry[];
}

interface Payload {
  cc: string;
  name: string;
  region: string;
  must: number;
  isos: string[];
  lat: number;
  lon: number;
  small: boolean;
  href: string;
  flag: string;
}

interface Market {
  cc: string;
  name: string;
  region: string;
  must: number;
  href: string;
  flag: string;
  lat: number;
  lon: number;
  meshes: Mesh[];
  lines: LineSegments | null;
  marker: Group | null;
}

interface Turn {
  fromQ: Quaternion;
  toQ: Quaternion;
  fromX: number;
  fromY: number;
  fromMul: number;
  toMul: number;
  t0: number;
  dur: number;
  resume: boolean;
}

const world = worldFile as WorldFile;
const HOME_LAT = 18;
const HOME_LON = 105;
const LAND_R = 1;
const ACTIVE_R = 1.008;
const BORDER_R = 1.02;
const MARKER_R = 1.055;

const LAND_VERT = `
  varying vec3 vNormal;
  varying vec3 vWorld;
  void main() {
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorld = worldPos.xyz;
    vNormal = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

const LAND_FRAG = `
  varying vec3 vNormal;
  varying vec3 vWorld;
  uniform vec3 uColor;
  uniform float uOpacity;
  uniform float uGlow;
  void main() {
    vec3 n = normalize(vNormal);
    vec3 viewDir = normalize(cameraPosition - vWorld);
    float rim = pow(1.0 - max(dot(n, viewDir), 0.0), 2.15);
    vec3 col = mix(uColor, vec3(0.72, 0.96, 1.0), rim * uGlow);
    gl_FragColor = vec4(col, uOpacity);
  }
`;

const OCEAN_VERT = `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const OCEAN_FRAG = `
  varying vec3 vNormal;
  void main() {
    float rim = pow(1.0 - max(dot(normalize(vNormal), vec3(0.0, 0.0, 1.0)), 0.0), 1.65);
    vec3 deep = vec3(0.012, 0.028, 0.05);
    vec3 edge = vec3(0.09, 0.2, 0.32);
    gl_FragColor = vec4(mix(deep, edge, rim), 1.0);
  }
`;

const AURA_VERT = `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const AURA_FRAG = `
  varying vec3 vNormal;
  void main() {
    float rim = pow(0.58 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.1);
    float glow = clamp(rim, 0.0, 1.0);
    vec3 col = mix(vec3(0.13, 0.78, 0.86), vec3(0.55, 0.32, 1.0), glow);
    gl_FragColor = vec4(col, 1.0) * glow;
  }
`;

function lonLatVector(lon: number, lat: number, radius: number): Vector3 {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lon + 180) * Math.PI) / 180;
  const sinPhi = Math.sin(phi);
  return new Vector3(
    -radius * sinPhi * Math.cos(theta),
    radius * Math.cos(phi),
    radius * sinPhi * Math.sin(theta),
  );
}

function openRing(ring: number[][]): number[][] {
  if (ring.length > 1) {
    const first = ring[0];
    const last = ring[ring.length - 1];
    if (first && last && first[0] === last[0] && first[1] === last[1]) return ring.slice(0, -1);
  }
  return ring;
}

function outward(a: Vector3, b: Vector3, c: Vector3): [Vector3, Vector3, Vector3] {
  const ab = b.clone().sub(a);
  const ac = c.clone().sub(a);
  const normal = ab.cross(ac);
  const mid = a.clone().add(b).add(c);
  return normal.dot(mid) < 0 ? [a, c, b] : [a, b, c];
}

function pushTriangle(a: Vector3, b: Vector3, c: Vector3, out: number[], depth: number): void {
  const ab = a.distanceTo(b);
  const bc = b.distanceTo(c);
  const ca = c.distanceTo(a);
  const longest = Math.max(ab, bc, ca);
  if (longest < 1e-5 || longest > 1.55) return;
  if (longest > 0.26 && depth < 4) {
    const radius = a.length();
    const mid = (p: Vector3, q: Vector3) => p.clone().add(q).multiplyScalar(0.5).normalize().multiplyScalar(radius);
    const abm = mid(a, b);
    const bcm = mid(b, c);
    const cam = mid(c, a);
    pushTriangle(a, abm, cam, out, depth + 1);
    pushTriangle(b, bcm, abm, out, depth + 1);
    pushTriangle(c, cam, bcm, out, depth + 1);
    pushTriangle(abm, bcm, cam, out, depth + 1);
    return;
  }
  out.push(a.x, a.y, a.z, b.x, b.y, b.z, c.x, c.y, c.z);
}

function triangulate(rings: number[][][], radius: number, out: number[]): void {
  const outer = openRing(rings[0] ?? []);
  if (outer.length < 3) return;
  const polygon = [outer, ...rings.slice(1).map(openRing).filter((ring) => ring.length >= 3)];
  const flat = flatten(polygon);
  if (flat.vertices.length < 6) return;
  const indices = earcut(flat.vertices, flat.holes, flat.dimensions);
  const verts: Vector3[] = [];
  for (let i = 0; i < flat.vertices.length; i += flat.dimensions) {
    const lon = flat.vertices[i];
    const lat = flat.vertices[i + 1];
    if (lon === undefined || lat === undefined || !Number.isFinite(lon) || !Number.isFinite(lat)) return;
    verts.push(lonLatVector(lon, lat, radius));
  }
  for (let i = 0; i < indices.length; i += 3) {
    const a = verts[indices[i] ?? -1];
    const b = verts[indices[i + 1] ?? -1];
    const c = verts[indices[i + 2] ?? -1];
    if (!a || !b || !c) continue;
    const [p, q, r] = outward(a, b, c);
    pushTriangle(p, q, r, out, 0);
  }
}

function borderPositions(rings: number[][][], radius: number, out: number[]): void {
  const ring = openRing(rings[0] ?? []);
  if (ring.length < 2) return;
  const points: Vector3[] = [];
  const push = (lon: number, lat: number) => {
    if (!Number.isFinite(lon) || !Number.isFinite(lat)) return;
    points.push(lonLatVector(lon, lat, radius));
  };
  for (let i = 0; i < ring.length; i += 1) {
    const current = ring[i];
    const next = ring[(i + 1) % ring.length];
    if (!current || !next) continue;
    const dLon = (next[0] ?? 0) - (current[0] ?? 0);
    const dLat = (next[1] ?? 0) - (current[1] ?? 0);
    const steps = Math.max(1, Math.ceil(Math.hypot(dLon, dLat) / 5));
    for (let step = 0; step < steps; step += 1) {
      const t = step / steps;
      push((current[0] ?? 0) + dLon * t, (current[1] ?? 0) + dLat * t);
    }
  }
  push(ring[0]?.[0] ?? 0, ring[0]?.[1] ?? 0);
  for (let i = 0; i < points.length - 1; i += 1) {
    const a = points[i];
    const b = points[i + 1];
    if (!a || !b || a.distanceTo(b) > 1.15) continue;
    out.push(a.x, a.y, a.z, b.x, b.y, b.z);
  }
}

function geometryFrom(positions: number[]): BufferGeometry | null {
  if (positions.length < 6) return null;
  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new BufferAttribute(new Float32Array(positions), 3));
  return geometry;
}

function meshFrom(positions: number[], material: ShaderMaterial): Mesh | null {
  const geometry = geometryFrom(positions);
  if (!geometry || positions.length < 9) return null;
  geometry.computeVertexNormals();
  return new Mesh(geometry, material);
}

function linesFrom(positions: number[], material: LineBasicMaterial): LineSegments | null {
  const geometry = geometryFrom(positions);
  if (!geometry) return null;
  return new LineSegments(geometry, material);
}

function landMaterial(color: number, opacity: number, glow: number): ShaderMaterial {
  return new ShaderMaterial({
    uniforms: {
      uColor: { value: new Color(color) },
      uOpacity: { value: opacity },
      uGlow: { value: glow },
    },
    vertexShader: LAND_VERT,
    fragmentShader: LAND_FRAG,
    transparent: opacity < 1,
    depthWrite: true,
    polygonOffset: true,
    polygonOffsetFactor: 1,
    polygonOffsetUnits: 1,
  });
}

function lineMaterial(color: number, opacity: number): LineBasicMaterial {
  return new LineBasicMaterial({
    color,
    transparent: true,
    opacity,
    depthWrite: false,
    toneMapped: false,
  });
}

function graticulePositions(): number[] {
  const out: number[] = [];
  const radius = 1.014;
  const pushArc = (lat0: number, lon0: number, lat1: number, lon1: number, steps: number) => {
    let prev = lonLatVector(lon0, lat0, radius);
    for (let step = 1; step <= steps; step += 1) {
      const t = step / steps;
      const next = lonLatVector(lon0 + (lon1 - lon0) * t, lat0 + (lat1 - lat0) * t, radius);
      if (prev.distanceTo(next) < 1.15) out.push(prev.x, prev.y, prev.z, next.x, next.y, next.z);
      prev = next;
    }
  };
  for (let lat = -60; lat <= 60; lat += 30) {
    pushArc(lat, -180, lat, 180, 48);
  }
  for (let lon = -180; lon < 180; lon += 30) {
    pushArc(-75, lon, 75, lon, 30);
  }
  return out;
}

function isPayload(value: unknown): value is Payload {
  if (!value || typeof value !== 'object') return false;
  const row = value as Partial<Payload>;
  return typeof row.cc === 'string'
    && typeof row.name === 'string'
    && typeof row.region === 'string'
    && typeof row.href === 'string'
    && typeof row.flag === 'string'
    && typeof row.lat === 'number'
    && typeof row.lon === 'number'
    && Array.isArray(row.isos);
}

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

export function initComplianceMap(): void {
  const root = document.querySelector<HTMLElement>('[data-cc-map]');
  if (!root || root.dataset.ready === 'true') return;
  root.dataset.ready = 'true';

  const wrap = root.querySelector<HTMLElement>('[data-cc-globe-wrap]');
  const canvas = root.querySelector<HTMLCanvasElement>('[data-cc-globe]');
  const fallback = root.querySelector<HTMLElement>('[data-cc-fallback]');
  const copy = root.querySelector<HTMLElement>('[data-cc-map-copy]');
  const flag = root.querySelector<HTMLImageElement>('[data-cc-map-flag]');
  const go = root.querySelector<HTMLAnchorElement>('[data-cc-map-go]');
  const jump = root.querySelector<HTMLSelectElement>('[data-cc-jump]');
  if (!wrap || !canvas || !copy || !flag || !go) return;

  const showFallback = () => {
    root.dataset.globe = 'off';
    if (fallback) fallback.hidden = false;
  };

  let payloads: Payload[] = [];
  try {
    const parsed: unknown = JSON.parse(decodeURIComponent(canvas.dataset.markets ?? ''));
    if (Array.isArray(parsed)) payloads = parsed.filter(isPayload);
  } catch {
    showFallback();
    return;
  }

  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
  } catch {
    showFallback();
    return;
  }
  if (!renderer.getContext()) {
    showFallback();
    return;
  }

  const coarseQuery = window.matchMedia('(pointer: coarse)');
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const coarse = () => coarseQuery.matches;
  const reduce = () => motionQuery.matches;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, coarse() ? 1.5 : 2));
  renderer.setClearColor(0x000000, 0);

  const scene = new Scene();
  const camera = new PerspectiveCamera(30, 1, 0.08, 50);
  const spin = new Group();
  const orient = new Group();
  scene.add(spin);
  spin.add(orient);

  const byIso = new Map<string, Payload>();
  for (const payload of payloads) {
    for (const iso of payload.isos) byIso.set(iso, payload);
  }

  const matIdle = landMaterial(0x6d4dff, 1, 0.42);
  const matHot = landMaterial(0x22d3ee, 1, 0.72);
  const matMuted = landMaterial(0x6a6a86, 0.3, 0.08);
  const matDim = landMaterial(0x1b2838, 1, 0.22);
  const borderActive = lineMaterial(0x9af7ff, 0.82);
  const borderHot = lineMaterial(0xf4feff, 0.95);
  const borderMuted = lineMaterial(0x9af7ff, 0.14);
  const borderDim = lineMaterial(0xdbe7f5, 0.16);

  const markets = new Map<string, Market>();
  const ensureMarket = (payload: Payload): Market => {
    const existing = markets.get(payload.cc);
    if (existing) return existing;
    const created: Market = {
      cc: payload.cc,
      name: payload.name,
      region: payload.region,
      must: payload.must,
      href: payload.href,
      flag: payload.flag,
      lat: payload.lat,
      lon: payload.lon,
      meshes: [],
      lines: null,
      marker: null,
    };
    markets.set(payload.cc, created);
    return created;
  };

  const dimPositions: number[] = [];
  const dimBorders: number[] = [];
  const landBuckets = new Map<string, number[]>();
  const borderBuckets = new Map<string, number[]>();

  for (const country of world.countries) {
    const payload = byIso.get(country.id);
    const positions = payload
      ? (landBuckets.get(payload.cc) ?? [])
      : dimPositions;
    const borders = payload
      ? (borderBuckets.get(payload.cc) ?? [])
      : dimBorders;
    if (payload) {
      if (!landBuckets.has(payload.cc)) landBuckets.set(payload.cc, positions);
      if (!borderBuckets.has(payload.cc)) borderBuckets.set(payload.cc, borders);
    }
    const radius = payload ? ACTIVE_R : LAND_R;
    const borderRadius = payload ? BORDER_R : 1.004;
    try {
      for (const polygon of country.parts) {
        triangulate(polygon, radius, positions);
        borderPositions(polygon, borderRadius, borders);
      }
    } catch {
      continue;
    }
  }

  const dimMesh = meshFrom(dimPositions, matDim);
  if (dimMesh) orient.add(dimMesh);
  const dimLines = linesFrom(dimBorders, borderDim);
  if (dimLines) orient.add(dimLines);

  const ocean = new Mesh(
    new SphereGeometry(0.985, 64, 48),
    new ShaderMaterial({
      vertexShader: OCEAN_VERT,
      fragmentShader: OCEAN_FRAG,
      depthWrite: true,
    }),
  );
  orient.add(ocean);

  const grid = linesFrom(graticulePositions(), lineMaterial(0x8b5cf6, 0.32));
  if (grid) orient.add(grid);

  const markerGeo = new SphereGeometry(0.016, 14, 10);
  const haloGeo = new SphereGeometry(0.016, 12, 8);
  const pickGeo = new SphereGeometry(0.05, 10, 8);
  const markerMat = new MeshBasicMaterial({ color: 0x5cefff, toneMapped: false });
  const markerHot = new MeshBasicMaterial({ color: 0xffffff, toneMapped: false });
  const markerMuted = new MeshBasicMaterial({
    color: 0x5cefff,
    transparent: true,
    opacity: 0.25,
    toneMapped: false,
  });
  const haloMat = new MeshBasicMaterial({
    color: 0x22c7d6,
    transparent: true,
    opacity: 0.38,
    blending: AdditiveBlending,
    depthWrite: false,
    toneMapped: false,
  });
  const pickMat = new MeshBasicMaterial({
    transparent: true,
    opacity: 0,
    depthWrite: false,
    colorWrite: false,
  });

  const pickables: Mesh[] = [];
  for (const payload of payloads) {
    const market = ensureMarket(payload);
    const land = meshFrom(landBuckets.get(payload.cc) ?? [], matIdle);
    if (land) {
      land.userData.market = market;
      land.userData.kind = 'land';
      market.meshes.push(land);
      orient.add(land);
      pickables.push(land);
    }
    const lines = linesFrom(borderBuckets.get(payload.cc) ?? [], borderActive);
    if (lines) {
      market.lines = lines;
      orient.add(lines);
    }
    if (payload.small) {
      const spot = lonLatVector(payload.lon, payload.lat, MARKER_R);
      const group = new Group();
      group.position.copy(spot);
      const dot = new Mesh(markerGeo, markerMat);
      const halo = new Mesh(haloGeo, haloMat);
      halo.scale.setScalar(2.5);
      halo.raycast = () => undefined;
      const pick = new Mesh(pickGeo, pickMat);
      pick.userData.market = market;
      pick.userData.kind = 'mark';
      dot.raycast = () => undefined;
      group.add(halo, dot, pick);
      market.marker = group;
      orient.add(group);
      pickables.push(pick);
    }
  }

  const aura = new Mesh(
    new SphereGeometry(1.13, 64, 48),
    new ShaderMaterial({
      vertexShader: AURA_VERT,
      fragmentShader: AURA_FRAG,
      side: BackSide,
      blending: AdditiveBlending,
      transparent: true,
      depthWrite: false,
    }),
  );
  scene.add(aura);

  const starPositions = new Float32Array(420 * 3);
  for (let i = 0; i < 420; i += 1) {
    const dir = new Vector3().randomDirection().multiplyScalar(7.5 + Math.random() * 4);
    starPositions[i * 3] = dir.x;
    starPositions[i * 3 + 1] = dir.y;
    starPositions[i * 3 + 2] = dir.z;
  }
  const starGeometry = new BufferGeometry();
  starGeometry.setAttribute('position', new BufferAttribute(starPositions, 3));
  const stars = new Points(
    starGeometry,
    new PointsMaterial({
      color: 0xb7c0e0,
      size: 0.028,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
      sizeAttenuation: true,
      toneMapped: false,
    }),
  );
  scene.add(stars);

  const homePoint = lonLatVector(HOME_LON, HOME_LAT, 1).normalize();
  orient.quaternion.setFromUnitVectors(homePoint, new Vector3(0, 0, 1));

  let zoomMul = 1;
  let regionId = '';
  let hovered: Market | null = null;
  let selected: Market | null = null;
  let armedAt = 0;
  let userSpinning = false;
  let regionLock = false;
  let spinPausedUntil = 0;
  let anim: Turn | null = null;
  let running = true;

  const fitDistance = () => {
    const tan = Math.tan((camera.fov * Math.PI) / 360);
    const radius = 1.18;
    return Math.max(radius / tan, radius / (tan * Math.max(camera.aspect, 0.35)));
  };

  const applyZoom = () => {
    camera.position.z = clamp(fitDistance() * zoomMul, 1.75, 9);
  };

  const paint = () => {
    const focus = selected ?? hovered;
    for (const market of markets.values()) {
      const hot = market === focus;
      const inRegion = !regionId || market.region === regionId;
      const material = hot ? matHot : inRegion ? matIdle : matMuted;
      for (const mesh of market.meshes) mesh.material = material;
      if (market.lines) market.lines.material = hot ? borderHot : inRegion ? borderActive : borderMuted;
      const dot = market.marker?.children[1];
      const halo = market.marker?.children[0];
      if (dot && dot instanceof Mesh) dot.material = hot ? markerHot : inRegion ? markerMat : markerMuted;
      if (halo) halo.visible = inRegion;
    }
  };

  const showCard = (market: Market | null) => {
    copy.replaceChildren();
    if (!market) {
      copy.textContent = coarse() ? '点一下亮色国家，再点「进入」' : '点选亮色国家，查看合规要求';
      flag.hidden = true;
      go.hidden = true;
      go.removeAttribute('href');
      return;
    }
    const strong = document.createElement('strong');
    strong.textContent = market.name;
    const span = document.createElement('span');
    span.textContent = `${market.region} · ${market.must} 项必办`;
    copy.append(strong, span);
    flag.hidden = false;
    flag.src = market.flag;
    go.hidden = false;
    go.href = market.href;
  };

  const setPressed = (id: string) => {
    for (const button of root.querySelectorAll<HTMLButtonElement>('[data-cc-region]')) {
      button.setAttribute('aria-pressed', button.dataset.ccRegion === id ? 'true' : 'false');
    }
  };

  const turnTo = (lat: number, lon: number, mul: number, resume: boolean) => {
    const target = new Quaternion().setFromUnitVectors(lonLatVector(lon, lat, 1).normalize(), new Vector3(0, 0, 1));
    regionLock = !resume;
    if (reduce()) {
      orient.quaternion.copy(target);
      spin.rotation.set(0, 0, 0);
      zoomMul = mul;
      applyZoom();
      anim = null;
      return;
    }
    anim = {
      fromQ: orient.quaternion.clone(),
      toQ: target,
      fromX: spin.rotation.x,
      fromY: spin.rotation.y,
      fromMul: zoomMul,
      toMul: mul,
      t0: performance.now(),
      dur: 760,
      resume,
    };
  };

  const resetHome = () => {
    regionId = '';
    setPressed('all');
    paint();
    showCard(selected);
    turnTo(HOME_LAT, HOME_LON, 1, true);
  };

  const raycaster = new Raycaster();
  const pointer = new Vector2();
  const hitMarket = (event: { clientX: number; clientY: number }): Market | null => {
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return null;
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(pickables, false);
    const front = hits.filter((hit) => hit.point.dot(camera.position) > 0 && hit.object.userData.market);
    const land = front.find((hit) => hit.object.userData.kind === 'land');
    const chosen = land ?? front[0];
    const market = chosen?.object.userData.market as Market | undefined;
    return market ?? null;
  };

  const resize = () => {
    const width = wrap.clientWidth;
    const height = wrap.clientHeight;
    if (!width || !height) return;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
    applyZoom();
  };

  const resizeObserver = new ResizeObserver(() => resize());
  resizeObserver.observe(wrap);
  resize();
  paint();
  showCard(null);

  const pointers = new Map<number, { x: number; y: number }>();
  let dragId: number | null = null;
  let dragMoved = false;
  let startX = 0;
  let startY = 0;
  let pinchDist = 0;

  const pairDistance = () => {
    const pts = [...pointers.values()];
    const a = pts[0];
    const b = pts[1];
    if (!a || !b) return 0;
    return Math.hypot(a.x - b.x, a.y - b.y);
  };

  canvas.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (pointers.size >= 2) {
      pinchDist = pairDistance();
      dragId = null;
      dragMoved = true;
      anim = null;
      userSpinning = true;
      return;
    }
    dragId = event.pointerId;
    dragMoved = false;
    startX = event.clientX;
    startY = event.clientY;
  });

  canvas.addEventListener('pointermove', (event) => {
    const point = pointers.get(event.pointerId);
    if (!point) {
      if (!coarse() && event.pointerType !== 'touch') {
        hovered = hitMarket(event);
        paint();
        if (!selected) showCard(hovered);
      }
      return;
    }
    const dx = event.clientX - point.x;
    const dy = event.clientY - point.y;
    point.x = event.clientX;
    point.y = event.clientY;
    if (pointers.size >= 2 && pinchDist > 0) {
      const dist = pairDistance();
      if (dist > 0) {
        zoomMul = clamp(zoomMul * (pinchDist / dist), 0.46, 1.7);
        pinchDist = dist;
        applyZoom();
      }
      return;
    }
    if (dragId !== event.pointerId) return;
    if (!dragMoved && Math.hypot(event.clientX - startX, event.clientY - startY) < 6) return;
    if (!dragMoved) {
      dragMoved = true;
      canvas.setPointerCapture(event.pointerId);
      canvas.classList.add('is-panning');
      userSpinning = true;
      anim = null;
    }
    const width = canvas.clientWidth || 1;
    spin.rotation.y += (dx / width) * Math.PI * 1.2;
    spin.rotation.x = clamp(spin.rotation.x + (dy / width) * Math.PI * 1.2, -0.65, 0.65);
  });

  const endPointer = (event: PointerEvent) => {
    const wasDrag = dragId === event.pointerId ? dragMoved : true;
    const tracked = pointers.has(event.pointerId);
    pointers.delete(event.pointerId);
    if (pointers.size < 2) pinchDist = 0;
    if (dragId !== event.pointerId) return;
    dragId = null;
    userSpinning = pointers.size > 0;
    canvas.classList.remove('is-panning');
    if (!tracked) return;
    if (wasDrag) {
      spinPausedUntil = performance.now() + 1500;
      return;
    }
    const market = hitMarket(event);
    if (!market) {
      if (coarse()) {
        selected = null;
        showCard(null);
        paint();
      }
      return;
    }
    if (!coarse()) {
      window.location.href = market.href;
      return;
    }
    if (selected?.cc === market.cc) {
      window.location.href = market.href;
      return;
    }
    selected = market;
    armedAt = performance.now();
    showCard(market);
    paint();
  };

  canvas.addEventListener('pointerup', endPointer);
  canvas.addEventListener('pointercancel', (event) => {
    pointers.delete(event.pointerId);
    if (dragId === event.pointerId) {
      dragId = null;
      userSpinning = false;
      dragMoved = true;
      canvas.classList.remove('is-panning');
      spinPausedUntil = performance.now() + 1500;
    }
  });

  canvas.addEventListener('pointerleave', () => {
    if (dragId !== null || coarse()) return;
    hovered = null;
    paint();
    showCard(selected);
  });

  canvas.addEventListener('wheel', (event) => {
    event.preventDefault();
    const delta = event.deltaMode === 1 ? event.deltaY * 16 : event.deltaY;
    zoomMul = clamp(zoomMul * Math.exp(delta * 0.0011), 0.46, 1.7);
    applyZoom();
  }, { passive: false });

  canvas.addEventListener('keydown', (event) => {
    const widthStep = 0.14;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      anim = null;
      spin.rotation.y += event.key === 'ArrowRight' ? widthStep : -widthStep;
      spinPausedUntil = performance.now() + 1500;
      event.preventDefault();
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      anim = null;
      spin.rotation.x = clamp(spin.rotation.x + (event.key === 'ArrowDown' ? widthStep : -widthStep), -0.65, 0.65);
      event.preventDefault();
    } else if (event.key === '+' || event.key === '=') {
      zoomMul = clamp(zoomMul * 0.84, 0.46, 1.7);
      applyZoom();
      event.preventDefault();
    } else if (event.key === '-' || event.key === '_') {
      zoomMul = clamp(zoomMul * 1.18, 0.46, 1.7);
      applyZoom();
      event.preventDefault();
    } else if (event.key === '0' || event.key === 'Home') {
      resetHome();
      event.preventDefault();
    } else if (event.key === 'Enter' && selected) {
      window.location.href = selected.href;
    }
  });

  canvas.addEventListener('webglcontextlost', (event) => {
    event.preventDefault();
    running = false;
    showFallback();
  });

  for (const button of root.querySelectorAll<HTMLButtonElement>('[data-cc-zoom]')) {
    button.addEventListener('click', () => {
      const mode = button.dataset.ccZoom;
      if (mode === 'in') {
        zoomMul = clamp(zoomMul * 0.82, 0.46, 1.7);
        applyZoom();
      } else if (mode === 'out') {
        zoomMul = clamp(zoomMul * 1.2, 0.46, 1.7);
        applyZoom();
      } else {
        resetHome();
      }
    });
  }

  for (const button of root.querySelectorAll<HTMLButtonElement>('[data-cc-region]')) {
    button.addEventListener('click', () => {
      const id = button.dataset.ccRegion ?? 'all';
      if (id === 'all') {
        resetHome();
        return;
      }
      const lat = Number(button.dataset.lat);
      const lon = Number(button.dataset.lon);
      if (!Number.isFinite(lat) || !Number.isFinite(lon)) return;
      regionId = id;
      setPressed(id);
      paint();
      turnTo(lat, lon, 0.68, false);
    });
  }

  jump?.addEventListener('change', () => {
    if (jump.value) window.location.href = jump.value;
  });

  go.addEventListener('click', (event) => {
    if (performance.now() - armedAt < 350) event.preventDefault();
  });

  document.addEventListener('visibilitychange', () => {
    running = !document.hidden;
  });

  const frame = (now: number) => {
    if (!running) {
      requestAnimationFrame(frame);
      return;
    }
    if (anim) {
      const k = clamp((now - anim.t0) / anim.dur, 0, 1);
      const eased = k < 0.5 ? 2 * k * k : 1 - ((-2 * k + 2) ** 2) / 2;
      orient.quaternion.slerpQuaternions(anim.fromQ, anim.toQ, eased);
      spin.rotation.y = anim.fromY * (1 - eased);
      spin.rotation.x = anim.fromX * (1 - eased);
      zoomMul = anim.fromMul + (anim.toMul - anim.fromMul) * eased;
      applyZoom();
      if (k >= 1) {
        orient.quaternion.copy(anim.toQ);
        spin.rotation.set(0, 0, 0);
        zoomMul = anim.toMul;
        applyZoom();
        regionLock = !anim.resume;
        anim = null;
      }
    } else if (!reduce() && !userSpinning && !regionLock && now > spinPausedUntil) {
      spin.rotation.y += 0.0018;
    }
    if (!reduce()) {
      const pulse = 1 + Math.sin(now * 0.004) * 0.14;
      for (const market of markets.values()) {
        if (!market.marker) continue;
        const hot = market === (selected ?? hovered);
        market.marker.scale.setScalar(hot ? 1.4 : pulse);
      }
    }
    renderer.render(scene, camera);
    if (root.dataset.globe !== 'on') root.dataset.globe = 'on';
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}
