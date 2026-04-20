"use client";

import { skills } from "@/public/data";
import RotatingCards from "./ui/rotatingCards";

const SkillsSection = () => {
  return (
    <section id="skills" className="grid-skills terminal-pane">
      <div className="pane-head">
        <div className="left">
          <span className="pane-tag cyan">skills</span>
          <span>stack overview</span>
        </div>
        <div className="right">
          <span>3d showcase</span>
        </div>
      </div>

      <div className="grid gap-8 p-6 lg:grid-cols-[1.1fr_0.9fr] lg:p-8">
        <div>
          <p className="terminal-kicker">stack index</p>
          <h2 className="terminal-title mt-3 text-4xl md:text-5xl">
            Tools That Ship The <em>Work</em>
          </h2>
          <p className="terminal-copy mt-5 max-w-2xl text-sm md:text-base">
            The stack I use most across frontend work, backend systems, and the
            tools that keep development moving.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
            {skills.map((group) => (
              <article key={group.category} className="terminal-card h-full min-h-[180px]">
                <h3
                  className="break-words text-sm uppercase tracking-[0.08em] text-[var(--yellow)] sm:text-base md:text-lg"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {group.category}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="tag-pill">
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="terminal-card relative min-h-[520px] overflow-hidden">
          <div className="absolute inset-x-6 top-6 h-px bg-gradient-to-r from-transparent via-[var(--cyan)] to-transparent opacity-40" />
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--ink-mute)]">
            live rotation
          </p>
          <div className="relative h-[460px]">
            <RotatingCards />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
