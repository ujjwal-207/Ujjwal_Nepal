import { BlogCard } from '@/components/Blogcard'
import Footer from '@/components/Footer';
import Navbar from '@/components/navbar';
import Pagination from '@/components/PageNavigation';
import { getPosts } from '@/lib/query';

import React from 'react'

export default async function  Blog ({searchParams, } : {
  searchParams : Promise<{page?:string}>
}){
  
  const {page} = await searchParams;
  const currentpage = parseInt (page || "1",10);
  const postconnection = await getPosts(currentpage);
  const edges = postconnection?.edges ?? [];
  const hasNextPage = postconnection?.pageInfo?.hasNextPage ?? false;

  return (
    <div className="max-w-screen-lg mx-auto px-4 md:px-6 lg:px-8 overflow-hidden">
      <Navbar/>
      
     {edges.map(({node}) => (
      <BlogCard key={node.id} blog={{node}} />
     ))}
      <Pagination hasNextPage={hasNextPage} currentPage={currentpage}/>
      <Footer/>
    </div>
    
  )
}


