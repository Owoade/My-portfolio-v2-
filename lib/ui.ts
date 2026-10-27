/** Placeholder values start with TODO(owner): render them differently. */
export function isTodo(value: string): boolean {
  return value.startsWith("TODO(owner)");
}

/** Big amber value, or a muted mono placeholder for TODO(owner) values. */
export function valueClass(value: string, big: string): string {
  return isTodo(value)
    ? "font-mono text-muted [text-wrap:balance] text-sm"
    : `font-mono font-semibold text-accent-2 ${big}`;
}