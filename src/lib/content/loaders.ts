import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import { experiencePhases } from "../../../content/experience";
import { skillGroups } from "../../../content/skills";
import { statusHud } from "../../../content/status";
import { currentQuests } from "../../../content/quests";
import {
  currentQuestSchema,
  experiencePhaseSchema,
  fieldNoteDocumentSchema,
  itemDocumentSchema,
  skillGroupSchema,
  statusHudSchema,
  type CurrentQuest,
  type ExperiencePhase,
  type FieldNoteDocument,
  type ItemDocument,
  type SkillGroup,
  type StatusHud,
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
      return schema.parse({
        ...parsed.data,
        body: parsed.content.trim(),
      });
    });
}

export function loadItems(): ItemDocument[] {
  return parseMdxCollection("items", itemDocumentSchema);
}

export function loadFieldNotes(): FieldNoteDocument[] {
  return parseMdxCollection("field-notes", fieldNoteDocumentSchema);
}

export function loadSkillGroups(): SkillGroup[] {
  return z.array(skillGroupSchema).parse(skillGroups);
}

export function loadCurrentQuests(): CurrentQuest[] {
  return z.array(currentQuestSchema).parse(currentQuests);
}

export function loadExperiencePhases(): ExperiencePhase[] {
  return z.array(experiencePhaseSchema).parse(experiencePhases);
}

export function loadStatusHud(): StatusHud {
  return statusHudSchema.parse(statusHud);
}

export function loadAllContent() {
  return {
    items: loadItems(),
    fieldNotes: loadFieldNotes(),
    skillGroups: loadSkillGroups(),
    currentQuests: loadCurrentQuests(),
    experiencePhases: loadExperiencePhases(),
    statusHud: loadStatusHud(),
  };
}
