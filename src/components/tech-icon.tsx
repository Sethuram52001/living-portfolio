import type { SimpleIcon } from "simple-icons";
import {
  siApachekafka,
  siClaude,
  siCss,
  siGithub,
  siGooglecloud,
  siHtml5,
  siJavascript,
  siMongodb,
  siNestjs,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPython,
  siReact,
  siRedis,
  siTypescript,
} from "simple-icons";
import { CodeBracketIcon } from "@heroicons/react/24/solid";

type TechIconProps = {
  label: string;
  className?: string;
};

export type TechIconMeta = {
  color?: string;
  title: string;
};

const iconMap: Record<string, SimpleIcon> = {
  "ai": siClaude,
  "ai code analysis": siClaude,
  "ai tooling": siClaude,
  "ai/llm": siClaude,
  "algorithms": siJavascript,
  "apache kafka": siApachekafka,
  "ast parsing": siTypescript,
  "backend systems": siNodedotjs,
  "content ui": siHtml5,
  "css": siCss,
  "distributed systems": siApachekafka,
  "frontend breadth": siReact,
  "github": siGithub,
  "google cloud": siGooglecloud,
  "google cloud storage": siGooglecloud,
  "graph theory": siJavascript,
  "html": siHtml5,
  "javascript": siJavascript,
  "kafka": siApachekafka,
  "mongodb": siMongodb,
  "nest": siNestjs,
  "nestjs": siNestjs,
  "next": siNextdotjs,
  "next.js": siNextdotjs,
  "node": siNodedotjs,
  "node.js": siNodedotjs,
  "postgres": siPostgresql,
  "postgresql": siPostgresql,
  "python": siPython,
  "react": siReact,
  "redis": siRedis,
  "state management": siReact,
  "technical writing": siHtml5,
  "typescript": siTypescript,
  "ui patterns": siReact,
};

export function getTechIconMeta(label: string): TechIconMeta {
  const icon = iconMap[normalizeLabel(label)];

  if (!icon) {
    return { title: label };
  }

  return {
    color: `#${icon.hex}`,
    title: icon.title,
  };
}

export function TechIcon({ label, className = "size-5" }: TechIconProps) {
  const icon = iconMap[normalizeLabel(label)];

  if (!icon) {
    return <CodeBracketIcon aria-hidden="true" className={className} />;
  }

  return (
    <svg
      aria-hidden="true"
      className={className}
      fill={`#${icon.hex}`}
      role="img"
      viewBox="0 0 24 24"
    >
      <path d={icon.path} />
    </svg>
  );
}

function normalizeLabel(label: string) {
  return label.trim().toLowerCase();
}
