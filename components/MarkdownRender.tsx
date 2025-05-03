import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css";
import { Components } from "react-markdown";
import React from "react";

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const processedContent = content.replace(
    /!\[\]\((.*?)\s+align="(.*?)"\)/g,
    (match, url, align) => {
      return `![${align}](${url})`;
    }
  );

  return (
    <div className="prose dark:prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          p: ParagraphComponent,
          code: CodeComponent,
          img: ImageComponent,
          pre: PreComponent,
        }}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  );
}

type CodeProps = {
  node?: unknown;
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
};

const CodeComponent = ({
  inline,
  className,
  children,
  ...props
}: CodeProps) => {
  if (inline) {
    return (
      <code className="bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    );
  }

  return (
    <code className={className} {...props}>
      {children}
    </code>
  );
};

const PreComponent: Components["pre"] = ({ children, ...props }) => {
  return (
    <pre className="bg-[#282c34] rounded-lg p-4 overflow-x-auto" {...props}>
      {children}
    </pre>
  );
};

const ParagraphComponent: Components["p"] = (props) => {
  const childrenArray = React.Children.toArray(props.children);

  if (childrenArray.length === 1) {
    const firstChild = childrenArray[0];

    if (React.isValidElement(firstChild) && firstChild.type === "img") {
      return <>{firstChild}</>;
    }
  }

  return <p {...props} />;
};

const ImageComponent: Components["img"] = ({ ...props }) => {
  const alignment = props.alt?.match(/(center|left|right)/)?.[0] || "center";

  return (
    <img
      className={`rounded-lg max-w-full h-auto block my-4
        ${alignment === "center" ? "mx-auto" : ""}
        ${alignment === "right" ? "ml-auto" : ""}
        ${alignment === "left" ? "mr-auto" : ""}
      `}
      src={props.src}
      alt={props.alt?.replace(/(center|left|right)/, "")}
    />
  );
};