import type { HomeContentInput } from "@/lib/content/schemas";

export const homeContent = {
  hero: {
    eyebrow: "About",
    title: "Hi, I'm Sethuram.",
    paragraphs: [
      "I'm a software engineer with over three years of experience building reliable distributed systems in fintech. I've worked on scalable microservices across credit management, billing, reconciliation, and IAM with fine-grained access control.",
      "Beyond building systems, I love problem-solving and technical writing. I enjoy breaking down complex engineering ideas, whether they concern system design patterns, language internals, or DSA, because I believe explaining something clearly is one of the best ways to truly understand it.",
    ],
  },
  sectionHeaders: {
    highlights: {
      eyebrow: "Highlights",
    },
    experience: {
      eyebrow: "Experience",
      title: "From computer science foundations to production systems.",
    },
    skills: {
      eyebrow: "Skills",
      title: "The tools behind the work.",
    },
    work: {
      eyebrow: "Selected work",
      title: "Ideas I wanted to make tangible.",
      supporting:
        "I build projects when I'm curious about an idea and inspired to build it, so I can understand it well enough to see it work.",
      previewLabel: "Preview coming soon",
      projectActionLabel: "View project",
    },
    writing: {
      eyebrow: "Writing",
      title: "Writing to understand more deeply.",
      supporting: "Technical, personal, and still evolving.",
      carouselLabel: "Selected writing previews",
      carouselControlsLabel: "Writing slide position",
      cardActionLabel: "Read on Medium",
      mediumActionLabel: "Read more on Medium",
      previewLabel: "Article preview",
    },
    currentFocus: {
      eyebrow: "Currently",
      title: "What's taking shape.",
      supporting:
        "A few things I am actively building, writing about, or trying to understand better.",
      cards: {
        building: {
          category: "Building",
          motiveLabel: "Motive",
          actionLabel: "Open",
        },
        writing: {
          category: "Writing",
          motiveLabel: "Motive",
          actionLabel: "Open",
        },
        learning: {
          category: "Learning",
          motiveLabel: "Motive",
          actionLabel: "Open",
        },
      },
    },
    contact: {
      eyebrow: "Contact",
      title: "Open to what's next.",
      mutedTitle: "Let's build something meaningful.",
      supporting:
        "I'm open to software engineering roles, thoughtful product teams, and developer collaborations. I'm drawn to teams that value reliability, clarity, ownership, and well-reasoned engineering. Email or LinkedIn is the best way to reach me.",
      actions: [
        {
          linkLabel: "Email",
          title: "Email",
          icon: "email",
          tone: "primary",
        },
        {
          linkLabel: "Resume",
          title: "Resume",
          icon: "document",
          tone: "secondary",
        },
        {
          linkLabel: "GitHub",
          title: "GitHub",
          icon: "github",
          tone: "subtle",
        },
        {
          linkLabel: "LinkedIn",
          title: "LinkedIn",
          icon: "linkedin",
          tone: "subtle",
        },
      ],
    },
  },
  selection: {
    selectedWorkSlugs: ["path-visualizer", "sorting-visualizer"],
    currentFocus: {
      building: {
        itemSlug: "codelens",
      },
      writing: "latest-draft",
      learning: {
        itemSlug: "system-design-compendium",
      },
    },
  },
} satisfies HomeContentInput;
