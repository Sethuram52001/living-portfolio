import { z } from "zod";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { loadAllContent } from "./loaders";

type ValidationIssue = {
  collection: string;
  message: string;
};

type SlugIndex = {
  items: Set<string>;
  fieldNotes: Set<string>;
  zones: Set<string>;
  quests: Set<string>;
  experiences: Set<string>;
  skills: Set<string>;
};

const homepageProjectSlugs = [
  "ai-code-analysis-tool",
  "expense-tracker-api",
  "realtime-chat-service",
  "path-visualizer",
  "system-design-notebook",
] as const;

function addIssue(issues: ValidationIssue[], collection: string, message: string) {
  issues.push({ collection, message });
}

function checkUniqueSlugs(
  issues: ValidationIssue[],
  collection: string,
  slugs: string[],
) {
  const seen = new Set<string>();

  for (const slug of slugs) {
    if (seen.has(slug)) {
      addIssue(issues, collection, `Duplicate slug "${slug}".`);
    }
    seen.add(slug);
  }
}

function checkReference(
  issues: ValidationIssue[],
  collection: string,
  ownerSlug: string,
  targetCollection: keyof SlugIndex,
  targetSlug: string | undefined,
  index: SlugIndex,
) {
  if (!targetSlug) return;
  if (!index[targetCollection].has(targetSlug)) {
    addIssue(
      issues,
      collection,
      `${ownerSlug} references missing ${targetCollection} slug "${targetSlug}".`,
    );
  }
}

function checkReferenceList(
  issues: ValidationIssue[],
  collection: string,
  ownerSlug: string,
  targetCollection: keyof SlugIndex,
  targetSlugs: string[] | undefined,
  index: SlugIndex,
) {
  for (const targetSlug of targetSlugs ?? []) {
    checkReference(issues, collection, ownerSlug, targetCollection, targetSlug, index);
  }
}

function isPlaceholderDraft(status: string, placeholder: boolean) {
  return placeholder && status === "draft";
}

function checkPublicAsset(
  issues: ValidationIssue[],
  collection: string,
  ownerSlug: string,
  assetPath: string | undefined,
) {
  if (!assetPath) {
    addIssue(issues, collection, `${ownerSlug} is missing previewImage.`);
    return;
  }

  if (!assetPath.startsWith("/")) {
    addIssue(
      issues,
      collection,
      `${ownerSlug} previewImage must use a public absolute path.`,
    );
    return;
  }

  const filePath = join(process.cwd(), "public", assetPath.slice(1));

  if (!existsSync(filePath)) {
    addIssue(
      issues,
      collection,
      `${ownerSlug} previewImage points to missing public asset "${assetPath}".`,
    );
  }
}

export function validateAllContent() {
  const issues: ValidationIssue[] = [];

  try {
    const content = loadAllContent();
    const skillSlugs = content.skillGroups.flatMap((group) =>
      group.skills.map((skill) => skill.slug),
    );
    const experienceSlugs = content.experiencePhases.map((phase) => phase.slug);

    const index: SlugIndex = {
      items: new Set(content.items.map((item) => item.slug)),
      fieldNotes: new Set(content.fieldNotes.map((note) => note.slug)),
      zones: new Set(content.zones.map((zone) => zone.slug)),
      quests: new Set(content.currentQuests.map((quest) => quest.slug)),
      experiences: new Set(experienceSlugs),
      skills: new Set(skillSlugs),
    };

    checkUniqueSlugs(issues, "items", content.items.map((item) => item.slug));
    checkUniqueSlugs(issues, "fieldNotes", content.fieldNotes.map((note) => note.slug));
    checkUniqueSlugs(issues, "zones", content.zones.map((zone) => zone.slug));
    checkUniqueSlugs(issues, "currentQuests", content.currentQuests.map((quest) => quest.slug));
    checkUniqueSlugs(issues, "experiencePhases", experienceSlugs);
    checkUniqueSlugs(issues, "skills", skillSlugs);

    for (const item of content.items) {
      checkReference(issues, "items", item.slug, "zones", item.zone, index);
      checkReferenceList(issues, "items", item.slug, "skills", item.skills, index);

      if (item.placeholder && item.status !== "draft") {
        addIssue(issues, "items", `${item.slug} is placeholder content but is not draft.`);
      }

      if (!item.placeholder && item.status === "published") {
        for (const [key, value] of Object.entries(item.proof)) {
          if (value.toLowerCase().includes("placeholder")) {
            addIssue(issues, "items", `${item.slug} has placeholder text in proof.${key}.`);
          }
        }
      }
    }

    for (const slug of homepageProjectSlugs) {
      const item = content.items.find((candidate) => candidate.slug === slug);

      if (!item) {
        addIssue(issues, "items", `Homepage project "${slug}" is missing.`);
        continue;
      }

      checkPublicAsset(issues, "items", item.slug, item.previewImage);
    }

    for (const note of content.fieldNotes) {
      if (note.placeholder && note.status !== "draft") {
        addIssue(issues, "fieldNotes", `${note.slug} is placeholder content but is not draft.`);
      }
    }

    for (const zone of content.zones) {
      checkReference(issues, "zones", zone.slug, "items", zone.links.item, index);
      checkReference(issues, "zones", zone.slug, "quests", zone.links.quest, index);
      checkReference(issues, "zones", zone.slug, "experiences", zone.links.experience, index);
      checkReference(issues, "zones", zone.slug, "fieldNotes", zone.links.fieldNote, index);
    }

    for (const quest of content.currentQuests) {
      checkReferenceList(issues, "currentQuests", quest.slug, "skills", quest.references.skills, index);
      checkReferenceList(issues, "currentQuests", quest.slug, "zones", quest.references.zones, index);
      checkReferenceList(issues, "currentQuests", quest.slug, "items", quest.references.items, index);
      checkReferenceList(
        issues,
        "currentQuests",
        quest.slug,
        "fieldNotes",
        quest.references.fieldNotes,
        index,
      );
    }

    for (const group of content.skillGroups) {
      for (const skill of group.skills) {
        checkReferenceList(issues, "skills", skill.slug, "items", skill.references.items, index);
        checkReferenceList(issues, "skills", skill.slug, "quests", skill.references.quests, index);
        checkReferenceList(
          issues,
          "skills",
          skill.slug,
          "experiences",
          skill.references.experiences,
          index,
        );
        checkReferenceList(
          issues,
          "skills",
          skill.slug,
          "fieldNotes",
          skill.references.fieldNotes,
          index,
        );
      }
    }

    for (const phase of content.experiencePhases) {
      if (phase.placeholder && phase.status !== "draft") {
        addIssue(
          issues,
          "experiencePhases",
          `${phase.slug} is placeholder content but is not draft.`,
        );
      }

      if (!isPlaceholderDraft(phase.status, phase.placeholder) && phase.summary.toLowerCase().includes("placeholder")) {
        addIssue(
          issues,
          "experiencePhases",
          `${phase.slug} has placeholder summary text.`,
        );
      }
    }

    checkReference(issues, "statusHud", "building", "quests", content.statusHud.building.quest, index);
    checkReference(
      issues,
      "statusHud",
      "writing",
      "fieldNotes",
      content.statusHud.writing.fieldNote,
      index,
    );
    checkReferenceList(issues, "statusHud", "learning", "skills", content.statusHud.learning.skills, index);

    return { ok: issues.length === 0, issues, content };
  } catch (error) {
    if (error instanceof z.ZodError) {
      for (const issue of error.issues) {
        addIssue(issues, "schema", `${issue.path.join(".")}: ${issue.message}`);
      }
      return { ok: false, issues, content: null };
    }

    throw error;
  }
}
