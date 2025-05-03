"use client"
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useSelector } from "react-redux";
;
import { IBlogPostsEdge } from "@/lib/types";
import Link from "next/link";



export function BlogCard({blog}: {blog:IBlogPostsEdge}) {
    const theme = useSelector(
        (state: { theme: { darkMode: boolean } }) => state.theme.darkMode
      );
  return (
    <div
      className={` ${
        theme ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <Link href={`blogs/${blog.node.slug}`}>
          
    <Card>
      <CardHeader>
        <CardTitle>{blog.node.title}</CardTitle>
        <CardDescription>{blog.node.brief}</CardDescription>
      </CardHeader>
      <CardContent>
        
      </CardContent>
      <CardFooter className="flex justify-between">
        
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
    </Link>
    
    </div>
    
   
  )
}
