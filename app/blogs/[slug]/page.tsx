import Footer from "@/components/Footer";
import MarkdownRenderer from "@/components/MarkdownRender";
import Navbar from "@/components/navbar";
import Theme from "@/components/theme";
import { BASE_URL } from "@/lib/constant";
import { getPostSlugs, getSinglePost } from "@/lib/query";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";
import { IoBookOutline } from "react-icons/io5";
export const runtime = "edge";

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slugs: string) => ({ slugs }));
}
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const DEFAULT_META = {
    title: "Blogs | Ujjwal Nepal",
    description:
      "Explore blogs by Ujjwal Nepal, where you can find something great",
  };

  try {
    const post = await getSinglePost(slug);

    if (!post) return { title: "Post not found" };

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
  } catch (error) {
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
    console.log(error);
  }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getSinglePost(slug);
  const title = post?.title;
  const image = post?.coverImage;
  return (
    <Theme>
      <div className="max-w-screen-lg mx-auto px-4 md:px-6 lg:px-8 overflow-hidden">
        <Navbar />
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {image && (
            <Image
              src={image?.url || "/default-image.jpg"}
              alt={title || "image not fond"}
              width={1200}
              height={300}
              className="w-full h-auto rounded-2xl mb-8 shadow-md object-cover"
            />
          )}

          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4 leading-tight">
            {title}
          </h1>

          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-6 space-x-2">
            <span className="flex items-center space-x-1">
              <IoBookOutline className="text-lg" />
              <span>{post?.readTimeInMinutes} min read</span>
            </span>
            <span>•</span>
            <span>
              {new Date(post?.publishedAt ?? "").toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          <div className="prose dark:prose-invert prose-lg max-w-none">
            <MarkdownRenderer content={post?.content?.markdown ?? ""} />
          </div>
        </article>
        <Footer />
      </div>
    </Theme>
  );
}
