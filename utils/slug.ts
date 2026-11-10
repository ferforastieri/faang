/** The registry's item name for a catalogue entry: "/components/date-picker" → "date-picker". */
export function docSlug(value: string): string {
  return value
    .replace(/^\/components\//, "")
    .toLocaleLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
