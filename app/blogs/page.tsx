import { BlogCard } from "@/components/Blogcard";
import Footer from "@/components/Footer";
import Navbar from "@/components/navbar";
import Pagination from "@/components/PageNavigation";
import Theme from "@/components/theme";
import { getPosts } from "@/lib/query";

import React from "react";
// export const runtime = "edge";

export default async function Blog({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentpage = parseInt(page || "1", 10);
  const postconnection = await getPosts(currentpage);
  const edges = postconnection?.edges ?? [];
  const hasNextPage = postconnection?.pageInfo?.hasNextPage ?? false;

  return (
    <Theme>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200 text-gray-900 dark:text-white font-sans">
        <div className="max-w-screen-md mx-auto px-4 md:px-6 lg:px-1">
          <Navbar />
          <h1 className="text-4xl font-bold mb-4 underline underline-offset-4 decoration-blue-500 mt-9">
            Blogs
          </h1>

          {edges.map(({ node }) => (
            <BlogCard key={node.id} blog={{ node }} />
          ))}
          <Pagination hasNextPage={hasNextPage} currentPage={currentpage} />
        </div>
      </div>
      <Footer />
    </Theme>
  );
}
