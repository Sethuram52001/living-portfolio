import { getProjectSourceHref } from "./links";
import { loadPortfolioContent, type PortfolioContent } from "./loaders";
import type {
  FieldNoteDocument,
  HomeContent,
  ItemDocument,
  SiteContent,
} from "./schemas";

export class HomePageDataError extends Error {}

type ResolvedContactAction = HomeContent["sectionHeaders"]["contact"]["actions"][number] & {
  href: string;
};

type ResolvedHomeContent = Omit<HomeContent, "sectionHeaders"> & {
  sectionHeaders: Omit<HomeContent["sectionHeaders"], "contact"> & {
    contact: Omit<HomeContent["sectionHeaders"]["contact"], "actions"> & {
      actions: ResolvedContactAction[];
    };
  };
};

type CurrentFocusCard = {
  actionLabel: string;
  category: "Building" | "Writing" | "Learning";
  detail: string;
  href?: string;
  motiveLabel: string;
  summary: string;
  title: string;
};

type SelectedWork = {
  item: ItemDocument;
  sourceHref?: string;
};

export type HomePageData = {
  currentFocus: CurrentFocusCard[];
  experiencePhases: PortfolioContent["experiencePhases"];
  highlights: PortfolioContent["highlights"];
  home: ResolvedHomeContent;
  mediumHref: string;
  publishedFieldNotes: FieldNoteDocument[];
  selectedWork: SelectedWork[];
  site: SiteContent;
  visibleSkillGroups: PortfolioContent["skillGroups"];
};

function findItem(items: ItemDocument[], slug: string, label: string) {
  const item = items.find((candidate) => candidate.slug === slug);

  if (!item) {
    throw new HomePageDataError(`${label} references missing Item "${slug}".`);
  }

  return item;
}

function getLatestDraft(fieldNotes: FieldNoteDocument[]) {
  const draft = [...fieldNotes]
    .filter((note) => note.status === "draft")
    .sort((left, right) => right.date.localeCompare(left.date))[0];

  if (!draft) {
    throw new HomePageDataError(
      "Writing focus requires at least one draft Field Note.",
    );
  }

  return draft;
}

function requireMotive(
  source: ItemDocument | FieldNoteDocument,
  category: string,
) {
  if (!source.motive) {
    throw new HomePageDataError(`${category} focus requires a motive.`);
  }

  return source.motive;
}

function resolveContactActions(site: SiteContent, home: HomeContent) {
  return home.sectionHeaders.contact.actions.map((action) => {
    const link = site.externalLinks.find(
      (candidate) => candidate.label === action.linkLabel,
    );

    if (!link) {
      throw new HomePageDataError(
        `Contact action references missing external link "${action.linkLabel}".`,
      );
    }

    return { ...action, href: link.href };
  }) satisfies ResolvedContactAction[];
}

function requireExternalLink(site: SiteContent, label: string) {
  const link = site.externalLinks.find((candidate) => candidate.label === label);

  if (!link) {
    throw new HomePageDataError(`Missing external link "${label}".`);
  }

  return link.href;
}

export function buildHomePageData(content: PortfolioContent): HomePageData {
  const { home, items, fieldNotes, site } = content;
  const building = findItem(
    items,
    home.selection.currentFocus.building.itemSlug,
    "Building focus",
  );
  const writing = getLatestDraft(fieldNotes);
  const learning = findItem(
    items,
    home.selection.currentFocus.learning.itemSlug,
    "Learning focus",
  );
  const currentFocus = home.sectionHeaders.currentFocus.cards;

  return {
    currentFocus: [
      {
        ...currentFocus.building,
        detail: requireMotive(building, "Building"),
        href: getProjectSourceHref(building),
        summary: building.summary,
        title: building.title,
      },
      {
        ...currentFocus.writing,
        detail: requireMotive(writing, "Writing"),
        href: writing.externalUrl,
        summary: writing.summary,
        title: writing.title,
      },
      {
        ...currentFocus.learning,
        detail: requireMotive(learning, "Learning"),
        href: getProjectSourceHref(learning),
        summary: learning.summary,
        title: learning.title,
      },
    ],
    experiencePhases: content.experiencePhases,
    highlights: content.highlights,
    home: {
      ...home,
      sectionHeaders: {
        ...home.sectionHeaders,
        contact: {
          ...home.sectionHeaders.contact,
          actions: resolveContactActions(site, home),
        },
      },
    },
    mediumHref: requireExternalLink(site, "Medium"),
    publishedFieldNotes: [...fieldNotes]
      .filter((note) => note.status === "published")
      .sort((left, right) => right.date.localeCompare(left.date))
      .slice(0, 4),
    selectedWork: home.selection.selectedWorkSlugs.map((slug) => {
      const item = findItem(items, slug, "Selected Work");
      return { item, sourceHref: getProjectSourceHref(item) };
    }),
    site,
    visibleSkillGroups: [...content.skillGroups]
      .sort((left, right) => left.order - right.order)
      .slice(0, 6),
  };
}

export function loadHomePageData() {
  return buildHomePageData(loadPortfolioContent());
}
