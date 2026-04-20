"use client";

import MainSection from "@/components/ProjectSection";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";

export const runtime = "edge";

export default function Projects() {
  return (
    <div className="velvet-shell min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 pb-10 pt-4 md:pt-8">
        <section className="overflow-hidden rounded-[40px] border border-[rgba(124,88,212,0.2)] bg-[radial-gradient(circle_at_top,rgba(196,181,253,0.12),transparent_26%),linear-gradient(180deg,rgba(20,16,42,0.96),rgba(10,8,22,0.98))] p-8 shadow-[0_26px_90px_rgba(0,0,0,0.35)] md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="section-kicker" style={{ fontFamily: "var(--font-body)" }}>
                ▸ Projects
              </p>
              <h1
                className="section-title mt-4 text-[#ede0ff]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Projects
              </h1>
              <p
                className="mt-4 max-w-2xl text-lg leading-8 text-[#b7a6d3]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                A wider look at the products, experiments, and full-stack builds
                behind the portfolio. Open any card for the full breakdown.
              </p>
            </div>
            <div
              className="rounded-full border border-[rgba(232,201,122,0.24)] px-4 py-2 text-sm uppercase tracking-[0.18em] text-[#e8c97a]"
              style={{ fontFamily: "var(--font-terminal)" }}
            >
              selected work
            </div>
          </div>

          <MainSection />
        </section>
      </main>
      <Footer />
    </div>
  );
}
