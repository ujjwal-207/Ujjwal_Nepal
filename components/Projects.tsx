"use client";

import { Card, CardContent } from "./ui/card";
import { projects } from "@/public/data";


import Animationcard from "./ui/animationcard";


export const Projects = () => {
  //   const [activeFilter, setActiveFilter] = useState("all");
  return (
    <section className="py-16 px-4 ">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8">Featured Projects</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <Card key={project.title} className="overflow-hidden group ">
              <video
                src={project.video}
                autoPlay
                loop
                muted
                playsInline
                className="pointer-events-none mx-auto  w-full object-cover object-top" // needed because random black line at bottom of video
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
                <Animationcard />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
