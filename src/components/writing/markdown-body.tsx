import Link from "next/link";

type MarkdownBodyProps = {
  body: string;
};

type InlinePart =
  | { type: "text"; value: string }
  | { type: "code"; value: string }
  | { type: "link"; label: string; href: string };

export function MarkdownBody({ body }: MarkdownBodyProps) {
  const blocks = parseBlocks(body);

  return (
    <div className="grid gap-6 text-base leading-8 text-lp-on-surface-variant">
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          const Heading = `h${block.level}` as "h2" | "h3";
          return (
            <Heading
              key={index}
              className="pt-2 text-2xl font-black leading-tight text-lp-on-surface"
            >
              {renderInline(block.text)}
            </Heading>
          );
        }

        if (block.type === "list") {
          return (
            <ul key={index} className="grid gap-2 pl-5">
              {block.items.map((item) => (
                <li key={item} className="list-disc">
                  {renderInline(item)}
                </li>
              ))}
            </ul>
          );
        }

        return (
          <p key={index} className="font-medium">
            {renderInline(block.text)}
          </p>
        );
      })}
    </div>
  );
}

function parseBlocks(body: string) {
  const lines = body.split(/\r?\n/);
  const blocks: Array<
    | { type: "heading"; level: 2 | 3; text: string }
    | { type: "list"; items: string[] }
    | { type: "paragraph"; text: string }
  > = [];
  let paragraph: string[] = [];
  let list: string[] = [];

  function flushParagraph() {
    if (paragraph.length > 0) {
      blocks.push({ type: "paragraph", text: paragraph.join(" ") });
      paragraph = [];
    }
  }

  function flushList() {
    if (list.length > 0) {
      blocks.push({ type: "list", items: list });
      list = [];
    }
  }

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      flushList();
      continue;
    }

    if (trimmed.startsWith("## ")) {
      flushParagraph();
      flushList();
      blocks.push({ type: "heading", level: 2, text: trimmed.slice(3) });
      continue;
    }

    if (trimmed.startsWith("### ")) {
      flushParagraph();
      flushList();
      blocks.push({ type: "heading", level: 3, text: trimmed.slice(4) });
      continue;
    }

    if (trimmed.startsWith("- ")) {
      flushParagraph();
      list.push(trimmed.slice(2));
      continue;
    }

    flushList();
    paragraph.push(trimmed);
  }

  flushParagraph();
  flushList();

  return blocks;
}

function renderInline(text: string) {
  return parseInline(text).map((part, index) => {
    if (part.type === "code") {
      return (
        <code
          key={index}
          className="rounded-lp-sm border border-lp-outline-variant bg-lp-surface-container px-1.5 py-0.5 font-mono text-sm font-bold text-lp-on-surface"
        >
          {part.value}
        </code>
      );
    }

    if (part.type === "link") {
      const isExternal = /^https?:\/\//.test(part.href);
      const className =
        "font-black text-lp-primary underline decoration-lp-secondary-container decoration-2 underline-offset-4";

      if (isExternal) {
        return (
          <a key={index} href={part.href} className={className}>
            {part.label}
          </a>
        );
      }

      return (
        <Link key={index} href={part.href} className={className}>
          {part.label}
        </Link>
      );
    }

    return part.value;
  });
}

function parseInline(text: string): InlinePart[] {
  const parts: InlinePart[] = [];
  const pattern = /(`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  let cursor = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > cursor) {
      parts.push({ type: "text", value: text.slice(cursor, match.index) });
    }

    const token = match[0];

    if (token.startsWith("`")) {
      parts.push({ type: "code", value: token.slice(1, -1) });
    } else {
      const linkMatch = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(token);
      if (linkMatch) {
        parts.push({ type: "link", label: linkMatch[1], href: linkMatch[2] });
      }
    }

    cursor = match.index + token.length;
  }

  if (cursor < text.length) {
    parts.push({ type: "text", value: text.slice(cursor) });
  }

  return parts;
}
