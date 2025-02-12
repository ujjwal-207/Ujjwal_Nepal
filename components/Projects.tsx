"use client";

import { Card, CardContent } from "./ui/card";
import { projects } from "@/public/data";

import Image from "next/image";
import Animationcard from "./ui/animationcard";
import Radiobutton from "./ui/radioButton";

export const Projects = () => {
  //   const [activeFilter, setActiveFilter] = useState("all");
  return (
    <section className="py-16 px-4 ">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8">Featured Projects</h2>
        <div className="flex gap-4 mb-8">
          <Radiobutton />
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <Card key={project.title} className="overflow-hidden group">
              <Image
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                width={10}
                height={10}
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
          {/* TO do 1. option to give start for the project
          2. to show the rating given by users
          3 add the reviews 
          4. other can see the rating and reviews of the other */}
        </div>
      </div>
    </section>
  );
};
