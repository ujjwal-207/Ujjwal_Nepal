"use client"
import * as React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IBlogPostsEdge } from "@/lib/types";
import Link from "next/link";
export function BlogCard({blog}: {blog:IBlogPostsEdge}) {
    
  return (
    <Link href={`blogs/${blog.node.slug}`}>
          <Card className=" bg-white/75 dark:bg-gray-900 mt-3 border-2">
      <CardHeader>
        <CardTitle className="text-gray-600 dark:text-gray-300">{blog.node.title}</CardTitle>
        <CardDescription>{blog.node.brief}</CardDescription>
      </CardHeader>
      <CardContent>
        
      </CardContent>
      <CardFooter className="flex justify-between">
        </CardFooter>
    </Card>
    </Link>
)
}
