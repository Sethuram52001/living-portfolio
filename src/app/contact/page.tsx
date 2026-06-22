import type { Metadata } from "next";
import { ContactSocial } from "@/components/contact/contact-social";
import { getRequiredRouteByHref, siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/site/metadata";

const route = getRequiredRouteByHref("/contact");

export const metadata: Metadata = createPageMetadata({
  title: route.title,
  description: route.description,
  path: route.href,
});

export default function ContactPage() {
  return <ContactSocial links={siteConfig.externalLinks} />;
}
