import Footer from "@/components/Footer";
import MarkdownRenderer from "@/components/MarkdownRender";
import Navbar from "@/components/navbar";
import { BASE_URL } from "@/lib/constant";
import { getSinglePost } from "@/lib/query";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Clock3 } from "lucide-react";

export const runtime = "edge";
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const DEFAULT_META = {
    title: "Blogs | Ujjwal Nepal",
    description: "Explore blogs by Ujjwal Nepal, where you can find something great",
  };

  try {
    const post = await getSinglePost(slug);

    if (!post) {
      return { title: "Post not found" };
    }

    const title = post.title ?? "Blogs | Ujjwal Nepal";
    const description = (post.seo?.description || post.brief) ?? "";
    const image = post.coverImage?.url;
    const url = `${BASE_URL}/blogs/${slug}`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url,
        images: image ? [{ url: image }] : undefined,
        type: "article",
      },
      twitter: {
        card: image ? "summary_large_image" : "summary",
        title,
        description,
        images: image ? [image] : undefined,
      },
    };
  } catch {
    return {
      ...DEFAULT_META,
      openGraph: {
        ...DEFAULT_META,
        url: new URL(`${BASE_URL}/blogs/${slug}`),
      },
      twitter: {
        ...DEFAULT_META,
        card: "summary_large_image",
      },
    };
  }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getSinglePost(slug);

  if (!post) {
    return (
      <div className="terminal-shell min-h-screen">
        <Navbar />
        <main className="mx-auto max-w-7xl px-4 pb-6">
          <div className="terminal-frame overflow-hidden">
            <section className="terminal-pane m-4 p-8 lg:m-6">
              <p className="terminal-kicker">blogs</p>
              <h1 className="terminal-title mt-3 text-4xl">Post Not Found</h1>
              <Link href="/blogs" className="terminal-button mt-6">
                <ArrowLeft className="h-4 w-4" />
                Back To Blogs
              </Link>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Unknown date";

  return (
    <div className="terminal-shell min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 pb-6">
        <div className="terminal-frame overflow-hidden">
          <div className="shell-titlebar">
            <div className="tb-dots">
              <i />
              <i />
              <i />
            </div>
            <div className="tb-path">
              <span className="cyan">ujjwal</span>@<span className="mag">fedora</span>:
              <span className="text-[var(--ink)]">~/portfolio/blogs/{slug}</span>
            </div>
            <div className="tb-meta">
              <span>
                <span className="tb-dot" />
                article
              </span>
            </div>
          </div>

          <article className="terminal-pane m-4 lg:m-6">
            <div className="pane-head">
              <div className="left">
                <span className="pane-tag cyan">blog detail</span>
                <span>published article</span>
              </div>
              <div className="right">
                <span>{post.readTimeInMinutes} min read</span>
              </div>
            </div>

            <div className="p-6 lg:p-8">
              <Link href="/blogs" className="terminal-button secondary mb-8">
                <ArrowLeft className="h-4 w-4" />
                Back To Blogs
              </Link>

              {post.coverImage?.url && (
                <div className="mb-8 overflow-hidden rounded-[22px] border border-[rgba(255,255,255,0.08)]">
                  <Image
                    src={post.coverImage.url}
                    alt={post.title || "Blog cover image"}
                    width={1200}
                    height={500}
                    className="h-auto w-full object-cover"
                    priority
                  />
                </div>
              )}

              <p className="terminal-kicker">blog post</p>
              <h1 className="terminal-title mt-4 max-w-4xl text-4xl leading-[0.95] md:text-6xl">
                {post.title}
              </h1>
              <p className="terminal-copy mt-5 max-w-3xl text-sm md:text-base">
                {post.brief}
              </p>

              <div className="mt-6 flex flex-wrap gap-3 text-sm text-[var(--ink-dim)]">
                <span className="pane-tag cyan">
                  <Clock3 className="h-3.5 w-3.5" />
                  {post.readTimeInMinutes} min read
                </span>
                <span className="pane-tag yellow">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {publishedDate}
                </span>
              </div>

              {post.tags?.length ? (
                <div className="mt-5 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag.name} className="tag-pill">
                      {tag.name}
                    </span>
                  ))}
                </div>
              ) : null}

              <div className="prose prose-invert mt-10 max-w-none prose-headings:font-[var(--font-display)] prose-headings:uppercase prose-headings:tracking-[0.06em] prose-p:text-[var(--ink)] prose-p:leading-8 prose-li:text-[var(--ink)] prose-strong:text-[var(--yellow)] prose-a:text-[var(--cyan)] prose-code:text-[var(--yellow)] prose-pre:border prose-pre:border-[rgba(255,255,255,0.08)] prose-pre:bg-[rgba(8,6,15,0.92)]">
                <MarkdownRenderer content={post.content?.markdown ?? ""} />
              </div>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
