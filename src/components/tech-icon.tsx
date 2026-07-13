import type { SimpleIcon } from "simple-icons";
import {
  siApachekafka,
  siClaude,
  siCss,
  siCursor,
  siDocker,
  siExpress,
  siGit,
  siGo,
  siGooglecloud,
  siGooglecloudstorage,
  siHtml5,
  siJavascript,
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
  ArrowPathRoundedSquareIcon,
  ArrowsRightLeftIcon,
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
  ShareIcon,
} from "@heroicons/react/24/solid";

type TechIconProps = {
  label: string;
  className?: string;
};

type FallbackIcon = ComponentType<SVGProps<SVGSVGElement>>;
type FallbackIconMeta = {
  color: string;
  icon: FallbackIcon;
};

const iconMap: Record<string, SimpleIcon> = {
  "claude": siClaude,
  "css": siCss,
  "cursor": siCursor,
  "docker": siDocker,
  "express.js": siExpress,
  "gcs": siGooglecloudstorage,
  "gcp": siGooglecloud,
  "git": siGit,
  "go": siGo,
  "google adk": siGooglecloud,
  "html": siHtml5,
  "javascript": siJavascript,
  "kafka": siApachekafka,
  "llms": siVllm,
  "nestjs": siNestjs,
  "next.js": siNextdotjs,
  "node.js": siNodedotjs,
  "ollama": siOllama,
  "postgresql": siPostgresql,
  "python": siPython,
  "react.js": siReact,
  "redis": siRedis,
  "redis pub/sub": siRedis,
  "typescript": siTypescript,
};

const fallbackIconMap: Record<string, FallbackIconMeta> = {
  "algorithms": { color: "#7c3aed", icon: PuzzlePieceIcon },
  "async processing": { color: "#f59e0b", icon: BoltIcon },
  "aws": { color: "#ff9900", icon: CloudIcon },
  "cloud functions": { color: "#4285f4", icon: CloudIcon },
  "codex": { color: "#111827", icon: CodeBracketSquareIcon },
  "computer networks": { color: "#0ea5e9", icon: ShareIcon },
  "data structures": { color: "#2563eb", icon: CircleStackIcon },
  "dbms": { color: "#336791", icon: CircleStackIcon },
  "distributed locking": { color: "#dc2626", icon: LockClosedIcon },
  "event-driven architecture": { color: "#06b6d4", icon: ArrowsRightLeftIcon },
  "eventual consistency": { color: "#22c55e", icon: ArrowPathRoundedSquareIcon },
  "operating systems": { color: "#64748b", icon: CpuChipIcon },
  "retry and compensation flows": { color: "#f97316", icon: ArrowPathRoundedSquareIcon },
  "s3": { color: "#16a34a", icon: CircleStackIcon },
  "sql": { color: "#2563eb", icon: CircleStackIcon },
  "technical writing": { color: "#475569", icon: DocumentTextIcon },
  "transactional outbox": { color: "#0891b2", icon: QueueListIcon },
  "webhooks": { color: "#ec4899", icon: ShareIcon },
};

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
