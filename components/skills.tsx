"use client";
import React from "react";
import RotatingCards from "./ui/rotatingCards";

const SkillsSection = () => {
  return (
    <section className="py-16 px-4 ">
      
        <h2 className="text-3xl font-bold mb-8">Skills</h2>
        <div className="grid md:grid-cols-1 gap-8">
          <div className="h-[600px] relative">
            <RotatingCards />
          </div>
        </div>
      
    </section>
  );
};

export default SkillsSection;
