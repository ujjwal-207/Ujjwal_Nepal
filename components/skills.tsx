"use client";
import React from "react";
import RotatingCards from "./ui/rotatingCards";

const SkillsSection = () => {
  return (
    <section className=" px-4 ">
      
      <h1 className="text-4xl font-bold mb-4 underline underline-offset-4 decoration-blue-500 mt-9">
            Skills
          </h1>
        <div className="grid md:grid-cols-1 gap-8">
          <div className="h-[600px] relative">
            <RotatingCards />
          </div>
        </div>
      
    </section>
  );
};

export default SkillsSection;
