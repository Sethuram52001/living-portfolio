export type SiteRoute = {
  href: string;
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  status: string;
};

export type ExternalLink = {
  label: string;
  href: string;
  description: string;
  placeholder: boolean;
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sethuram.dev";

export const siteConfig = {
  name: "Sethuram",
  title: "Sethuram | Living Portfolio",
  description:
    "A living portfolio for Sethuram, a backend engineer exploring systems, AI tooling, writing, and thoughtful product-building.",
  url: siteUrl,
  owner: "Sethuram",
  role: "Backend engineer with light AI and frontend breadth.",
  routes: [
    {
      href: "/",
      label: "Home",
      eyebrow: "Living Portfolio",
      title: "Sethuram's living portfolio",
      description:
        "A recruiter-readable entry point for work, experience, skills, writing, current quests, and contact details.",
      status: "Direct path is ready. World Map V1 comes next.",
    },
    {
      href: "/work",
      label: "Work",
      eyebrow: "Inventory",
      title: "Work",
      description:
        "Substantial work lives here as inspectable inventory with motivation, visible artifacts, and what mattered.",
      status: "Inventory-style Work surface is active.",
    },
    {
      href: "/experience",
      label: "Experience",
      eyebrow: "Milestones",
      title: "Experience",
      description:
        "Professional backend experience and career phases are presented as readable timeline milestones.",
      status: "Career Timeline surface is active.",
    },
    {
      href: "/skills",
      label: "Skills",
      eyebrow: "Skill Tree",
      title: "Skills",
      description:
        "Backend, systems, AI, frontend breadth, writing, and product-thinking skills are grouped here.",
      status: "Mastery Tree surface is active.",
    },
    {
      href: "/quests",
      label: "Active Quests",
      eyebrow: "Current Work",
      title: "Active Quests",
      description:
        "Current building, writing, learning, and experiments appear here without implying a fixed update cadence.",
      status: "Active Quests surface is active.",
    },
    {
      href: "/writing",
      label: "Writing",
      eyebrow: "Field Notes",
      title: "Writing",
      description:
        "Field Notes, essays, dev logs, and learning reflections from Sethuram's building process.",
      status: "Writing surface is active.",
    },
    {
      href: "/contact",
      label: "Contact",
      eyebrow: "Practical Links",
      title: "Contact",
      description:
        "Resume, GitHub, LinkedIn, and email links will stay easy to find here.",
      status: "Contact and social surface is active.",
    },
  ] satisfies SiteRoute[],
  externalLinks: [
    {
      label: "Resume",
      href: "#resume-placeholder",
      description: "Resume link placeholder.",
      placeholder: true,
    },
    {
      label: "GitHub",
      href: "https://github.com/Sethuram52001",
      description: "GitHub profile.",
      placeholder: false,
    },
    {
      label: "LinkedIn",
      href: "#linkedin-placeholder",
      description: "LinkedIn profile placeholder.",
      placeholder: true,
    },
    {
      label: "Email",
      href: "#email-placeholder",
      description: "Email placeholder.",
      placeholder: true,
    },
  ] satisfies ExternalLink[],
} as const;

export function getRouteByHref(href: string) {
  return siteConfig.routes.find((route) => route.href === href);
}

export function getRequiredRouteByHref(href: string): SiteRoute {
  const route = getRouteByHref(href);

  if (!route) {
    throw new Error(`Missing site route for "${href}".`);
  }

  return route;
}
