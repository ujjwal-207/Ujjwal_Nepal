"use client";

import {Mail, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Projects } from "./FeaturedProjects";
import SkillsSection from "./skills";
import Navbar from "./navbar";
import { CiLinkedin } from "react-icons/ci"
import { FaGithub } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import Link from "next/link";
import Footer from "./Footer";
import Theme from "./theme";

const Portfolio = () => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/data/Ujjwal_Nepal_Resume2.pdf';
    link.download = 'Ujjwal-NepalCV.pdf'; // Optional: set a different download filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    
      <Theme>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200 text-gray-900 dark:text-white font-sans">
      <div className="max-w-screen-md mx-auto px-4 md:px-6 lg:px-1">
      <Navbar />
      
        {/* Hero Section */}
        <section className="pt-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl font-bold leading-tight">
                Hey, I&apos;m Ujjwal Nepal ✌️
                <span className="block text-blue-600 dark:text-blue-400">
                  Full Stack Developer
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                I build exceptional digital experiences with modern technologies
              </p>
              <div className="flex gap-4">
                <Link href={"/contact"}>
                <Button className="gap-2">
                  <Mail className="h-4 w-4" />
                  Contact Me
                </Button>
                </Link>
                <Button variant="outline" className="gap-2 text-gray-600 dark:text-gray-300"onClick={handleDownload}>
                  <Download className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                  Download CV
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/data/ujj.png"
                alt="Ujjwal Nepal"
                className="rounded-full w-48 h-72 mx-auto object-cover border-4 border-blue-500"
                width={70}
                height={70}
              />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16">
        <h1 className="text-4xl font-extrabold mb-4 underline underline-offset-4 decoration-blue-500 mt-9">
            About Me
          </h1>
          {/* <div className="grid md:grid-cols-2 gap-8"> */}
            <div className="space-y-4">
              <p className="text-lg">
                I&apos;m a passionate Full Stack Developer with expertise in
                modern web technologies. My journey in software development
                has been driven by a desire to create impactful solutions that
                solve real-world problems.
              </p>
              <p className="text-lg">
                With experience in the MERN stack, Docker, and cloud
                technologies, I bring a comprehensive approach to building
                scalable applications.
              </p>
            {/* </div> */}
          </div>
        </section>

        <SkillsSection />
        <Projects />

        {/* Contact Section */}
        <section className="py-16 text-center">
          <h2 className="text-3xl font-bold mb-8">Let&apos;s Work Together</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            I&apos;m always open to discussing new projects, creative ideas or
            opportunities to be part of your visions.
          </p>
          <div className="flex justify-center gap-4">
          <a href="mailto:ujjwalnepal715@gmail.com" className="text-blue-500 underline">
            <Button className="gap-2">
              <Mail className="h-4 w-4" />
              Email Me
            </Button>
            </a>
            <Link href={"https://www.linkedin.com/in/ujjwal-nepal-33980a245/"}>
            <Button variant="outline" className="gap-2 bg-[#0077B5]">
              <CiLinkedin className="h-4 w-4" />
              </Button>
              </Link>
            <Link href={"https://github.com/ujjwal-207"}>
            <Button variant="outline" className="gap-2 bg-black ">
              <FaGithub className="h-4 w-4" />
              </Button>
              </Link>
              <Link href={"https://x.com/Ujee690"}>
            <Button variant="outline" className="gap-2 bg-black">
              <FaSquareXTwitter className="h-4 w-4" />
            </Button>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <Footer/>
      </div>
      </div>
      </Theme> 
    
  );
};

export default Portfolio;
