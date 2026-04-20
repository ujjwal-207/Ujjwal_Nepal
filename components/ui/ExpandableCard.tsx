"use client";

import { motion } from "framer-motion";
import { Fragment, useRef, useState } from "react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import Image from "next/image";

interface CardProps {
  title: string;
  author: string;
  imgSrc: string;
  cardDescription: string;
  github: string;
}

interface CardDimensions {
  width: number;
  height: number;
}

export default function Card({
  title,
  author,
  imgSrc,
  cardDescription,
  github,
}: CardProps) {
  const [isCardOpened, setIsCardOpened] = useState(false);
  const [cardDimensions, setCardDimensions] = useState<CardDimensions>({
    width: 0,
    height: 0,
  });
  const [imageLoaded, setImageLoaded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const tags = author.split("/").map((item) => item.trim());

  return (
    <Fragment>
      <motion.article
        ref={cardRef}
        layout
        onClick={() => {
          setIsCardOpened(true);
          if (cardRef.current) {
            setCardDimensions({
              width: cardRef.current.clientWidth,
              height: cardRef.current.clientHeight,
            });
          }
        }}
        className={`velvet-panel cursor-pointer overflow-hidden rounded-[32px] ${
          isCardOpened
            ? "fixed inset-0 z-20 m-auto h-[min(82vh,760px)] w-[min(720px,94vw)] overflow-y-auto"
            : "transition duration-300 hover:-translate-y-1 hover:border-[rgba(232,201,122,0.35)]"
        }`}
      >
        <div className="relative aspect-[4/3] bg-[rgba(8,6,18,0.8)]">
          {!imageLoaded && (
            <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-[rgba(40,30,76,0.75)] via-[rgba(91,68,162,0.55)] to-[rgba(40,30,76,0.75)]" />
          )}
          <Image
            src={imgSrc}
            alt={`${title} project screenshot`}
            className={`h-full w-full object-cover transition duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            width={900}
            height={675}
            sizes="(max-width: 1024px) 100vw, 50vw"
            quality={90}
            onLoadingComplete={() => setImageLoaded(true)}
          />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[rgba(12,10,24,0.92)] to-transparent" />
        </div>

        <div className="p-6 md:p-7">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2
                className="text-3xl uppercase tracking-[0.12em] text-[#fff6d5]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {title}
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="tag-pill"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <Link
              href={github}
              target="_blank"
              onClick={(event) => event.stopPropagation()}
              className="inline-flex items-center gap-2 rounded-full border border-[rgba(196,181,253,0.2)] px-4 py-2 text-sm uppercase tracking-[0.14em] text-[#ede0ff]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              <FaGithub className="h-4 w-4" />
              GitHub
            </Link>
          </div>

          <motion.p
            layout="position"
            className={`mt-5 leading-7 text-[#b7a6d3] ${
              isCardOpened ? "text-lg" : "line-clamp-3 text-base"
            }`}
            style={{ fontFamily: "var(--font-body)" }}
          >
            {cardDescription}
          </motion.p>

          <div
            className="mt-6 text-xs uppercase tracking-[0.22em] text-[#7a6899]"
            style={{ fontFamily: "var(--font-terminal)" }}
          >
            {isCardOpened ? "click outside to close" : "click to expand"}
          </div>
        </div>
      </motion.article>

      {isCardOpened && (
        <Fragment>
          <div
            style={{
              width: cardDimensions.width,
              height: cardDimensions.height,
            }}
          />
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setIsCardOpened(false)}
            className="fixed inset-0 z-10 bg-[rgba(6,4,15,0.8)] backdrop-blur-[6px]"
            aria-label="Close project details"
          />
        </Fragment>
      )}
    </Fragment>
  );
}
