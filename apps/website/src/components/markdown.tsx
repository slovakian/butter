import { createHighlighter } from "@tanstack/highlight/core";
import { json } from "@tanstack/highlight/languages/json";
import { markdown } from "@tanstack/highlight/languages/markdown";
import { shell } from "@tanstack/highlight/languages/shell";
import { sql } from "@tanstack/highlight/languages/sql";
import { ts } from "@tanstack/highlight/languages/ts";
import { tsx } from "@tanstack/highlight/languages/tsx";
import { createTanStackMarkdownHighlighter } from "@tanstack/highlight/markdown";
import { Markdown } from "@tanstack/markdown/react";

const highlighter = createHighlighter({
  languages: [ts, tsx, sql, shell, json, markdown],
});

export const markdownHighlighter =
  createTanStackMarkdownHighlighter(highlighter);

export interface DocMarkdownProps {
  children: string;
  className?: string;
}

export const DocMarkdown = ({ children, className }: DocMarkdownProps) => (
  <div className={className}>
    <Markdown
      codeLineNumbers={false}
      headingAnchors={{
        ariaHidden: true,
        className: "anchor-heading",
        content: "#",
      }}
      highlighter={markdownHighlighter}
    >
      {children}
    </Markdown>
  </div>
);
