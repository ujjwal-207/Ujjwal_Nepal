import { BlogCard } from "@/components/Blogcard";
import Footer from "@/components/Footer";
import Navbar from "@/components/navbar";
import Pagination from "@/components/PageNavigation";
import { getPosts } from "@/lib/query";

export const runtime = "edge";

export default async function Blog({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = parseInt(page || "1", 10);
  const postconnection = await getPosts(currentPage);
  const edges = postconnection?.edges ?? [];
  const hasNextPage = postconnection?.pageInfo?.hasNextPage ?? false;

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
              <span className="text-[var(--ink)]">~/portfolio/blogs</span>
            </div>
            <div className="tb-meta">
              <span>
                <span className="tb-dot" />
                page {currentPage}
              </span>
            </div>
          </div>

          <section className="terminal-pane m-4 lg:m-6">
            <div className="pane-head">
              <div className="left">
                <span className="pane-tag cyan">blogs</span>
                <span>published posts</span>
              </div>
              <div className="right">
                <span>{edges.length} entries</span>
              </div>
            </div>

            <div className="p-6 lg:p-8">
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="terminal-kicker">writing archive</p>
                  <h1 className="terminal-title mt-3 text-4xl md:text-6xl">
                    Notes On Shipping <em>Products</em>
                  </h1>
                  <p className="terminal-copy mt-5 max-w-2xl text-sm md:text-base">
                    Project breakdowns, lessons from building, and technical
                    decisions that mattered after the code left local dev.
                  </p>
                </div>
                <div className="terminal-stat min-w-[150px]" title={`Current Page: ${currentPage}`}>
                  <span className="label" title="current page">current page</span>
                  <span className="value" title={String(currentPage)}>{currentPage}</span>
                </div>
              </div>

              <div className="mt-10 grid gap-6">
                {edges.map(({ node }) => (
                  <BlogCard key={node.id} blog={{ node }} />
                ))}
              </div>

              <Pagination hasNextPage={hasNextPage} currentPage={currentPage} />
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
