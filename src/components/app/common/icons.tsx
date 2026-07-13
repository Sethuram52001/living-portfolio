import {
  Bars3Icon as HeroBars3Icon,
  ChevronRightIcon,
  DocumentIcon as HeroDocumentIcon,
  EnvelopeIcon as HeroEnvelopeIcon,
  XMarkIcon as HeroXMarkIcon,
} from "@heroicons/react/24/outline";
import type { SVGProps } from "react";
import { siGithub, siMedium } from "simple-icons";

type IconProps = SVGProps<SVGSVGElement>;

export function Bars3Icon({ className }: IconProps) {
  return <HeroBars3Icon aria-hidden="true" className={className} />;
}

export function ChevronRight({ className }: IconProps) {
  return <ChevronRightIcon aria-hidden="true" className={className} />;
}

export function DocumentIcon({ className }: IconProps) {
  return <HeroDocumentIcon aria-hidden="true" className={className} />;
}

export function EnvelopeIcon({ className }: IconProps) {
  return <HeroEnvelopeIcon aria-hidden="true" className={className} />;
}

export function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill={`#${siGithub.hex}`}
      viewBox="0 0 24 24"
    >
      <path d={siGithub.path} />
    </svg>
  );
}

export function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
    >
      <rect width="24" height="24" rx="4" fill="#0A66C2" />
      <path
        fill="#fff"
        d="M6.94 8.92H3.98v9.48h2.96zM5.46 7.63a1.72 1.72 0 1 0 0-3.43 1.72 1.72 0 0 0 0 3.43m13.26 10.77h-2.95v-4.61c0-1.1-.02-2.51-1.53-2.51-1.53 0-1.76 1.2-1.76 2.43v4.69H9.53V8.92h2.83v1.3h.04a3.1 3.1 0 0 1 2.79-1.53c2.98 0 3.53 1.96 3.53 4.51z"
      />
    </svg>
  );
}

export function MediumIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
    >
      <rect x="2" y="2" width="20" height="20" fill="#fff" />
      <path d={siMedium.path} fill="#000" />
    </svg>
  );
}

export function XMarkIcon({ className }: IconProps) {
  return <HeroXMarkIcon aria-hidden="true" className={className} />;
}
