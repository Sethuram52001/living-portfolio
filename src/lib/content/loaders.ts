import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import { homeContent } from "../../../content/home";
import { siteContent } from "../../../content/site";
import { skillGroups } from "../../../content/skills";
import {
  experiencePhaseSchema,
  fieldNoteFrontmatterSchema,
  highlightsFrontmatterSchema,
  homeContentSchema,
  itemFrontmatterSchema,
  skillGroupSchema,
  type ExperiencePhase,
  type FieldNoteDocument,
  type HighlightsDocument,
  type HomeContent,
  type ItemDocument,
  type SkillGroup,
  siteContentSchema,
  type SiteContent,
} from "./schemas";

const rootDir = process.cwd();
const contentDir = path.join(rootDir, "content");

function parseMdxCollection<T>(
  directory: string,
  schema: z.ZodType<T>,
): T[] {
  const fullDirectory = path.join(contentDir, directory);

  if (!fs.existsSync(fullDirectory)) {
    return [];
  }

  return fs
    .readdirSync(fullDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .sort()
    .map((file) => {
      const fullPath = path.join(fullDirectory, file);
      const source = fs.readFileSync(fullPath, "utf8");
      const parsed = matter(source);
      return schema.parse(parsed.data);
    });
}

export function loadItems(): ItemDocument[] {
  return parseMdxCollection("items", itemFrontmatterSchema);
}

export function loadFieldNotes(): FieldNoteDocument[] {
  return parseMdxCollection("field-notes", fieldNoteFrontmatterSchema);
}

export function loadHighlights(): HighlightsDocument {
  const documents = parseMdxCollection("highlights", highlightsFrontmatterSchema);

  if (documents.length !== 1) {
    throw new Error(
      `Expected exactly one highlights document, found ${documents.length}.`,
    );
  }

  return documents[0];
}

export function loadSkillGroups(): SkillGroup[] {
  return z.array(skillGroupSchema).parse(skillGroups);
}

export function loadExperiencePhases(): ExperiencePhase[] {
  return parseMdxCollection("experience", experiencePhaseSchema).sort(
    (left, right) => left.order - right.order,
  );
}

export function loadHomeContent(): HomeContent {
  return homeContentSchema.parse(homeContent);
}

export function loadSiteContent(): SiteContent {
  return siteContentSchema.parse(siteContent);
}

export function loadPortfolioContent() {
  return {
    items: loadItems(),
    fieldNotes: loadFieldNotes(),
    highlights: loadHighlights(),
    skillGroups: loadSkillGroups(),
    experiencePhases: loadExperiencePhases(),
    home: loadHomeContent(),
    site: loadSiteContent(),
  };
}

export type PortfolioContent = ReturnType<typeof loadPortfolioContent>;
