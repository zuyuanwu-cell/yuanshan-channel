import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const presence = fs.readFileSync(new URL("../../public/presence.js", import.meta.url), "utf8");
const layout = fs.readFileSync(new URL("../../src/layouts/Base.astro", import.meta.url), "utf8");

test("public beacon posts to /console and the layout loads it", () => {
  assert.match(presence, /\/console\/api\/presence/);
  assert.match(presence, /sessionStorage/);
  assert.match(layout, /presence\.js/);
  new Function(presence);
});
