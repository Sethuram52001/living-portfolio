import { z } from "zod";

export const slugSchema = z
  .string()
  .min(1)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use kebab-case slugs.");

export const dateSchema = z.preprocess((value) => {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }

  return value;
}, z.string().regex(/^\d{4}-\d{2}-\d{2}$/));
export const monthSchema = z.string().regex(/^\d{4}-\d{2}$/);

export const linkSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
});

export const publicationStatusSchema = z.enum(["draft", "published"]);
export const skillStatusSchema = z.enum(["available", "current", "learning", "completed"]);
export const questStatusSchema = z.enum(["planned", "in-progress", "paused", "completed"]);

export const itemArtifactSchema = z.object({
  type: z.enum(["demo", "source", "screenshot", "video", "write-up"]),
  label: z.string().min(1),
  href: z.string().min(1),
});

export const itemDeploymentSchema = z
  .object({
    status: z.enum(["available", "under-development", "none"]),
    label: z.string().min(1).optional(),
    href: z.string().min(1).optional(),
  })
  .default({ status: "none" });

export const itemProofSchema = z.object({
  motivation: z.string().min(1),
  learned: z.string().min(1),
  mattered: z.string().min(1),
});

export const itemFrontmatterSchema = z.object({
  slug: slugSchema,
  title: z.string().min(1),
  status: publicationStatusSchema,
  placeholder: z.boolean(),
  summary: z.string().min(1),
  skills: z.array(slugSchema).min(1),
  tech: z.array(z.string().min(1)).default([]),
  artifact: itemArtifactSchema,
  deployment: itemDeploymentSchema,
  previewImage: z.string().min(1).optional(),
  proof: itemProofSchema,
  links: z.array(linkSchema).default([]),
});

export const fieldNoteCategorySchema = z.enum(["dsa", "technical", "personal"]);

export const fieldNoteFrontmatterSchema = z.object({
  title: z.string().min(1),
  status: publicationStatusSchema,
  summary: z.string().min(1),
  date: dateSchema,
  category: fieldNoteCategorySchema,
  externalUrl: z.string().min(1).optional(),
  previewImage: z.string().min(1).optional(),
});

export const referenceSchema = z
  .object({
    items: z.array(slugSchema).default([]),
    quests: z.array(slugSchema).default([]),
    experiences: z.array(slugSchema).default([]),
    skills: z.array(slugSchema).default([]),
  })
  .default({
    items: [],
    quests: [],
    experiences: [],
    skills: [],
  });

export const skillNodeSchema = z.object({
  slug: slugSchema,
  title: z.string().min(1),
  status: skillStatusSchema,
  summary: z.string().min(1),
  references: referenceSchema,
});

export const skillGroupSchema = z.object({
  slug: slugSchema,
  title: z.string().min(1),
  summary: z.string().min(1),
  order: z.number().int().nonnegative(),
  placeholder: z.boolean(),
  skills: z.array(skillNodeSchema).min(1),
});

export const currentQuestSchema = z.object({
  slug: slugSchema,
  title: z.string().min(1),
  status: questStatusSchema,
  placeholder: z.boolean(),
  summary: z.string().min(1),
  startedOn: dateSchema,
  focus: z.array(z.enum(["building", "writing", "learning", "experimenting"])).min(1),
  links: z.array(linkSchema).default([]),
  references: referenceSchema,
});

export const experiencePhaseSchema = z.object({
  slug: slugSchema,
  company: z.string().min(1),
  position: z.string().min(1),
  status: publicationStatusSchema,
  placeholder: z.boolean(),
  dateRange: z.object({
    start: monthSchema,
    end: monthSchema.optional(),
  }),
  summary: z.string().min(1),
  fieldNotes: z.array(z.string().min(1)).min(1),
  keyTech: z.array(z.string().min(1)).min(1),
});

export const statusHudSchema = z.object({
  placeholder: z.boolean(),
  updatedOn: dateSchema,
  building: z.object({
    label: z.string().min(1),
    value: z.string().min(1),
    quest: slugSchema.optional(),
  }),
  writing: z.object({
    label: z.string().min(1),
    value: z.string().min(1),
  }),
  learning: z.object({
    label: z.string().min(1),
    value: z.string().min(1),
    skills: z.array(slugSchema).default([]),
  }),
});

export const itemDocumentSchema = itemFrontmatterSchema.extend({
  body: z.string().min(1),
});

export const fieldNoteDocumentSchema = fieldNoteFrontmatterSchema.extend({
  body: z.string().min(1),
});

export type ItemDocument = z.infer<typeof itemDocumentSchema>;
export type FieldNoteDocument = z.infer<typeof fieldNoteDocumentSchema>;
export type SkillGroup = z.infer<typeof skillGroupSchema>;
export type CurrentQuest = z.infer<typeof currentQuestSchema>;
export type ExperiencePhase = z.infer<typeof experiencePhaseSchema>;
export type StatusHud = z.infer<typeof statusHudSchema>;

export type SkillGroupInput = z.input<typeof skillGroupSchema>;
export type CurrentQuestInput = z.input<typeof currentQuestSchema>;
export type ExperiencePhaseInput = z.input<typeof experiencePhaseSchema>;
export type StatusHudInput = z.input<typeof statusHudSchema>;
