import { BlogCard } from '@/components/Blogcard'
import Footer from '@/components/Footer';
import Navbar from '@/components/navbar';
import Pagination from '@/components/PageNavigation';
import Theme from '@/components/theme';
import { getPosts } from '@/lib/query';

import React from 'react'

export default async function  Blog ({searchParams,children } : {
  searchParams : Promise<{page?:string}> ; children : React.ReactNode
}){
  
  const {page} = await searchParams;
  const currentpage = parseInt (page || "1",10);
  const postconnection = await getPosts(currentpage);
  const edges = postconnection?.edges ?? [];
  const hasNextPage = postconnection?.pageInfo?.hasNextPage ?? false;

  return (
    <Theme>
      
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
    <div className="max-w-screen-lg mx-auto px-4 md:px-6 lg:px-8">
      <Navbar/>
      <h1 className='underline font-extrabold mt-2 text-2xl'>Blogs</h1>
      
     {edges.map(({node}) => (
      <BlogCard key={node.id} blog={{node}} />
     ))}
      <Pagination hasNextPage={hasNextPage} currentPage={currentpage}/>
      
    </div>
    
    {children}
    </div>
    <Footer/>
    </Theme>
    
  )
}


