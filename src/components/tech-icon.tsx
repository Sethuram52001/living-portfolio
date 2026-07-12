import type { SimpleIcon } from "simple-icons";
import {
  siApachekafka,
  siClaude,
  siClaudecode,
  siCss,
  siCursor,
  siDocker,
  siExpress,
  siFastapi,
  siGin,
  siGit,
  siGo,
  siGithub,
  siGooglecloud,
  siGooglecloudstorage,
  siHtml5,
  siJavascript,
  siMongodb,
  siNestjs,
  siNextdotjs,
  siNodedotjs,
  siOllama,
  siPostgresql,
  siPython,
  siReact,
  siRedis,
  siTypescript,
  siVllm,
} from "simple-icons";
import type { ComponentType, SVGProps } from "react";
import {
  AcademicCapIcon,
  ArrowPathRoundedSquareIcon,
  ArrowsRightLeftIcon,
  BeakerIcon,
  BoltIcon,
  CircleStackIcon,
  CloudIcon,
  CodeBracketIcon,
  CodeBracketSquareIcon,
  CpuChipIcon,
  DocumentTextIcon,
  LockClosedIcon,
  PuzzlePieceIcon,
  QueueListIcon,
  ServerStackIcon,
  ShareIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/solid";

type TechIconProps = {
  label: string;
  className?: string;
};

export type TechIconMeta = {
  color?: string;
  title: string;
};

type FallbackIcon = ComponentType<SVGProps<SVGSVGElement>>;
type FallbackIconMeta = {
  color: string;
  icon: FallbackIcon;
  title?: string;
};

const iconMap: Record<string, SimpleIcon> = {
  "ai": siClaude,
  "ai code analysis": siClaude,
  "ai tooling": siClaude,
  "ai/llm": siClaude,
  "apache kafka": siApachekafka,
  "ast parsing": siTypescript,
  "backend systems": siNodedotjs,
  "content ui": siHtml5,
  "css": siCss,
  "cursor": siCursor,
  "docker": siDocker,
  "distributed systems": siApachekafka,
  "express": siExpress,
  "express.js": siExpress,
  "fastapi": siFastapi,
  "frontend breadth": siReact,
  "gcs": siGooglecloudstorage,
  "gcp": siGooglecloud,
  "gin": siGin,
  "git": siGit,
  "github": siGithub,
  "go": siGo,
  "golang": siGo,
  "google cloud": siGooglecloud,
  "google cloud storage": siGooglecloud,
  "google cloud functions": siGooglecloud,
  "google adk": siGooglecloud,
  "html": siHtml5,
  "javascript": siJavascript,
  "kafka": siApachekafka,
  "llms": siVllm,
  "mongodb": siMongodb,
  "nest": siNestjs,
  "nestjs": siNestjs,
  "next": siNextdotjs,
  "next.js": siNextdotjs,
  "node": siNodedotjs,
  "node.js": siNodedotjs,
  "ollama": siOllama,
  "postgres": siPostgresql,
  "postgresql": siPostgresql,
  "python": siPython,
  "react": siReact,
  "react.js": siReact,
  "redis": siRedis,
  "redis pub/sub": siRedis,
  "state management": siReact,
  "typescript": siTypescript,
  "ui patterns": siReact,
  "claude code": siClaudecode,
};

const fallbackIconMap: Record<string, FallbackIconMeta> = {
  "algorithms": { color: "#7c3aed", icon: PuzzlePieceIcon },
  "async processing": { color: "#f59e0b", icon: BoltIcon },
  "aws": { color: "#ff9900", icon: CloudIcon, title: "AWS" },
  "celery": { color: "#37814a", icon: QueueListIcon },
  "cloud functions": { color: "#4285f4", icon: CloudIcon },
  "codex": { color: "#111827", icon: CodeBracketSquareIcon },
  "computer networks": { color: "#0ea5e9", icon: ShareIcon },
  "data structures": { color: "#2563eb", icon: CircleStackIcon },
  "dbms": { color: "#336791", icon: CircleStackIcon, title: "DBMS" },
  "distributed locking": { color: "#dc2626", icon: LockClosedIcon },
  "event-driven architecture": { color: "#06b6d4", icon: ArrowsRightLeftIcon },
  "eventual consistency": { color: "#22c55e", icon: ArrowPathRoundedSquareIcon },
  "java": { color: "#f97316", icon: CodeBracketIcon },
  "operating systems": { color: "#64748b", icon: CpuChipIcon },
  "problem solving": { color: "#8b5cf6", icon: PuzzlePieceIcon },
  "retry and compensation flows": { color: "#f97316", icon: ArrowPathRoundedSquareIcon },
  "s3": { color: "#16a34a", icon: CircleStackIcon, title: "S3" },
  "sql": { color: "#2563eb", icon: CircleStackIcon, title: "SQL" },
  "system design": { color: "#0f766e", icon: ServerStackIcon },
  "technical writing": { color: "#475569", icon: DocumentTextIcon },
  "transactional outbox": { color: "#0891b2", icon: QueueListIcon },
  "webhooks": { color: "#ec4899", icon: ShareIcon },
  "ai fundamentals": { color: "#a855f7", icon: BeakerIcon },
  "computer science": { color: "#0f766e", icon: AcademicCapIcon },
  "mern stack": { color: "#10b981", icon: WrenchScrewdriverIcon },
};

export function getTechIconMeta(label: string): TechIconMeta {
  const normalizedLabel = normalizeLabel(label);
  const icon = iconMap[normalizedLabel];

  if (icon) {
    return {
      color: `#${icon.hex}`,
      title: icon.title,
    };
  }

  const fallback = fallbackIconMap[normalizedLabel];

  return {
    color: fallback?.color,
    title: fallback?.title ?? label,
  };
}

export function TechIcon({ label, className = "size-5" }: TechIconProps) {
  const normalizedLabel = normalizeLabel(label);
  const icon = iconMap[normalizedLabel];

  if (!icon) {
    const fallback = fallbackIconMap[normalizedLabel];
    const FallbackIconComponent = fallback?.icon ?? CodeBracketIcon;

    return (
      <FallbackIconComponent
        aria-hidden="true"
        className={className}
        style={{ color: fallback?.color ?? "#334155" }}
      />
    );
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
