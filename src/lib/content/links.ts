import type { ItemDocument } from "./schemas";

export function getProjectSourceHref(item: ItemDocument) {
  return item.links.find((link) => /source|github/i.test(link.label))?.href;
}
