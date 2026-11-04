import assets from '../config/asset-map.json';

/** Local, base-aware replacement for the exported platform's image resolver. */
export function asset(path: string): string {
  const mapped = (assets as Record<string, string>)[path];
  if (!mapped) throw new Error(`Unknown image asset: ${path}`);
  return `${import.meta.env.BASE_URL}${mapped.replace(/^\//, '')}`;
}
