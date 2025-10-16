
"use client";

import { cn } from "@/lib/utils";

interface MarkdownRendererProps {
  content: string;
  templateId: string;
  className?: string;
}

export default function MarkdownRenderer({ content, templateId, className }: MarkdownRendererProps) {
  return (
    <div className={cn("prose prose-sm max-w-none text-black", className)}>
      {content.split('\n').map((line, index) => {
        if (line.trim() === '') return null;
        
        const isCentered = line.startsWith('-> ');
        const content = isCentered ? line.substring(3) : line;
        const centerClass = isCentered ? 'text-center' : '';

        if (content.startsWith('### ')) return <h3 key={index} className={cn("text-lg font-semibold mb-1 mt-3 text-black", centerClass)} dangerouslySetInnerHTML={{ __html: content.substring(4).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>') }} />;
        if (content.startsWith('## ')) return <h2 key={index} className={cn("text-xl font-bold border-b pb-2 mb-2 mt-4 text-black", centerClass)} dangerouslySetInnerHTML={{ __html: content.substring(3).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>') }} />;
        if (content.startsWith('# ')) return <h1 key={index} className={cn("text-3xl font-bold mb-2 text-black", centerClass)} dangerouslySetInnerHTML={{ __html: content.substring(2).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>') }} />;
        if (content.startsWith('> ')) return <blockquote key={index} className={cn("border-l-4 border-primary pl-4 text-gray-600 italic my-2", centerClass)}>{content.substring(2)}</blockquote>;
        if (content.startsWith('---')) return <hr key={index} className="my-4" />;
        if (content.startsWith('- ')) return <li key={index} className={cn("ml-4", centerClass)} dangerouslySetInnerHTML={{ __html: content.substring(2).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>') }} />;
        
        const formattedLine = content
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/\*(.*?)\*/g, '<em>$1</em>');
        
        return <p key={index} className={cn("text-black my-0", centerClass)} dangerouslySetInnerHTML={{ __html: formattedLine }} />;
      })}
    </div>
  );
};
