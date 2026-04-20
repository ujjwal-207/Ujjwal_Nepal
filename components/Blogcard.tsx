"use client";

import { IBlogPostsEdge } from "@/lib/types";
import Link from "next/link";

export function BlogCard({ blog }: { blog: IBlogPostsEdge }) {
  return (
    <Link
      href={`/blogs/${blog.node.slug}`}
      className="group block rounded-[24px] transition duration-200 hover:-translate-y-1"
    >
      <article className="terminal-card rounded-[24px]">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--ink-mute)]">
              blog post
            </p>
            <h2
              className="mt-3 text-2xl uppercase tracking-[0.08em] text-[var(--ink)] transition group-hover:text-[var(--yellow)] md:text-3xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {blog.node.title}
            </h2>
            <p className="terminal-copy mt-4 text-sm md:text-base">{blog.node.brief}</p>
          </div>

          <div className="shrink-0">
            <span className="pane-tag cyan">{blog.node.readTimeInMinutes} min read</span>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {blog.node.tags.slice(0, 4).map((tag) => (
            <span key={tag.name} className="tag-pill">
              {tag.name}
            </span>
          ))}
        </div>
      </article>
    </Link>
  );
}
