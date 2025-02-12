"use client";

// import { skills } from "@/public/data";
import React from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import RotatingCard from "./ui/rotatingCard";

export const Skills = () => {
  return (
    <div>
      <RotatingCard />
    </div>
    // <div className="grid grid-cols-2 gap-4">
    //   {skills.map((skillGroup) => (
    //     <Card key={skillGroup.category}>
    //       <CardHeader>
    //         <CardTitle>{skillGroup.category}</CardTitle>
    //       </CardHeader>
    //       <CardContent>
    //         <ul className="list-disc pl-4">
    //           {skillGroup.items.map((skill) => (
    //             <li key={skill}>{skill}</li>
    //           ))}
    //         </ul>
    //       </CardContent>
    //     </Card>
    //   ))}
    // </div>
  );
};
