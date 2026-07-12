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
  externalLinks: [
    {
      label: "Resume",
      href: "https://drive.google.com/file/d/1-zNSUE02iHsS_5WCH_ns9R49ooCjPJMk/view?usp=drive_link",
      description: "Resume on Google Drive.",
      placeholder: false,
    },
    {
      label: "GitHub",
      href: "https://github.com/Sethuram52001",
      description: "GitHub profile.",
      placeholder: false,
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/sethuram-s-v-171719194/",
      description: "LinkedIn profile.",
      placeholder: false,
    },
    {
      label: "Medium",
      href: "https://medium.com/@sethuram52001",
      description: "Medium writing profile.",
      placeholder: false,
    },
    {
      label: "Email",
      href: "mailto:sethuramprabha@gmail.com",
      description: "Official email.",
      placeholder: false,
    },
    {
      label: "Dev Collabs",
      href: "mailto:sethuram52001@gmail.com",
      description: "Email for development collaborations.",
      placeholder: false,
    },
  ] satisfies ExternalLink[],
} as const;
