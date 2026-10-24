import fs from 'node:fs';
import path from 'node:path';
import { matchDoc as matchDocName } from './doc-match.mjs';
import type { ComplianceType, DocCatalog, DocTemplate } from './types';

export interface DocMatch {
  id: string;
  alias: string;
  field: string | null;
  template: DocTemplate;
}

let cache: DocCatalog | undefined;

export function getDocCatalog(): DocCatalog {
  if (!cache) {
    const file = path.join(process.cwd(), 'content', 'datasets', 'doc-templates.json');
    cache = JSON.parse(fs.readFileSync(file, 'utf8')) as DocCatalog;
  }
  return cache;
}

export function getDocTemplates(): DocTemplate[] {
  return getDocCatalog().templates;
}

export function getDocTemplate(id: string): DocTemplate | undefined {
  return getDocTemplates().find((template) => template.id === id);
}

export function matchDoc(name: string, itemType?: ComplianceType | string): DocMatch | null {
  const templates = getDocTemplates();
  const hit = matchDocName(name, templates, itemType);
  if (!hit) return null;
  const template = templates.find((item) => item.id === hit.id);
  if (!template) return null;
  return { id: hit.id, alias: hit.alias, field: hit.field, template };
}
