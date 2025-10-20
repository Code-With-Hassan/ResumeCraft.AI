
"use client";

import type { Dispatch, SetStateAction } from "react";
import type { ResumeData, ResumeStyles } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { fontBody, fontHeadline } from "@/app/fonts";

interface ResumeStylerProps {
  resumeStyles: ResumeStyles;
  setResumeData: Dispatch<SetStateAction<ResumeData>>;
}

const FONT_FAMILIES = [
  { name: 'Headline (Orbitron)', value: fontHeadline.style.fontFamily },
  { name: 'Body (Roboto)', value: fontBody.style.fontFamily },
  { name: 'Arial', value: 'Arial, sans-serif' },
  { name: 'Verdana', value: 'Verdana, sans-serif' },
  { name: 'Georgia', value: 'Georgia, serif' },
  { name: 'Times New Roman', value: "'Times New Roman', serif" },
];

const defaultStyles: ResumeStyles = {
    h1: { fontSize: 30, fontFamily: fontHeadline.style.fontFamily, color: "#000000" },
    h2: { fontSize: 22, fontFamily: fontHeadline.style.fontFamily, color: "#000000" },
    h3: { fontSize: 18, fontFamily: fontHeadline.style.fontFamily, color: "#000000" },
    p: { fontSize: 11, fontFamily: fontBody.style.fontFamily, color: "#333333" },
};

export default function ResumeStyler({ resumeStyles, setResumeData }: ResumeStylerProps) {

  const safeResumeStyles = resumeStyles || defaultStyles;

  const handleStyleChange = (
    element: keyof ResumeStyles,
    property: keyof ResumeStyles[keyof ResumeStyles],
    value: string | number
  ) => {
    setResumeData(prev => ({
      ...prev,
      styles: {
        ...safeResumeStyles,
        [element]: {
          ...safeResumeStyles[element],
          [property]: value
        }
      }
    }));
  };
  
  const StyleEditor = ({ element, title }: { element: keyof ResumeStyles, title: string }) => {
    const styles = safeResumeStyles[element];
    if (!styles) return null; // Should not happen with safeResumeStyles

    return (
      <div className="space-y-4 p-4 border border-border rounded-lg bg-background/50">
        <h4 className="font-semibold text-lg">{title}</h4>
        <div className="space-y-2">
          <Label>Font Size: {styles.fontSize}px</Label>
          <Slider
            value={[styles.fontSize]}
            onValueChange={([val]) => handleStyleChange(element, 'fontSize', val)}
            min={8}
            max={48}
            step={1}
          />
        </div>
        <div className="space-y-2">
          <Label>Font Family</Label>
          <Select
            value={styles.fontFamily}
            onValueChange={(val) => handleStyleChange(element, 'fontFamily', val)}
          >
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {FONT_FAMILIES.map(font => (
                <SelectItem key={font.value} value={font.value} style={{ fontFamily: font.value }}>{font.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Color</Label>
          <div className="flex items-center gap-2">
            <Input
              type="color"
              value={styles.color}
              onChange={(e) => handleStyleChange(element, 'color', e.target.value)}
              className="w-12 h-10 p-1"
            />
             <Input
              type="text"
              value={styles.color}
              onChange={(e) => handleStyleChange(element, 'color', e.target.value)}
              className="w-24"
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card className="shadow-lg bg-card">
      <CardHeader>
        <CardTitle className="text-2xl">Style Your Resume</CardTitle>
        <CardDescription>
          Customize fonts and colors for your resume elements.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <StyleEditor element="h1" title="Main Title (H1)" />
        <StyleEditor element="h2" title="Section Titles (H2)" />
        <StyleEditor element="h3" title="Job/Degree Titles (H3)" />
        <StyleEditor element="p" title="Paragraphs (p)" />
      </CardContent>
    </Card>
  );
}
