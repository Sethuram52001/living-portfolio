import type { SectionHeaderContent } from "@/lib/content/schemas";
import { Reveal } from "./reveal";

export function SectionHeader({ content }: { content: SectionHeaderContent }) {
  return (
    <Reveal>
      <p className="text-sm font-medium tracking-wide uppercase text-app-accent-green">
        {content.eyebrow}
      </p>
      <h2 className="mt-4 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-app-foreground md:text-5xl">
        {content.title}
        {content.mutedTitle ? (
          <span className="text-app-muted"> {content.mutedTitle}</span>
        ) : null}
      </h2>
      {content.supporting ? (
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-app-muted">
          {content.supporting}
        </p>
      ) : null}
    </Reveal>
  );
}
