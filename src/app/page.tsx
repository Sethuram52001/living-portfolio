import type { Metadata } from "next";
import { PortfolioPage } from "@/components/portfolio/portfolio-page";
import { loadHomePageData } from "@/lib/content/home-page";
import { createPageMetadata } from "@/lib/site/metadata";

const homePageData = loadHomePageData();

export const metadata: Metadata = createPageMetadata({
  title: homePageData.site.metadata.title,
  description: homePageData.site.metadata.description,
  path: "/",
});

export default function Home() {
  return <PortfolioPage data={homePageData} />;
}
