"use client";

import { experiences } from "@/public/data";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const ExperienceSection = () => {
  return (
    <section id="experience" className="grid-experience terminal-pane">
      <div className="pane-head">
        <div className="left">
          <span className="pane-tag magenta">experience</span>
          <span>work history</span>
        </div>
        <div className="right">
          <span>{experiences.length} roles</span>
        </div>
      </div>

      <div className="p-6 lg:p-8">
        <div className="max-w-3xl">
          <p className="terminal-kicker">career log</p>
          <h2 className="terminal-title mt-3 text-4xl md:text-5xl">
            Where I&apos;ve Built & <em>Shipped</em>
          </h2>
          <p className="terminal-copy mt-5 max-w-2xl text-sm md:text-base">
            A timeline of my professional roles, outlining engineering projects built,
            design work completed, and technologies deployed.
          </p>
        </div>

        <div className="experience-timeline mt-10">
          {experiences.map((exp) => (
            <div key={exp.company} className="experience-entry">
              <div
                className={`experience-dot ${
                  exp.type === "current" ? "current" : ""
                }`}
              />
              <article
                className="terminal-card overflow-hidden transition-transform duration-200 hover:-translate-y-0.5"
                style={{
                  borderLeft:
                    exp.type === "current"
                      ? "3px solid var(--magenta)"
                      : "2px solid var(--line-2)",
                }}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3
                      className="text-xl uppercase tracking-wider text-[var(--ink)]"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {exp.role}
                    </h3>
                    <div className="mt-1 text-sm font-medium">
                      {exp.hasOwnProperty("url") && exp.url ? (
                        <Link
                          href={exp.url}
                          target="_blank"
                          className="terminal-link inline-flex items-center gap-1 uppercase tracking-[0.08em] text-[var(--yellow)]"
                        >
                          {exp.company}
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                      ) : (
                        <span className="uppercase tracking-[0.08em] text-[var(--ink-dim)]">
                          {exp.company}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className="pane-tag text-xs tracking-wider">
                      {exp.period}
                    </span>
                    {exp.type === "current" && (
                      <span className="pane-tag magenta text-xs tracking-wider">
                        CURRENT
                      </span>
                    )}
                  </div>
                </div>

                <p className="terminal-copy mt-4 text-sm">{exp.description}</p>

                {exp.projects && exp.projects.length > 0 && (
                  <div className="mt-4 border-t border-[rgba(255,255,255,0.04)] pt-4">
                    <h4 className="text-xs uppercase tracking-wider text-[var(--ink-mute)] mb-2">
                      Key Projects
                    </h4>
                    <div className="flex flex-wrap gap-x-5 gap-y-2">
                      {exp.projects.map((proj) => (
                        <div
                          key={proj.name}
                          className="text-sm text-[var(--ink-dim)]"
                        >
                          {proj.url ? (
                            <Link
                              href={proj.url}
                              target="_blank"
                              className="terminal-link inline-flex items-center gap-1"
                            >
                              {proj.name}
                              <ArrowUpRight className="h-3 w-3" />
                            </Link>
                          ) : (
                            <span className="text-[var(--ink-dim)]">
                              {proj.name}
                            </span>
                          )}
                          {proj.description && (
                            <span className="text-[var(--ink-mute)] text-xs ml-1">
                              ({proj.description})
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {exp.techStack && exp.techStack.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2 pt-2">
                    {exp.techStack.map((tech) => (
                      <span key={tech} className="tag-pill">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
