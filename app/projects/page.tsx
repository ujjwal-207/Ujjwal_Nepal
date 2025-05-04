"use client"

import MainSection from "@/components/ProjectSection";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
import Theme from "@/components/theme";
export default function Projects() {
  
 
  

  return (
    <Theme>
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200 text-gray-900 dark:text-white font-sans">
    <div className="max-w-screen-md mx-auto px-4 md:px-6 lg:px-1">
        <Navbar/>
        <h1 className="text-4xl font-bold mb-4 underline underline-offset-4 decoration-blue-500 mt-9">
            Projects
          </h1>
       <MainSection />

       <Footer/>
      
      </div>
   </div>
   
   </Theme>
  );
}


