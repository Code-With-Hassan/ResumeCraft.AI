"use client";

import { cn } from "@/lib/utils";

interface MarkdownRendererProps {
  content: string;
  templateId: string;
}

export default function MarkdownRenderer({ content, templateId }: MarkdownRendererProps) {
  return (
    <div className={cn("prose prose-sm dark:prose-invert max-w-none", templateId === "bold-accent" && "prose-headings:text-primary")}>
      {content.split('\n').map((line, index) => {
        if (line.trim() === '') return null;
        if (line.startsWith('### ')) return <h3 key={index} className="text-lg font-semibold mb-1 mt-3">{line.substring(4).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>')}</h3>;
        if (line.startsWith('## ')) return <h2 key={index} className="text-xl font-bold border-b pb-2 mb-2 mt-4">{line.substring(3)}</h2>;
        if (line.startsWith('# ')) return <h1 key={index} className="text-3xl font-bold mb-2" dangerouslySetInnerHTML={{ __html: line.substring(2).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />;
        if (line.startsWith('> ')) return <blockquote key={index} className="border-l-4 border-primary pl-4 text-muted-foreground italic my-2">{line.substring(2)}</blockquote>;
        if (line.startsWith('---')) return <hr key={index} className="my-4" />;
        if (line.startsWith('- ')) return <li key={index} className="ml-4" dangerouslySetInnerHTML={{ __html: line.substring(2).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>') }} />;
        
        const formattedLine = line
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/\*(.*?)\*/g, '<em>$1</em>');
        
        return <p key={index} dangerouslySetInnerHTML={{ __html: formattedLine }} />;
      })}
    </div>
  );
};
