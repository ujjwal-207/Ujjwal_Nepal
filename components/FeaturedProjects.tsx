"use client";

import { featuredprojects } from "@/public/data";
import { ArrowUpRight, Github } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export const Projects = () => {
  return (
    <section id="projects" className="grid-projects terminal-pane">
      <div className="pane-head">
        <div className="left">
          <span className="pane-tag yellow">projects</span>
          <span>featured builds</span>
        </div>
        <div className="right">
          <Link href="/projects" className="terminal-link">
            open archive
          </Link>
        </div>
      </div>

      <div className="p-6 lg:p-8">
        <div className="max-w-3xl">
          <p className="terminal-kicker">portfolio queue</p>
          <h2 className="terminal-title mt-3 text-4xl md:text-5xl">
            Shipping Product Work With <em>Real</em> Backend Weight
          </h2>
          <p className="terminal-copy mt-5 max-w-2xl text-sm md:text-base">
            A selection of products built around realtime interaction, useful
            workflows, and frontend systems backed by solid application logic.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {featuredprojects.map((project, index) => (
            <ProjectCard key={project.title} index={index} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({
  index,
  project,
}: {
  index: number;
  project: (typeof featuredprojects)[0];
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "120px", threshold: 0.1 },
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <article className="terminal-card overflow-hidden transition-transform duration-200 hover:-translate-y-1">
      <div className="relative aspect-video overflow-hidden rounded-[14px] border border-[rgba(255,255,255,0.08)] bg-[rgba(6,5,13,0.9)]">
        {!videoLoaded && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-[rgba(37,29,61,0.85)] via-[rgba(70,58,104,0.55)] to-[rgba(37,29,61,0.85)]" />
        )}
        <video
          ref={videoRef}
          src={project.video}
          autoPlay={isInView}
          loop
          muted
          playsInline
          preload="metadata"
          className={`h-full w-full object-cover object-top transition-opacity duration-300 ${
            videoLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoadedData={() => setVideoLoaded(true)}
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[rgba(10,7,19,0.92)] to-transparent" />
      </div>

      <div className="mt-5 flex items-center justify-between">
        <span
          className="text-3xl text-[var(--yellow)]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="pane-tag magenta">{index === 0 ? "realtime" : "video"}</span>
      </div>

      <h3
        className="mt-4 text-2xl uppercase tracking-[0.12em] text-[var(--ink)]"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {project.title}
      </h3>
      <p className="terminal-copy mt-4 text-sm">{project.description}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span key={tag} className="tag-pill">
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {project.github !== "#" && (
          <Link
            href={project.github}
            target="_blank"
            className="terminal-button secondary"
          >
            <Github className="h-4 w-4" />
            GitHub
          </Link>
        )}
        {project.demo !== "#" && (
          <Link href={project.demo} target="_blank" className="terminal-button">
            Live Demo
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </article>
  );
};
