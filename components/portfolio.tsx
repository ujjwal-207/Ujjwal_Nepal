"use client";

import { Github, Linkedin, Twitter, Mail, Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import Image from "next/image";

import { useSelector } from "react-redux";


import { Projects } from "./Projects";

import SkillsSection from "./skills";

import Navbar from "./navbar";

const Portfolio = () => {
  const theme = useSelector(
    (state: { theme: { darkMode: boolean } }) => state.theme.darkMode
  );

  return (
    <div className="overflow-hidden container " >
      <Navbar/>
      <div
        className={`min-h-screen ${
          theme ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        }`}
      >
        {/* Hero Section */}
        <section className="pt-32  px-4">
          <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center">
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
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
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
        <section className="py-0 px-4">
          <div className="container mx-auto">
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
          </div>
        </section>
        <SkillsSection />

        <Projects />

        {/* Contact Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">
              Let&apos;s Work Together
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              I&apos;m always open to discussing new projects, creative ideas or
              opportunities to be part of your visions.
            </p>
            <div className="flex justify-center gap-4">
              <Button className="gap-2">
                <Mail className="h-4 w-4" />
                Email Me
              </Button>
              <Button variant="outline" className="gap-2">
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </Button>
              <Button variant="outline" className="gap-2">
                <Github className="h-4 w-4" />
                GitHub
              </Button>
              <Button variant="outline" className="gap-2">
                <Twitter className="h-4 w-4" />
                Twitter
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 border-t">
          <div className="container mx-auto text-center">
            <p>© 2024 Ujjwal Nepal. All rights reserved.</p>
          </div>
        </footer>
      </div>
      </div>
  );
};

export default Portfolio;
