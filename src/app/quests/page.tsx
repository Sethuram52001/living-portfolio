import type { Metadata } from "next";
import { QuestLog } from "@/components/quests/quest-log";
import { getRequiredRouteByHref } from "@/config/site";
import { loadCurrentQuests, loadStatusHud } from "@/lib/content/loaders";
import { createPageMetadata } from "@/lib/site/metadata";

const route = getRequiredRouteByHref("/quests");

export const metadata: Metadata = createPageMetadata({
  title: route.title,
  description: route.description,
  path: route.href,
});

export default function QuestsPage() {
  const quests = loadCurrentQuests();
  const status = loadStatusHud();

  return <QuestLog quests={quests} status={status} />;
}
