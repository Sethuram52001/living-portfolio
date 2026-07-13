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

export const itemFrontmatterSchema = z.object({
  slug: slugSchema,
  title: z.string().min(1),
  summary: z.string().min(1),
  motive: z.string().min(1).optional(),
  tech: z.array(z.string().min(1)).default([]),
  previewImage: z.string().min(1).optional(),
  highlights: z
    .array(
      z.object({
        title: z.string().min(1),
        points: z.array(z.string().min(1)).min(1),
      }),
    )
    .min(1),
  links: z.array(linkSchema).default([]),
});

export const fieldNoteCategorySchema = z.enum(["DSA", "Technical", "Personal"]);

export const fieldNoteFrontmatterSchema = z.object({
  title: z.string().min(1),
  status: publicationStatusSchema,
  summary: z.string().min(1),
  motive: z.string().min(1).optional(),
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

export const sectionHeaderSchema = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  mutedTitle: z.string().min(1).optional(),
  supporting: z.string().min(1).optional(),
});

export const siteContentSchema = z.object({
  metadata: z.object({
    name: z.string().min(1),
    title: z.string().min(1),
    description: z.string().min(1),
  }),
  person: z.object({
    name: z.string().min(1),
    profileName: z.string().min(1),
    role: z.string().min(1),
    profileImage: z.string().min(1),
    profileImageAlt: z.string().min(1),
  }),
  externalLinks: z.array(linkSchema).min(1),
  shell: z.object({
    skipLinkLabel: z.string().min(1),
    menu: z.object({
      closeLabel: z.string().min(1),
      navigationLabel: z.string().min(1),
      openLabel: z.string().min(1),
    }),
    navigation: z
      .array(
        z.object({
          label: z.string().min(1),
          href: z.string().min(1),
        }),
      )
      .min(1),
    footer: z.object({
      copyright: z.string().min(1),
      backToTopLabel: z.string().min(1),
      backToTopHref: z.string().min(1),
      linkLabels: z.array(z.string().min(1)).min(1),
    }),
  }),
});

const currentFocusCardCopySchema = z.object({
  category: z.enum(["Building", "Writing", "Learning"]),
  motiveLabel: z.string().min(1),
  actionLabel: z.string().min(1),
});

const contactActionSchema = z.object({
  linkLabel: z.string().min(1),
  title: z.string().min(1),
  icon: z.enum(["document", "email", "github", "linkedin"]),
  tone: z.enum(["primary", "secondary", "subtle"]),
});

export const homeContentSchema = z.object({
  hero: z.object({
    eyebrow: z.string().min(1),
    title: z.string().min(1),
    paragraphs: z.array(z.string().min(1)).min(1),
  }),
  sectionHeaders: z.object({
    highlights: z.object({ eyebrow: z.string().min(1) }),
    experience: sectionHeaderSchema,
    skills: sectionHeaderSchema,
    work: sectionHeaderSchema.extend({
      previewLabel: z.string().min(1),
      projectActionLabel: z.string().min(1),
    }),
    writing: sectionHeaderSchema.extend({
      carouselLabel: z.string().min(1),
      carouselControlsLabel: z.string().min(1),
      cardActionLabel: z.string().min(1),
      mediumActionLabel: z.string().min(1),
      previewLabel: z.string().min(1),
    }),
    currentFocus: sectionHeaderSchema.extend({
      cards: z.object({
        building: currentFocusCardCopySchema,
        writing: currentFocusCardCopySchema,
        learning: currentFocusCardCopySchema,
      }),
    }),
    contact: sectionHeaderSchema.extend({
      actions: z.array(contactActionSchema).min(1),
    }),
  }),
  selection: homeSelectionSchema,
});

export const highlightAccentSchema = z.enum([
  "emerald",
  "blue",
  "amber",
  "orange",
  "red",
]);

export const highlightCardSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
  accent: highlightAccentSchema,
});

export const highlightsFrontmatterSchema = z.object({
  title: z.string().min(1),
  mutedTitle: z.string().min(1).optional(),
  supporting: z.string().min(1),
  highlights: z.array(highlightCardSchema).min(1),
});

export type ItemDocument = z.infer<typeof itemFrontmatterSchema>;
export type FieldNoteDocument = z.infer<typeof fieldNoteFrontmatterSchema>;
export type HighlightsDocument = z.infer<typeof highlightsFrontmatterSchema>;
export type SkillGroup = z.infer<typeof skillGroupSchema>;
export type ExperiencePhase = z.infer<typeof experiencePhaseSchema>;
export type HomeSelection = z.infer<typeof homeSelectionSchema>;
export type SiteContent = z.infer<typeof siteContentSchema>;
export type HomeContent = z.infer<typeof homeContentSchema>;
export type SectionHeaderContent = z.infer<typeof sectionHeaderSchema>;

export type SkillGroupInput = z.input<typeof skillGroupSchema>;
export type HomeSelectionInput = z.input<typeof homeSelectionSchema>;
export type SiteContentInput = z.input<typeof siteContentSchema>;
export type HomeContentInput = z.input<typeof homeContentSchema>;
