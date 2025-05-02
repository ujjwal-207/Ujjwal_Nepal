"use client";

import {Mail, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useSelector } from "react-redux";

import { Projects } from "./Projects";
import SkillsSection from "./skills";
import Navbar from "./navbar";
import { CiLinkedin } from "react-icons/ci"
import { FaGithub } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import Link from "next/link";
import Footer from "./Footer";

const Portfolio = () => {
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
      <Navbar />
      
        {/* Hero Section */}
        <section className="pt-32">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl font-bold leading-tight">
                Hi, I&apos;m Ujjwal Nepal
                <span className="block text-blue-600 dark:text-blue-400">
                  Full Stack Developer
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                I build exceptional digital experiences with modern technologies
              </p>
              <div className="flex gap-4">
                <Button className="gap-2">
                  <Mail className="h-4 w-4" />
                  Contact Me
                </Button>
                <Button variant="outline" className="gap-2 text-gray-600 dark:text-gray-300">
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
          <h2 className="text-3xl font-bold mb-8">About Me</h2>
          <div className="grid md:grid-cols-2 gap-8">
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
            </div>
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
            <Button className="gap-2">
              <Mail className="h-4 w-4" />
              Email Me
            </Button>
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
  );
};

export default Portfolio;
