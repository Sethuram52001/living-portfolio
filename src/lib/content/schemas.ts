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

export const itemArtifactSchema = z.object({
  type: z.enum(["demo", "source", "screenshot", "video", "write-up"]),
  href: z.string().min(1),
});

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
  tech: z.array(z.string().min(1)).default([]),
  artifact: itemArtifactSchema,
  previewImage: z.string().min(1).optional(),
  proof: itemProofSchema,
  links: z.array(linkSchema).default([]),
});

export const fieldNoteCategorySchema = z.enum(["DSA", "technical", "personal"]);

export const fieldNoteFrontmatterSchema = z.object({
  title: z.string().min(1),
  status: publicationStatusSchema,
  summary: z.string().min(1),
  date: dateSchema,
  category: fieldNoteCategorySchema,
  externalUrl: z.string().min(1).optional(),
  previewImage: z.string().min(1).optional(),
});

export const skillNodeSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
});

export const skillGroupSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
  order: z.number().int().nonnegative(),
  skills: z.array(skillNodeSchema).min(1),
});

export const experiencePhaseSchema = z.object({
  order: z.number().int().positive(),
  organization: z.string().min(1),
  position: z.string().min(1),
  dateRange: z.object({
    start: monthSchema,
    end: monthSchema.optional(),
  }),
  summary: z.string().min(1),
  fieldNotes: z.array(z.string().min(1)).min(1),
  keyTech: z.array(z.string().min(1)).min(1),
});

export const homeSelectionSchema = z.object({
  selectedWorkSlugs: z.array(slugSchema).min(1),
  currentFocus: z.object({
    building: z.object({
      itemSlug: slugSchema,
    }),
    writing: z.literal("latest-draft"),
    learning: z.object({
      itemSlug: slugSchema,
    }),
  }),
});

export const highlightAccentSchema = z.enum(["emerald", "blue", "amber"]);

export const highlightCardSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
  accent: highlightAccentSchema,
});

export const highlightsFrontmatterSchema = z.object({
  title: z.string().min(1),
  mutedTitle: z.string().min(1),
  highlights: z.array(highlightCardSchema).min(1),
});

export type ItemDocument = z.infer<typeof itemFrontmatterSchema>;
export type FieldNoteDocument = z.infer<typeof fieldNoteFrontmatterSchema>;
export type HighlightsDocument = z.infer<typeof highlightsFrontmatterSchema>;
export type SkillGroup = z.infer<typeof skillGroupSchema>;
export type ExperiencePhase = z.infer<typeof experiencePhaseSchema>;
export type HomeSelection = z.infer<typeof homeSelectionSchema>;

export type SkillGroupInput = z.input<typeof skillGroupSchema>;
export type HomeSelectionInput = z.input<typeof homeSelectionSchema>;
