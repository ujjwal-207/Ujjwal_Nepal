"use client"

import MainSection from "@/components/ProjectSection";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
import Theme from "@/components/theme";
export default function Projects({children} : {children: React.ReactNode}) {
  
 
  

  return (
    <Theme>
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
        <div className="max-w-screen-lg mx-auto px-4 md:px-6 lg:px-8 overflow-hidden">
        <Navbar/>
        <h1 className='underline font-extrabold mt-2 text-2xl'>Projects</h1>
       <MainSection />

       <Footer/>
      
      </div>
   </div>
   {children}
   </Theme>
  );
}


