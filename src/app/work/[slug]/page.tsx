import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ItemDetail } from "@/components/work/item-detail";
import { loadItems } from "@/lib/content/loaders";
import { createPageMetadata } from "@/lib/site/metadata";

type WorkItemPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return loadItems().map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: WorkItemPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = loadItems().find((entry) => entry.slug === slug);

  if (!item) {
    return createPageMetadata({
      title: "Work Item",
      description: "Inventory Item not found.",
      path: "/work",
    });
  }

  return createPageMetadata({
    title: item.title,
    description: item.summary,
    path: `/work/${item.slug}`,
    noIndex: item.status !== "published" || item.placeholder,
  });
}

export default async function WorkItemPage({ params }: WorkItemPageProps) {
  const { slug } = await params;
  const item = loadItems().find((entry) => entry.slug === slug);

  if (!item) {
    notFound();
  }

  return <ItemDetail item={item} />;
}
