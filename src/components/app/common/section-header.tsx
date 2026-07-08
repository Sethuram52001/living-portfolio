import type { ReactNode } from "react";
import { Reveal } from "./reveal";

export function SectionHeader({
  eyebrow,
  title,
  supporting,
}: {
  eyebrow: string;
  title: ReactNode;
  supporting?: string;
}) {
  return (
    <Reveal>
      <p className="text-sm font-medium tracking-wide uppercase text-app-accent-green">
        {eyebrow}
      </p>
      <h2 className="mt-4 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-app-foreground md:text-5xl">
        {title}
      </h2>
      {supporting ? (
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-app-muted">
          {supporting}
        </p>
      ) : null}
    </Reveal>
  );
}
