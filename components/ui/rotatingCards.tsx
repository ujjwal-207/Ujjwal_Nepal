import { useEffect, useRef } from "react";

interface CardContent {
  title: string;
  description: string;
  icon: string;
  tint: string;
}

const RotatingCards = () => {
  const w = 110;
  const h = 240;
  const translateZ = w + h;
  const rotateX = -12;
  const perspective = 1200;

  const cardContents: CardContent[] = [
    {
      title: "React",
      description: "Stage-ready interfaces and interactive UI systems",
      icon: "⚛️",
      tint: "rgba(196,181,253,0.22)",
    },
    {
      title: "Node.js",
      description: "Backend services, APIs, auth, and realtime features",
      icon: "🟢",
      tint: "rgba(124,88,212,0.24)",
    },
    {
      title: "TypeScript",
      description: "Type-safe engineering with fewer runtime surprises",
      icon: "📘",
      tint: "rgba(232,201,122,0.2)",
    },
    {
      title: "MongoDB",
      description: "Flexible data modeling for collaborative products",
      icon: "🍃",
      tint: "rgba(176,106,179,0.22)",
    },
    {
      title: "Next.js",
      description: "Full-stack web apps with strong performance defaults",
      icon: "▲",
      tint: "rgba(201,150,63,0.22)",
    },
    {
      title: "Docker",
      description: "Portable deployments and clean local parity",
      icon: "🐳",
      tint: "rgba(196,181,253,0.2)",
    },
    {
      title: "Python",
      description: "Utility tooling, scripting, and backend workflows",
      icon: "🐍",
      tint: "rgba(124,88,212,0.22)",
    },
    {
      title: "TailwindCSS",
      description: "Fast visual iteration with precise UI composition",
      icon: "🎨",
      tint: "rgba(176,106,179,0.22)",
    },
    {
      title: "Git",
      description: "Version control and tight collaboration discipline",
      icon: "📦",
      tint: "rgba(232,201,122,0.2)",
    },
    {
      title: "Testing",
      description: "Confidence through practical validation layers",
      icon: "🧪",
      tint: "rgba(196,181,253,0.22)",
    },
  ];

  const quantity = cardContents.length;
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (innerRef.current) {
      const keyframes = `
        @keyframes rotating {
          from {
            transform: perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(0);
          }
          to {
            transform: perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(360deg);
          }
        }
      `;

      const styleSheet = document.createElement("style");
      styleSheet.textContent = keyframes;
      document.head.appendChild(styleSheet);

      innerRef.current.style.animation = "rotating 20s linear infinite";

      return () => {
        document.head.removeChild(styleSheet);
      };
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden text-center">
      <div className="absolute inset-x-10 top-16 h-32 rounded-full bg-[radial-gradient(circle,rgba(232,201,122,0.15),transparent_70%)] blur-3xl" />
      <div
        ref={innerRef}
        className="absolute left-[calc(50%-110px)] top-20 z-[2] h-[240px] w-[220px] preserve-3d"
        style={{
          transformStyle: "preserve-3d",
          transform: `perspective(${perspective}px)`,
        }}
      >
        {cardContents.map((content, index) => (
          <div
            key={index}
            className="absolute inset-0 flex flex-col items-center justify-center rounded-[28px] border p-5 text-center shadow-[0_20px_45px_rgba(0,0,0,0.35)] backdrop-blur-sm"
            style={{
              borderColor: "rgba(196,181,253,0.18)",
              background:
                "linear-gradient(180deg, rgba(26,20,52,0.92), rgba(15,12,29,0.95))",
              boxShadow: `0 22px 45px rgba(0,0,0,0.35), 0 0 0 1px ${content.tint} inset`,
              transform: `rotateY(${(360 / quantity) * index}deg) translateZ(${translateZ}px)`,
            }}
          >
            <div
              className="mb-4 flex h-14 w-14 items-center justify-center rounded-full text-3xl"
              style={{ background: content.tint }}
            >
              {content.icon}
            </div>
            <h3
              className="text-2xl uppercase tracking-[0.16em] text-[#fff6d5]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {content.title}
            </h3>
            <p
              className="mt-3 text-sm leading-6 text-[#b7a6d3]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {content.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RotatingCards;
