import { useEffect, useRef } from "react";

interface CardContent {
  title: string;
  description: string;
  icon: string;
  colorCard: string;
  black_icon: string;
}

interface CardProps {
  content: CardContent;
  index: number;
  quantity: number;
  translateZ: number;
}

const Card: React.FC<CardProps> = ({
  content,
  index,
  quantity,
  translateZ,
}) => {
  return (
    <div
      className="absolute inset-0 rounded-xl border-2 overflow-hidden  p-4 flex flex-col items-center justify-center"
      style={{
        borderColor: `rgba(${content.colorCard})`,
        transform: `rotateY(${
          (360 / quantity) * index
        }deg) translateZ(${translateZ}px)`,
      }}
    >
      <div className="text-4xl mb-2">{content.icon}</div>
      <h3 className="text-lg font-bold mb-2">{content.title}</h3>
      <p className="text-sm text-center">{content.description}</p>
    </div>
  );
};

const RotatingCards = () => {
  const w = 100;
  const h = 250;
  const translateZ = w + h;
  const rotateX = -15;
  const perspective = 1000;

  const cardContents: CardContent[] = [
    {
      title: "React",
      description: "Building modern UI with React and its ecosystem",
      icon: "⚛️",
      colorCard: "142, 249, 252",
      black_icon: "⚛",
    },
    {
      title: "Node.js",
      description: "Server-side JavaScript development",
      icon: "🟢",
      colorCard: "142, 252, 204",
      black_icon: "⚫",
    },
    {
      title: "TypeScript",
      description: "Type-safe JavaScript development",
      icon: "📘",
      colorCard: "142, 252, 157",
      black_icon: "⚛",
    },
    {
      title: "MongoDB",
      description: "NoSQL database management",
      icon: "🍃",
      colorCard: "215, 252, 142",
      black_icon: "⚛",
    },
    {
      title: "Next.js",
      description: "Full-stack React framework",
      icon: "▲",
      colorCard: "252, 252, 142",
      black_icon: "⚛",
    },
    {
      title: "Docker",
      description: "Containerization and deployment",
      icon: "🐳",
      colorCard: "252, 208, 142",
      black_icon: "⚛",
    },
    {
      title: "Python",
      description: "Cloud infrastructure and services",
      icon: "🐍",
      colorCard: "252, 142, 142",
      black_icon: "⚛",
    },
    {
      title: "TailwindCSS",
      description: "Utility-first CSS framework",
      icon: "🎨",
      colorCard: "252, 142, 239",
      black_icon: "⚛",
    },
    {
      title: "Git",
      description: "Version control and collaboration",
      icon: "📦",
      colorCard: "204, 142, 252",
      black_icon: "⚛",
    },
    {
      title: "Testing",
      description: "Jest, React Testing Library",
      icon: "🧪",
      colorCard: "142, 202, 252",
      black_icon: "⚛",
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
  }, []);

  return (
    <div className="w-full h-full relative text-center flex items-center justify-center overflow-hidden">
      <div
        ref={innerRef}
        className="absolute w-[200px] h-[250px] top-1/4 left-[calc(50%-100px-2.5px)] z-[2] preserve-3d"
        style={{
          transformStyle: "preserve-3d",
          transform: `perspective(${perspective}px)`,
        }}
      >
        {cardContents.map((content, index) => (
          <Card
            key={index}
            content={content}
            index={index}
            quantity={quantity}
            translateZ={translateZ}
          />
        ))}
      </div>
    </div>
  );
};

export default RotatingCards;
