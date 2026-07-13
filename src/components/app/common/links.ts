import type { ExternalLink } from "@/config/site";
import type { ItemDocument } from "@/lib/content/schemas";

export function getExternalLink(
  links: readonly ExternalLink[],
  label: string,
): ExternalLink | undefined {
  return links.find((link) => link.label === label);
}

export function getProjectSourceHref(item: ItemDocument) {
  return item.links.find((link) =>
    /source|github/i.test(link.label),
  )?.href;
}
