/**
 * Match a free-text compliance `docs[]` name to a style template.
 * Longer alias wins. Same length: prefer the item's type, then template priority.
 * Editors add aliases in content/datasets/doc-templates.json — see content/CONTENT.md.
 */

export function normalizeDocName(value) {
  return String(value)
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[()（）[\]【】「」"'“”‘’、,，.。/／\\:：;；·•\-—–_]/g, '');
}

function aliasScore(docNorm, aliasNorm) {
  if (aliasNorm.length < 2) return 0;
  if (docNorm === aliasNorm) return 1000 + aliasNorm.length;
  if (docNorm.includes(aliasNorm)) return 500 + aliasNorm.length;
  return 0;
}

function takeBetter(next, prev) {
  if (!prev || next.base > prev.base) return true;
  if (next.base < prev.base) return false;
  if (next.typeHit !== prev.typeHit) return next.typeHit;
  return next.priority > prev.priority;
}

function highlightField(docNorm, template) {
  let field = null;
  let length = 0;
  for (const item of template.highlights ?? []) {
    const aliasNorm = normalizeDocName(item.alias ?? '');
    if (aliasNorm.length < 2 || !docNorm.includes(aliasNorm) || aliasNorm.length <= length) continue;
    length = aliasNorm.length;
    field = item.field ?? null;
  }
  return field;
}

/**
 * @param {string} name
 * @param {Array<{ id: string, aliases?: string[], preferTypes?: string[], priority?: number, highlights?: { alias: string, field: string }[] }>} templates
 * @param {string} [itemType]
 * @returns {{ id: string, alias: string, field: string | null } | null}
 */
export function matchDoc(name, templates, itemType) {
  const docNorm = normalizeDocName(name);
  if (!docNorm || !Array.isArray(templates)) return null;
  let best = null;
  for (const template of templates) {
    const typeHit = Boolean(itemType && template.preferTypes?.includes(itemType));
    const priority = Number(template.priority) || 0;
    for (const alias of template.aliases ?? []) {
      const base = aliasScore(docNorm, normalizeDocName(alias));
      if (!base) continue;
      const next = { template, alias, base, typeHit, priority };
      if (takeBetter(next, best)) best = next;
    }
  }
  if (!best) return null;
  return {
    id: best.template.id,
    alias: best.alias,
    field: highlightField(docNorm, best.template),
  };
}
