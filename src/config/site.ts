export type ExternalLink = {
  label: string;
  href: string;
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sethuram.dev";

export const siteConfig = {
  name: "Sethuram",
  title: "Sethuram | Software Engineer",
  description:
    "A living portfolio for Sethuram, a software engineer exploring backend systems, AI tooling, writing, and thoughtful product-building.",
  url: siteUrl,
  externalLinks: [
    {
      label: "Resume",
      href: "https://drive.google.com/file/d/1-zNSUE02iHsS_5WCH_ns9R49ooCjPJMk/view?usp=drive_link",
    },
    {
      label: "GitHub",
      href: "https://github.com/Sethuram52001",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/sethuram-s-v-171719194/",
    },
    {
      label: "Medium",
      href: "https://medium.com/@sethuram52001",
    },
    {
      label: "Email",
      href: "mailto:sethuramprabha@gmail.com",
    },
  ] satisfies ExternalLink[],
} as const;
