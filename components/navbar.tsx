"use client";

import Link from "next/link";
import { Command, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface NavbarProps {
  onItemClick?: () => void;
  onOpenSearch?: () => void;
}

const navItems = [
  { label: "Home", path: "/" },
  { label: "Projects", path: "/projects" },
  { label: "Experience", path: "/#experience" },
  { label: "Skills", path: "/#skills" },
  { label: "Blogs", path: "/blogs" },
  { label: "Contact", path: "/contact" },
  { label: "Treat Me To Momo ☕", path: "https://buymemomo.com/ujjwalnepal" },
];

const Navbar = ({ onItemClick, onOpenSearch }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 px-4 py-4 backdrop-blur-md">
      <div className="terminal-frame mx-auto max-w-7xl rounded-full px-5 py-3">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="shrink-0">
            <span
              className="text-sm tracking-[0.08em] text-[var(--yellow)] sm:text-base md:text-xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              ujjwal-nepal.com.np
            </span>
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => {
              const isActive =
                item.path === "/"
                  ? pathname === "/"
                  : item.path.startsWith("http")
                    ? false
                    : item.path.startsWith("/#")
                      ? pathname === "/"
                      : pathname.startsWith(item.path);

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  prefetch={!item.path.startsWith("http")}
                  rel={item.path.startsWith("http") ? "noreferrer" : undefined}
                  target={item.path.startsWith("http") ? "_blank" : undefined}
                  onClick={onItemClick}
                  className={`text-xs uppercase tracking-[0.22em] transition-colors ${
                    isActive ? "text-[var(--ink)]" : "text-[var(--ink-dim)] hover:text-[var(--cyan)]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            {onOpenSearch && (
              <button
                type="button"
                onClick={onOpenSearch}
                className="hidden items-center gap-2 rounded-full border border-[rgba(122,223,245,0.16)] bg-[rgba(20,16,32,0.86)] px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-[var(--ink)] md:inline-flex"
              >
                <Command className="h-4 w-4 text-[var(--cyan)]" />
                Search
                <span className="rounded border border-[rgba(255,255,255,0.08)] px-2 py-0.5 text-[10px] text-[var(--ink-dim)]">
                  Ctrl+K
                </span>
              </button>
            )}

            <button
              type="button"
              className="inline-flex rounded-full border border-[rgba(255,255,255,0.08)] p-2 text-[var(--ink)] md:hidden"
              onClick={() => setIsMenuOpen((value) => !value)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="terminal-frame mx-auto mt-3 max-w-7xl rounded-[22px] p-4 md:hidden">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => {
              const isActive =
                item.path === "/"
                  ? pathname === "/"
                  : item.path.startsWith("http")
                    ? false
                    : pathname.startsWith(item.path);

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  prefetch={!item.path.startsWith("http")}
                  rel={item.path.startsWith("http") ? "noreferrer" : undefined}
                  target={item.path.startsWith("http") ? "_blank" : undefined}
                  className={`text-sm uppercase tracking-[0.18em] ${
                    isActive ? "text-[var(--yellow)]" : "text-[var(--ink-dim)]"
                  }`}
                  onClick={() => {
                    onItemClick?.();
                    setIsMenuOpen(false);
                  }}
                >
                  {item.label}
                </Link>
              );
            })}

            {onOpenSearch && (
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-[rgba(122,223,245,0.16)] px-4 py-3 text-left text-xs uppercase tracking-[0.18em] text-[var(--ink)]"
                onClick={() => {
                  onOpenSearch();
                  setIsMenuOpen(false);
                }}
              >
                <Command className="h-4 w-4 text-[var(--cyan)]" />
                Open Search
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
