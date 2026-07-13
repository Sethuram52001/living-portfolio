import type { SiteContentInput } from "@/lib/content/schemas";

export const siteContent = {
  metadata: {
    name: "Sethuram",
    title: "Sethuram | Portfolio",
    description:
      "A living portfolio for Sethuram, a software engineer exploring backend systems, AI tooling, writing, and thoughtful product-building.",
  },
  person: {
    name: "Sethuram",
    profileName: "Sethuram S V",
    role: "Software Engineer",
    profileImage: "/profile/sethuram-contact.webp",
    profileImageAlt: "Sethuram S V",
  },
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
      href: "https://sethuram52001.medium.com/",
    },
    {
      label: "Email",
      href: "mailto:sethuramprabha@gmail.com",
    },
  ],
  shell: {
    skipLinkLabel: "Skip to content",
    menu: {
      closeLabel: "Close menu",
      navigationLabel: "Page sections",
      openLabel: "Open menu",
    },
    navigation: [
      { label: "About", href: "#about" },
      { label: "Experience", href: "#experience" },
      { label: "Skills", href: "#skills" },
      { label: "Work", href: "#work" },
      { label: "Writing", href: "#writing" },
      { label: "Contact", href: "#contact" },
    ],
    footer: {
      copyright: "All rights reserved.",
      backToTopLabel: "Back to top",
      backToTopHref: "#about",
      linkLabels: ["Resume", "GitHub", "LinkedIn", "Medium", "Email"],
    },
  },
} satisfies SiteContentInput;
