"use client";

import React, { useState, useEffect } from "react";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Download,
  ExternalLink,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import { useSelector } from "react-redux";
import { Navbar } from "./navbar";

const Portfolio = () => {
  const theme = useSelector(
    (state: { theme: { darkMode: boolean } }) => state.theme.darkMode
  );

  const [activeFilter, setActiveFilter] = useState("all");

  // Sample project data
  const projects = [
    {
      title: "E-commerce Platform",
      description:
        "Full-stack e-commerce solution with real-time inventory management",
      tags: ["MERN", "Docker", "Redux"],
      image: "/api/placeholder/400/300",
      github: "#",
      demo: "#",
    },
    {
      title: "Task Management System",
      description: "Collaborative task management with real-time updates",
      tags: ["Next.js", "MongoDB", "WebSocket"],
      image: "/api/placeholder/400/300",
      github: "#",
      demo: "#",
    },
  ];

  // Sample skills data
  const skills = [
    {
      category: "Frontend",
      items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    },
    {
      category: "Backend",
      items: ["Node.js", "Express", "MongoDB", "PostgreSQL"],
    },
    { category: "DevOps", items: ["Docker", "CI/CD", "AWS", "Vercel"] },
  ];

  return (
    <>
      <Navbar />
      <div
        className={`min-h-screen ${
          theme ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        }`}
      >
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4">
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
                src="/api/placeholder/400/400"
                alt="Ujjwal Nepal"
                className="rounded-full w-64 h-64 mx-auto object-cover border-4 border-blue-500"
                width={10}
                height={10}
              />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
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
              <div className="grid grid-cols-2 gap-4">
                {skills.map((skillGroup) => (
                  <Card key={skillGroup.category}>
                    <CardHeader>
                      <CardTitle>{skillGroup.category}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-4">
                        {skillGroup.items.map((skill) => (
                          <li key={skill}>{skill}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-8">Featured Projects</h2>
            <div className="flex gap-4 mb-8">
              <Button
                variant={activeFilter === "all" ? "default" : "outline"}
                onClick={() => setActiveFilter("all")}
              >
                All
              </Button>
              <Button
                variant={activeFilter === "MERN" ? "default" : "outline"}
                onClick={() => setActiveFilter("MERN")}
              >
                MERN
              </Button>
              <Button
                variant={activeFilter === "Next.js" ? "default" : "outline"}
                onClick={() => setActiveFilter("Next.js")}
              >
                Next.js
              </Button>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project) => (
                <Card key={project.title} className="overflow-hidden group">
                  <Image
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    width={10}
                    height={10}
                  />
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {project.description}
                    </p>
                    <div className="flex gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      <Button variant="outline" className="gap-2">
                        <Github className="h-4 w-4" />
                        Code
                      </Button>
                      <Button className="gap-2">
                        <ExternalLink className="h-4 w-4" />
                        Live Demo
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
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
    </>
  );
};

export default Portfolio;
