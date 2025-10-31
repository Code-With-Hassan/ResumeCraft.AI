
"use client";

import { cn } from "@/lib/utils";
import type { ResumeStyles } from "@/lib/types";
import React from 'react';
import { fontBody, fontHeadline } from "@/app/fonts";

interface MarkdownRendererProps {
  content: string;
  templateId: string;
  className?: string;
  styles: ResumeStyles;
}

const defaultStyles: ResumeStyles = {
    h1: { fontSize: 30, fontFamily: fontHeadline.style.fontFamily, color: "#000000", lineHeight: 1.2, letterSpacing: -1, paddingTop: 0, paddingBottom: 4 },
    h2: { fontSize: 22, fontFamily: fontHeadline.style.fontFamily, color: "#000000", lineHeight: 1.2, letterSpacing: -0.5, paddingTop: 0, paddingBottom: 4 },
    h3: { fontSize: 18, fontFamily: fontHeadline.style.fontFamily, color: "#000000", lineHeight: 1.3, letterSpacing: 0, paddingTop: 0, paddingBottom: 2 },
    p: { fontSize: 11, fontFamily: fontBody.style.fontFamily, color: "#333333", lineHeight: 1.5, letterSpacing: 0, paddingTop: 0, paddingBottom: 2 },
    li: { fontSize: 11, fontFamily: fontBody.style.fontFamily, color: "#333333", lineHeight: 1.5, letterSpacing: 0, paddingTop: 0, paddingBottom: 1 },
};

export default function MarkdownRenderer({ content, templateId, className, styles }: MarkdownRendererProps) {
  const safeStyles = styles || defaultStyles;

  const getStyle = (tag: 'h1' | 'h2' | 'h3' | 'p' | 'li'): React.CSSProperties => {
    const style = safeStyles[tag];
    return {
      fontFamily: style.fontFamily,
      fontSize: `${style.fontSize}px`,
      color: style.color,
      lineHeight: style.lineHeight,
      letterSpacing: `${style.letterSpacing}px`,
      paddingTop: `${style.paddingTop}px`,
      paddingBottom: `${style.paddingBottom}px`,
    };
  };

  return (
    <div className={cn("prose prose-sm max-w-none", className)}>
      {content.split('\n').map((line, index) => {
        if (line.trim() === '') return null;
        
        const isCentered = line.startsWith('-> ');
        let rawContent = isCentered ? line.substring(3) : line;
        const centerClass = isCentered ? 'text-center' : '';

        const renderContent = (content: string) => (
          <span dangerouslySetInnerHTML={{ __html: content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>') }} />
        );

        if (rawContent.startsWith('### ')) return <h3 key={index} className={cn("my-0",centerClass)} style={getStyle('h3')}>{renderContent(rawContent.substring(4))}</h3>;
        if (rawContent.startsWith('## ')) return <h2 key={index} className={cn("my-0", centerClass)} style={getStyle('h2')}>{renderContent(rawContent.substring(3))}</h2>;
        if (rawContent.startsWith('# ')) return <h1 key={index} className={cn("my-0", centerClass)} style={getStyle('h1')}>{renderContent(rawContent.substring(2))}</h1>;
        if (rawContent.startsWith('> ')) return <blockquote key={index} className={cn("border-l-4 border-primary pl-4 italic my-0")}>{rawContent.substring(2)}</blockquote>;
        if (rawContent.startsWith('---')) return <div key={index} className={cn("bg-gray-300 my-2")} style={{height: '0.1em'}}></div>;
        if (rawContent.startsWith('- ')) return <li key={index} className={cn("ml-4 my-0", centerClass)} style={getStyle('li')}>{renderContent(rawContent.substring(2))}</li>;
        
        return <p key={index} className={cn("my-0", centerClass)} style={getStyle('p')}>{renderContent(rawContent)}</p>;
      })}
    </div>
  );
};
