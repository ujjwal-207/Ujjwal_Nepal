"use client"

import MainSection from "@/components/MainSection";
import { useSelector } from "react-redux";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
export default function Projects() {
 
  const theme = useSelector(
    (state: { theme: { darkMode: boolean } }) => state.theme.darkMode
  );

  return (
    <div
      className={` ${
        theme ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
        <div className="max-w-screen-lg mx-auto px-4 md:px-6 lg:px-8">
        <Navbar/>
       <MainSection />

       <Footer/>
      
      </div>
   </div>
  );
}


