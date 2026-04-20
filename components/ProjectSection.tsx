"use client";

import Card from "./ui/ExpandableCard";

interface CardData {
  title: string;
  author: string;
  imgSrc: string;
  cardDescription: string;
  github: string;
}

const cardData: CardData[] = [
  {
    title: "Practise Question",
    author: "AI / Next.js / Web App",
    imgSrc: "/data/Practise.png",
    cardDescription:
      "This is a study-focused AI tool that generates practice questions with solutions from a given topic. It is designed to help users revise quickly, choose a difficulty level, and strengthen understanding through targeted question generation.",
    github: "https://github.com/ujjwal-207/practice-question.git",
  },
  {
    title: "Kura_Kani",
    author: "MERN / getStream / Realtime",
    imgSrc: "/data/Kurakani.png",
    cardDescription:
      "Kura Kani is a real-time communication platform built to make conversations feel natural and reliable. It supports video calling and collaborative interaction with a social, community-oriented tone.",
    github: "https://github.com/ujjwal-207/Kura_kani",
  },
  {
    title: "Group_Diary",
    author: "Next.js / LiveDocs / Collaboration",
    imgSrc: "/data/Diary.png",
    cardDescription:
      "Group Diary is a collaborative diary application where users can create or join groups and share entries in a private environment. It is built for families, friends, or project teams that want a shared writing space.",
    github: "https://github.com/ujjwal-207/Group-Diary",
  },
  {
    title: "KAPADA",
    author: "MERN / Ecommerce / Admin",
    imgSrc: "/data/Kapada.png",
    cardDescription:
      "KAPADA is an ecommerce application with core shopping workflows including cart handling, user authentication, admin controls, and responsive storefront design.",
    github: "https://github.com/ujjwal-207/KAPADA",
  },
  {
    title: "VBlog",
    author: "PostgreSQL / Prisma / Next.js / Express",
    imgSrc: "/data/VBlog.png",
    cardDescription:
      "VBlog is a full-stack blogging platform with a TypeScript Next.js frontend and a Node.js, Express, Prisma, and PostgreSQL backend. It includes JWT authentication, protected routes, and full CRUD operations for posts.",
    github: "https://github.com/ujjwal-207/VBlogApp",
  },
];

export default function MainSection() {
  return (
    <div className="mt-10 grid gap-8 lg:grid-cols-2">
      {cardData.map((card, index) => (
        <Card
          key={`${card.title}-${index}`}
          title={card.title}
          author={card.author}
          imgSrc={card.imgSrc}
          cardDescription={card.cardDescription}
          github={card.github}
        />
      ))}
    </div>
  );
}
