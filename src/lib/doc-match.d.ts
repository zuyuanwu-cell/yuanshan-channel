export interface DocMatchResult {
  id: string;
  alias: string;
  field: string | null;
}

export interface MatchableTemplate {
  id: string;
  aliases?: string[];
  preferTypes?: string[];
  priority?: number;
  highlights?: { alias: string; field: string }[];
}

export function normalizeDocName(value: string): string;
export function matchDoc(
  name: string,
  templates: MatchableTemplate[],
  itemType?: string,
): DocMatchResult | null;
