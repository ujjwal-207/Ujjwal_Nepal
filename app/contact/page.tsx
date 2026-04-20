import Footer from "@/components/Footer";
import Navbar from "@/components/navbar";
import { Github, Linkedin, Mail, MapPin, Twitter } from "lucide-react";
import Link from "next/link";

export const runtime = "edge";

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

export default function Contact() {
  return (
    <div className="terminal-shell min-h-screen">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pb-6">
        <div className="terminal-frame overflow-hidden">
          <div className="shell-titlebar">
            <div className="tb-dots">
              <i />
              <i />
              <i />
            </div>
            <div className="tb-path">
              <span className="cyan">ujjwal</span>@<span className="mag">fedora</span>:
              <span className="text-[var(--ink)]">~/portfolio/contact</span>
            </div>
            <div className="tb-meta">
              <span>
                <span className="tb-dot" />
                relay
              </span>
            </div>
          </div>

          <div className="grid gap-6 p-4 lg:grid-cols-[0.92fr_1.08fr] lg:p-6">
            <section className="terminal-pane">
              <div className="pane-head">
                <div className="left">
                  <span className="pane-tag cyan">contact</span>
                  <span>direct channel</span>
                </div>
                <div className="right">
                  <span>open for work</span>
                </div>
              </div>

              <div className="space-y-6 p-6 lg:p-8">
                <div>
                  <p className="terminal-kicker">message relay</p>
                  <h1 className="terminal-title mt-3 text-4xl md:text-6xl">
                    Let&apos;s Build With <em>Rhythm</em>
                  </h1>
                  <p className="terminal-copy mt-5 text-sm md:text-base">
                    Full-time roles, freelance product work, and focused builds
                    are all welcome. If you have something useful to build, I
                    would like to hear about it.
                  </p>
                </div>

                <div className="terminal-list">
                  <div className="terminal-card">
                    <p className="text-xs uppercase tracking-[0.22em] text-[var(--ink-mute)]">
                      direct line
                    </p>
                    <a
                      href="mailto:ujjwalnepal715@gmail.com"
                      className="mt-3 inline-flex items-center gap-3 text-[var(--ink)]"
                    >
                      <Mail className="h-5 w-5 text-[var(--yellow)]" />
                      ujjwalnepal715@gmail.com
                    </a>
                  </div>

                  <div className="terminal-card">
                    <p className="text-xs uppercase tracking-[0.22em] text-[var(--ink-mute)]">
                      location
                    </p>
                    <div className="mt-3 inline-flex items-center gap-3 text-[var(--ink)]">
                      <MapPin className="h-5 w-5 text-[var(--cyan)]" />
                      Nepal
                    </div>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {socialLinks.map(({ label, href, icon: Icon }) => (
                    <Link
                      key={label}
                      href={href}
                      target="_blank"
                      className="terminal-button secondary w-full justify-center"
                    >
                      <Icon className="h-4 w-4" />
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            </section>

            <section className="terminal-pane">
              <div className="pane-head">
                <div className="left">
                  <span className="pane-tag yellow">form</span>
                  <span>formspree active</span>
                </div>
                <div className="right">
                  <span>POST relay</span>
                </div>
              </div>

              <div className="p-6 lg:p-8">
                <div className="mb-6 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-[var(--ink-mute)]">
                      fedora relay
                    </p>
                    <h2
                      className="mt-3 text-3xl uppercase tracking-[0.14em] text-[var(--ink)]"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      Send A Message
                    </h2>
                  </div>
                  <span className="pane-tag magenta">live</span>
                </div>

                <form
                  action="https://formspree.io/f/xwpolzzv"
                  method="POST"
                  className="space-y-5"
                >
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-xs uppercase tracking-[0.22em] text-[var(--ink-mute)]"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      required
                      className="w-full rounded-[16px] border border-[rgba(255,255,255,0.08)] bg-[rgba(10,7,18,0.82)] px-4 py-3 text-[var(--ink)] placeholder:text-[var(--ink-mute)]"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-xs uppercase tracking-[0.22em] text-[var(--ink-mute)]"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      required
                      className="w-full rounded-[16px] border border-[rgba(255,255,255,0.08)] bg-[rgba(10,7,18,0.82)] px-4 py-3 text-[var(--ink)] placeholder:text-[var(--ink-mute)]"
                      placeholder="you@example.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-xs uppercase tracking-[0.22em] text-[var(--ink-mute)]"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={7}
                      required
                      className="w-full rounded-[16px] border border-[rgba(255,255,255,0.08)] bg-[rgba(10,7,18,0.82)] px-4 py-3 text-[var(--ink)] placeholder:text-[var(--ink-mute)]"
                      placeholder="Tell me what you want to build."
                    />
                  </div>

                  <button type="submit" className="terminal-button">
                    <Mail className="h-4 w-4" />
                    Send Message
                  </button>
                </form>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
