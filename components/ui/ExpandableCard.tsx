"use client"
import styled, { css } from "styled-components";
import { motion } from "framer-motion";
import { Fragment, useRef, useState } from "react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

interface CardProps {
  title: string;
  author: string;
  imgSrc: string;
  cardDescription:string;
  github:string;
}

interface CardDimensions {
  width: number;
  height: number;
}

export default function Card({ title, author, imgSrc,cardDescription,github }: CardProps) {
  const [isCardOpened, setIsCardOpened] = useState(false);
  const [cardDimensions, setCardDimensions] = useState<CardDimensions>({ width: 0, height: 0 });
  const card = useRef<HTMLDivElement>(null);
  
  return (
    <Fragment>
      <CardLink
        ref={card}
        isCardOpened={isCardOpened}
        layout
        onClick={() => {
          setIsCardOpened(true);
          if (!isCardOpened && card.current) {
            setCardDimensions({
              width: card.current.clientWidth,
              height: card.current.clientHeight
            });
          }
        }}
      >
        <CardImage src={imgSrc} />
        <CardHeader isCardOpened={isCardOpened} layout="position">
          {title} 
        </CardHeader>
        <CardSubtitle isCardOpened={isCardOpened} layout="position">
          {author} <br/>
          <Link href={github} className="inline-flex items-center"><span><FaGithub/></span><span>Ujjwal Nepal</span></Link>
        </CardSubtitle>

        {isCardOpened && (
          <CardDescription initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {cardDescription}
            
          </CardDescription>
          
        )}
      </CardLink>
      {isCardOpened && (
        <Fragment>
          <div
            style={{
              width: cardDimensions.width,
              height: cardDimensions.height
            }}
          ></div>
          <CardBackground
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setIsCardOpened(false)}
          />
        </Fragment>
      )}
    </Fragment>
  );
}

interface StyledCardProps {
  isCardOpened?: boolean;
}

const CardLink = styled(motion.div)<StyledCardProps>`
  height: 100%;
  width: 100%;
  ${(props) =>
    props.isCardOpened &&
    css`
      width: min(40rem, 95%);
      height: calc(100% - 10rem);
      overflow-y: auto;
      overflow-x: hidden;
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      margin: auto;
      z-index: 10;
      display: flex;
      justify-content: flex-start;
      flex-direction: column;
    `}
`;

const CardHeader = styled(motion.h2)<StyledCardProps>`
  margin: 0.5rem 0;
  font-size: 2em;
  font-weight: 700;
  color: ${(props) => (props.isCardOpened ? "#ffffff" : props.theme.primary)};
`;

const CardSubtitle = styled(motion.p)<StyledCardProps>`
  font-weight: 700;
  font-size: 1em;
  margin: 0 0 1rem;
  color: ${(props) => (props.isCardOpened ? "#afafaf" : props.theme.subtitle)};
`;

const CardDescription = styled(motion.p)`
  font-weight: 100;
  font-size: 1.5em;
  color: #ffffff;
`;

const CardImage = styled(motion.img)`
  width: 100%;
  height: auto;
`;

const CardBackground = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  position: fixed;
  z-index: 9;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(10, 10, 10, 0.7);
`;


