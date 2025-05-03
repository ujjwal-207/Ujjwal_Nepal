import MarkdownRenderer from '@/components/MarkdownRender';
import { BASE_URL } from '@/lib/constant';
import { getPostSlugs, getSinglePost } from '@/lib/query';
import { Metadata } from 'next';
import Image from 'next/image';
import React from 'react';
import { IoBookOutline } from "react-icons/io5";

export async function generateStaticParams(){
    const slugs = await getPostSlugs();
    return slugs.map((slugs:string) =>({slugs}));
}
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const DEFAULT_META = {
    title: "Blog | Samir Tiwari",
    description:
      "Explore blogs by Samir Tiwari, where you can find insightful articles, tutorials, and thoughts on various topics.",
  };

  try {
    const post = await getSinglePost(slug);

    if (!post) return { title: "Post not found" };

    const title = post.title ?? "Blog | Samir Tiwari";
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
        url: new URL(`${BASE_URL}/blog/${slug}`),
      },
      twitter: {
        ...DEFAULT_META,
        card: "summary_large_image",
      },
    };
    console.log(error)
  }
}

export default async function PostPage({params} : {params: Promise<{slug:string}>}) {
    const { slug } = await params;
    const post = await getSinglePost(slug);
    const title = post?.title
    const image = post?.coverImage
    // const url = post?.url
  return (
    <article className="max-w-3xl mx-auto px-4 py-8 ">
    {image && (
      <Image
        src={"image"}
        alt={"title"}
        width={1200}
        height={300}
        className="w-full h-auto rounded-lg mb-5"
      />
    )}
    <h1 className="text-4xl font-bold ">{title}</h1>

    <div className="flex gap-2 items-center text-sm text-gray-500 font-medium my-4">
      <div className="flex items-center gap-2 max-sm:hidden ">
        
      </div>
      <span className="text-gray-400 max-sm:hidden"> • </span>

      <span className="flex items-center gap-1">
        <IoBookOutline/> {post?.readTimeInMinutes} min read
      </span>
      <span className="text-gray-400"> • </span>
      {new Date(post?.publishedAt ?? "").toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
    </div>
    <div className="prose lg:prose-xl">
      <MarkdownRenderer content={post?.content?.markdown ?? ""} />
    </div>
  </article>
  )
}
