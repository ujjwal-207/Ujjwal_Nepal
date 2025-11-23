import styled from "styled-components";

import { motion } from "framer-motion";
import { ReactElement } from "react";
import Card from "./ui/ExpandableCard";

interface CardData {
  title: string;
  author: string;
  imgSrc: string;
  cardDescription:string;
  github:string
}

export default function MainSection() {
  const cardData: ReactElement[] = [
    {
      title: "Practise Question",
      author: "AI, NEXTJS, WEBDEV",
      imgSrc:
        "data/Practise.png",
        cardDescription:"This is the superAi⚙️ Tool which will give all the sets of practise question with its solution, if you just enter the topic name or any subtopic which you want to understand clearly and ace the exam.You have the option to choose like if you are new to the topic,you are intermediate in the topic and you want to be pro.Or you want to try some new difficult question which will make your understanding more stronger.This is simple Nextjs program you can just run it in your local device",
        github:"https://github.com/ujjwal-207/practice-question.git"
    },
    {
      title: "Kura_Kani",
      author: "MERN_STACK, getStream",
      imgSrc:
        "data/Kurakani.png",
        cardDescription:"Kura Kani (which means Chat and Talk in Nepali) is a platform designed to bring people together through conversations. Whether it's for social interaction, professional networking, or community building, Kura Kani provides the tools to make communication seamless and enjoyable. 💬✨",
        github:"https://github.com/ujjwal-207/Kura_kani"
    },
    {
      title: "Group_Diary",
      author: "LiveDocs, Nextjs",
      imgSrc:
        "data/Diary.png",
        cardDescription:"Group Diary is a collaborative diary application built using Next.js and LiveDocs. It allows users to create or join groups and share diary entries in a private environment, making it ideal for families, friends, or project teams.",
        github:"https://github.com/ujjwal-207/Group-Diary"
    },
    {
      title: "KAPADA",
      author: "MERNSTACK",
      imgSrc:
        "data/Kapada.png",
        cardDescription:"Ecommerce-Site with Functionality like Cart, UserAuthentication, AdminPannel, ResponsiveDesign",
        github:"https://github.com/ujjwal-207/KAPADA"
    },
    {
      title : "VBlog",
      author : "Postgresql,Prisma,NextJs,Express",
      imgSrc :
        "data/VBlog.png",
        cardDescription : "VBlog is a full-stack Blog Application. The project includes a Next.js (App Router) + TypeScript frontend and a Node.js + Express + Prisma + PostgreSQL backend.It features JWT authentication, protected routes, and complete CRUD operations for blog posts",
          github : "https://github.com/ujjwal-207/VBlogApp",  
    }
  ].map((cardObj: CardData, index: number) => {
    return (
      <Card
        key={`card-${index}`}
        title={cardObj.title}
        author={cardObj.author}
        imgSrc={cardObj.imgSrc}
        cardDescription={cardObj.cardDescription}
        github={cardObj.github}
      />
    );
  });

  return (
    <MainContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        delay: 1,
      }}
    >
      {cardData}
    </MainContainer>
  );
}

const MainContainer = styled(motion.main)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 3rem;
  margin: 2rem 0;

  @media screen and (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;
