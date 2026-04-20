"use client";

import { featuredprojects } from "@/public/data";
import {
  ArrowUpRight,
  Clock3,
  Github,
  Linkedin,
  Mail,
  Rss,
  Terminal,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import Footer from "./Footer";
import { Projects } from "./FeaturedProjects";
import Navbar from "./navbar";
import SkillsSection from "./skills";

type SearchGroup = "Sections" | "Headers" | "Projects" | "Commands";

type SearchItem = {
  id: string;
  label: string;
  value: string;
  group: SearchGroup;
  command: string;
  keywords: string[];
  action: () => void;
};

const sectionEntries = [
  { label: "home", command: "cd home/", target: "home" },
  { label: "projects", command: "cd projects/", target: "projects" },
  { label: "skills", command: "cd skills/", target: "skills" },
  { label: "blogs", command: "open blogs", href: "/blogs" },
  { label: "contact", command: "cd contact/", target: "contact" },
];

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/ujjwal-207",
    icon: Github,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ujjwal-nepal-33980a245/",
    icon: Linkedin,
  },
  {
    label: "Twitter",
    href: "https://x.com/Ujee690",
    icon: Twitter,
  },
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function downloadResume() {
  const link = document.createElement("a");
  link.href = "/data/UjjwalNepal.pdf";
  link.download = "Ujjwal-NepalCV.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function matchesSearch(item: SearchItem, query: string) {
  if (!query) {
    return true;
  }

  const q = query.toLowerCase().trim();
  const normalized = [item.label, item.command, item.value, ...item.keywords]
    .join(" ")
    .toLowerCase();

  if (normalized.includes(q)) {
    return true;
  }

  return q.split(/\s+/).every((part) => normalized.includes(part));
}

const terminalLines = [
  "npm run ship -- --with-rhythm",
  "pnpm build && pnpm deploy",
  "open /blogs",
];

const Portfolio = () => {
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [history, setHistory] = useState<string[]>(["ls"]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [headerItems, setHeaderItems] = useState<SearchItem[]>([]);
  const [now, setNow] = useState("--:--:--");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const headers = Array.from(document.querySelectorAll("h1, h2, h3")).filter(
      (header) => header.closest("[data-search-root]"),
    );

    const indexedHeaders = headers
      .map((header, index) => {
        const element = header as HTMLElement;
        if (!element.id) {
          element.id = `header-${index}`;
        }

        const label = element.textContent?.trim();
        if (!label) {
          return null;
        }

        return {
          id: `header-${element.id}`,
          label,
          value: label,
          group: "Headers" as const,
          command: `open ${label.toLowerCase()}`,
          keywords: [label.toLowerCase()],
          action: () => element.scrollIntoView({ behavior: "smooth", block: "center" }),
        };
      })
      .filter(Boolean) as SearchItem[];

    setHeaderItems(indexedHeaders);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsPaletteOpen(true);
      }

      if (event.key === "Escape") {
        setIsPaletteOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (isPaletteOpen) {
      window.setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [isPaletteOpen]);

  useEffect(() => {
    const updateNow = () => {
      const formatter = new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "Asia/Kathmandu",
      });

      setNow(formatter.format(new Date()));
    };

    updateNow();
    const id = window.setInterval(updateNow, 1000);
    return () => window.clearInterval(id);
  }, []);

  const items = useMemo(() => {
    const sections: SearchItem[] = sectionEntries.map((entry) => ({
      id: `section-${entry.label}`,
      label: entry.label,
      value: entry.label,
      group: "Sections",
      command: entry.command,
      keywords: [entry.label, "section", "navigate"],
      action: () => {
        setIsPaletteOpen(false);
        if (entry.href) {
          window.location.href = entry.href;
          return;
        }
        scrollToId(entry.target!);
      },
    }));

    const projectEntries: SearchItem[] = featuredprojects.map((project) => ({
      id: `project-${project.title}`,
      label: project.title,
      value: project.title,
      group: "Projects",
      command: `open ${project.title.toLowerCase()}`,
      keywords: project.tags,
      action: () => {
        setIsPaletteOpen(false);
        if (project.github && project.github !== "#") {
          window.open(project.github, "_blank", "noopener,noreferrer");
        }
      },
    }));

    const commands: SearchItem[] = [
      {
        id: "command-ls",
        label: "List sections",
        value: "ls",
        group: "Commands",
        command: "ls",
        keywords: ["sections", "list"],
        action: () => setHistory((current) => [...current, "ls"]),
      },
      {
        id: "command-clear",
        label: "Clear terminal history",
        value: "clear",
        group: "Commands",
        command: "clear",
        keywords: ["history", "reset"],
        action: () => setHistory([]),
      },
      {
        id: "command-blogs",
        label: "Open Blogs",
        value: "blogs",
        group: "Commands",
        command: "open blogs",
        keywords: ["blogs", "articles", "posts"],
        action: () => {
          setIsPaletteOpen(false);
          window.location.href = "/blogs";
        },
      },
    ];

    return [...commands, ...sections, ...headerItems, ...projectEntries];
  }, [headerItems]);

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery || normalizedQuery === "ls") {
      return items.filter((item) => item.group !== "Commands" || item.value === "ls");
    }

    if (normalizedQuery === "clear") {
      return items.filter((item) => item.value === "clear");
    }

    if (normalizedQuery.startsWith("cd ")) {
      return items.filter(
        (item) => item.group === "Sections" && matchesSearch(item, normalizedQuery.slice(3)),
      );
    }

    if (normalizedQuery.startsWith("open ")) {
      return items.filter(
        (item) =>
          (item.group === "Projects" || item.value === "blogs") &&
          matchesSearch(item, normalizedQuery.slice(5)),
      );
    }

    return items.filter((item) => matchesSearch(item, normalizedQuery));
  }, [items, query]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query, isPaletteOpen]);

  const runSelectedItem = (item: SearchItem | undefined) => {
    if (!item) {
      return;
    }

    setHistory((current) => [...current, item.command]);
    item.action();
    if (item.value !== "clear") {
      setQuery("");
    }
  };

  const handleCommandSubmit = () => {
    const normalized = query.trim().toLowerCase();

    if (normalized === "clear") {
      setHistory([]);
      setQuery("");
      return;
    }

    if (!filteredItems.length) {
      setHistory((current) => [...current, query || ""]);
      return;
    }

    runSelectedItem(filteredItems[selectedIndex]);
  };

  return (
    <div className="terminal-shell min-h-screen">
      <Navbar onOpenSearch={() => setIsPaletteOpen(true)} />

      <main data-search-root className="mx-auto max-w-7xl px-4 pb-6">
        <div className="terminal-frame">
          <div className="shell-titlebar">
            <div className="tb-dots">
              <i />
              <i />
              <i />
            </div>
            <div className="tb-path">
              <span className="cyan">ujjwal</span>@<span className="mag">fedora</span>:
              <span className="text-[var(--ink)]">~/portfolio</span>
            </div>
            <div className="tb-meta">
              <span>
                <span className="tb-dot" />
                live
              </span>
              <span>{now}</span>
            </div>
          </div>

          <div className="terminal-grid">
            <section id="home" className="grid-hero terminal-pane">
              <div className="pane-head">
                <div className="left">
                  <span className="pane-tag magenta">~/whoami</span>
                  <span>ujjwal.nepal</span>
                </div>
                <div className="right">
                  <span>Kathmandu</span>
                </div>
              </div>

              <div className="grid gap-8 p-6 lg:grid-cols-[1.1fr_0.9fr] lg:p-8">
                <div>
                  <p className="terminal-kicker">full-stack engineer</p>
                  <h1 className="terminal-title mt-4 text-5xl leading-[0.9] md:text-7xl">
                    Ujjwal <em>Nepal</em>
                  </h1>
                  <p className="terminal-copy mt-6 max-w-2xl text-sm md:text-base">
                    I build full-stack products with polished interfaces,
                    dependable backend systems, and clean user flows from idea
                    to deployment.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link href="/contact" className="terminal-button">
                      <Mail className="h-4 w-4" />
                      Contact Me
                    </Link>
                    <button type="button" onClick={downloadResume} className="terminal-button secondary">
                      <ArrowUpRight className="h-4 w-4" />
                      Download CV
                    </button>
                  </div>

                  <div className="mt-8 grid gap-4 sm:grid-cols-3">
                    <div className="terminal-stat">
                      <span className="label">focus</span>
                      <span className="value">Next.js</span>
                    </div>
                    <div className="terminal-stat">
                      <span className="label">backend</span>
                      <span className="value">Node.js</span>
                    </div>
                    <div className="terminal-stat">
                      <span className="label">writing</span>
                      <span className="value">Blogs</span>
                    </div>
                  </div>
                </div>

                <div className="terminal-card flex flex-col justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-[var(--ink-mute)]">
                      terminal loop
                    </p>
                    <div className="mt-4 space-y-3 text-sm text-[var(--ink)]">
                      {terminalLines.map((line) => (
                        <div key={line} className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(9,7,18,0.88)] px-4 py-3">
                          <span className="text-[var(--cyan)]">[ujjwal@fedora ~/portfolio]$ </span>
                          <span>{line}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 rounded-[18px] border border-[rgba(255,255,255,0.08)] bg-[rgba(17,13,30,0.88)] p-5">
                    <div className="flex items-center gap-3">
                      <div className="animate-spin-slow flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(243,230,125,0.3)]">
                        <div className="h-3 w-3 rounded-full bg-[var(--yellow)]" />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.24em] text-[var(--ink-mute)]">
                          now compiling
                        </p>
                        <p className="mt-1 text-lg text-[var(--ink)]">shipping clean builds</p>
                      </div>
                    </div>
                    <div className="mt-5 flex h-12 items-end gap-1.5">
                      {[0.35, 0.72, 0.5, 0.88, 0.42, 0.74, 0.56, 0.94].map((value, index) => (
                        <span
                          key={`${value}-${index}`}
                          className="w-3 rounded-full bg-[var(--magenta)]"
                          style={{
                            height: `${Math.max(18, value * 42)}px`,
                            animation: `waveform ${0.95 + index * 0.08}s ease-in-out infinite`,
                            transformOrigin: "bottom",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div className="grid-stack flex flex-col gap-4">
              <section className="terminal-pane">
                <div className="pane-head">
                  <div className="left">
                    <span className="pane-tag cyan">blogs</span>
                    <span>latest writing</span>
                  </div>
                  <div className="right">
                    <Clock3 className="h-3.5 w-3.5" />
                    <span>new posts</span>
                  </div>
                </div>
                <div className="p-6">
                  <p className="terminal-kicker">blog index</p>
                  <h2 className="terminal-title mt-3 text-3xl md:text-4xl">
                    Writing, Notes, And <em>Build Logs</em>
                  </h2>
                  <p className="terminal-copy mt-4 text-sm">
                    Thoughts on projects, lessons from shipping, and technical
                    details from the work behind the screen.
                  </p>
                  <div className="terminal-list mt-6">
                    <div className="terminal-card">
                      <p className="text-xs uppercase tracking-[0.22em] text-[var(--ink-mute)]">
                        route
                      </p>
                      <p className="mt-2 text-sm text-[var(--ink)]">/blogs</p>
                    </div>
                    <div className="terminal-card">
                      <p className="text-xs uppercase tracking-[0.22em] text-[var(--ink-mute)]">
                        platform
                      </p>
                      <p className="mt-2 text-sm text-[var(--ink)]">
                        external blog sync
                      </p>
                    </div>
                  </div>
                  <Link href="/blogs" className="terminal-button mt-6">
                    <Rss className="h-4 w-4" />
                    Read Blogs
                  </Link>
                </div>
              </section>

              <section className="terminal-pane">
                <div className="pane-head">
                  <div className="left">
                    <span className="pane-tag yellow">navigator</span>
                    <span>command palette</span>
                  </div>
                  <div className="right">
                    <Terminal className="h-3.5 w-3.5" />
                    <span>ctrl+k</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-3 text-sm">
                    {history.slice(-3).map((entry, index) => (
                      <div
                        key={`${entry}-${index}`}
                        className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(10,7,18,0.82)] px-4 py-3"
                      >
                        <span className="text-[var(--cyan)]">[ujjwal@fedora ~/portfolio]$ </span>
                        <span className="text-[var(--ink)]">{entry}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      type="button"
                      className="terminal-button secondary"
                      onClick={() => setIsPaletteOpen(true)}
                    >
                      <Terminal className="h-4 w-4" />
                      Open Search
                    </button>
                    <button
                      type="button"
                      className="terminal-button secondary"
                      onClick={() => scrollToId("projects")}
                    >
                      Jump Projects
                    </button>
                  </div>
                </div>
              </section>
            </div>

            <Projects />
            <SkillsSection />

            <section id="contact" className="grid-contact terminal-pane">
              <div className="pane-head">
                <div className="left">
                  <span className="pane-tag magenta">contact</span>
                </div>
              </div>
              <div className="flex h-full flex-col gap-6 p-6 lg:p-8">
                <div>
                  <p className="terminal-kicker">next move</p>
                  <h2 className="terminal-title mt-3 text-4xl md:text-5xl">
                    Let&apos;s Build Something That <em>Ships</em>
                  </h2>
                  <p className="terminal-copy mt-4 max-w-xl text-sm md:text-base">
                    Open to freelance work, product builds, and engineering
                    roles where strong execution matters.
                  </p>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  <Link href="/contact" className="terminal-button w-full">
                    <Mail className="h-4 w-4" />
                    Open Contact Form
                  </Link>
                  {socialLinks.map(({ label, href, icon: Icon }) => (
                    <Link
                      key={label}
                      href={href}
                      target="_blank"
                      className="terminal-button secondary w-full"
                    >
                      <Icon className="h-4 w-4" />
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />

      {isPaletteOpen && (
        <div className="fixed inset-0 z-[100] bg-[rgba(6,4,15,0.78)] px-4 py-10 backdrop-blur-[6px]">
          <div className="terminal-frame mx-auto max-w-[600px] overflow-hidden rounded-[18px]">
            <div className="shell-titlebar border-b border-[var(--line)]">
              <div className="tb-dots">
                <i />
                <i />
                <i />
              </div>
              <div className="tb-path">
                <span className="cyan">ujjwal</span>@<span className="mag">fedora</span>:
                <span className="text-[var(--ink)]">~/portfolio/search</span>
              </div>
              <button type="button" onClick={() => setIsPaletteOpen(false)} className="text-[var(--ink)]">
                Esc
              </button>
            </div>

            <div className="p-4">
              <div className="space-y-2 text-sm text-[var(--ink)]">
                {history.slice(-3).map((entry, index) => (
                  <div key={`${entry}-${index}`}>
                    <span className="text-[var(--cyan)]">[ujjwal@fedora ~/portfolio]$ </span>
                    <span>{entry}</span>
                  </div>
                ))}
              </div>

              <label className="mt-4 flex items-center gap-2 text-sm">
                <span className="text-[var(--cyan)]">[ujjwal@fedora ~/portfolio]$</span>
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "ArrowDown") {
                      event.preventDefault();
                      setSelectedIndex((current) =>
                        Math.min(current + 1, Math.max(filteredItems.length - 1, 0)),
                      );
                    }

                    if (event.key === "ArrowUp") {
                      event.preventDefault();
                      setSelectedIndex((current) => Math.max(current - 1, 0));
                    }

                    if (event.key === "Tab") {
                      event.preventDefault();
                      const suggestion = filteredItems[selectedIndex];
                      if (suggestion) {
                        setQuery(suggestion.command);
                      }
                    }

                    if (event.key === "Enter") {
                      event.preventDefault();
                      handleCommandSubmit();
                    }

                    if (event.key === "Escape") {
                      setIsPaletteOpen(false);
                    }
                  }}
                  className="min-w-0 flex-1 bg-transparent text-[var(--ink)] placeholder:text-[var(--ink-mute)]"
                  placeholder="ls | cd skills/ | open blogs"
                />
              </label>

              <div className="mt-5 max-h-[360px] overflow-y-auto rounded-[16px] border border-[rgba(255,255,255,0.08)] bg-[rgba(8,6,15,0.75)] p-2">
                {filteredItems.length === 0 ? (
                  <div className="px-3 py-4 text-sm text-[var(--ink-mute)]">
                    No matches for <span className="text-[var(--yellow)]">{query || "that command"}</span>
                  </div>
                ) : (
                  filteredItems.map((item, index) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => runSelectedItem(item)}
                      className={`flex w-full items-center justify-between rounded-[12px] px-3 py-3 text-left ${
                        index === selectedIndex
                          ? "bg-[rgba(122,223,245,0.12)] text-[var(--ink)]"
                          : "text-[var(--ink-dim)]"
                      }`}
                    >
                      <span>
                        <span className="block text-[10px] uppercase tracking-[0.22em] text-[var(--ink-mute)]">
                          {item.group}
                        </span>
                        <span className="mt-1 block text-sm">{item.label}</span>
                      </span>
                      <span className="text-xs uppercase tracking-[0.16em] text-[var(--cyan)]">
                        {item.command}
                      </span>
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
