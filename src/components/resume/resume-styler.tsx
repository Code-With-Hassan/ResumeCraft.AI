
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
    h1: { fontSize: 30, fontFamily: fontHeadline.style.fontFamily, color: "#000000", lineHeight: 1.2, letterSpacing: -1, paddingTop: 0, paddingBottom: 4 },
    h2: { fontSize: 22, fontFamily: fontHeadline.style.fontFamily, color: "#000000", lineHeight: 1.2, letterSpacing: -0.5, paddingTop: 0, paddingBottom: 4 },
    h3: { fontSize: 18, fontFamily: fontHeadline.style.fontFamily, color: "#000000", lineHeight: 1.3, letterSpacing: 0, paddingTop: 0, paddingBottom: 2 },
    p: { fontSize: 11, fontFamily: fontBody.style.fontFamily, color: "#333333", lineHeight: 1.5, letterSpacing: 0, paddingTop: 0, paddingBottom: 2 },
    li: { fontSize: 11, fontFamily: fontBody.style.fontFamily, color: "#333333", lineHeight: 1.5, letterSpacing: 0, paddingTop: 0, paddingBottom: 1 },
};

export default function ResumeStyler({ resumeStyles, setResumeData }: ResumeStylerProps) {

  const safeResumeStyles = resumeStyles || defaultStyles;

  const handleStyleChange = (
    element: keyof ResumeStyles,
    property: keyof ResumeStyles[keyof ResumeStyles],
    value: string | number
  ) => {
    const parsedValue = parseFloat(value as string);
    const finalValue = (property !== 'fontFamily' && property !== 'color' && isNaN(parsedValue)) ? 0 : value;

    setResumeData(prev => ({
      ...prev,
      styles: {
        ...safeResumeStyles,
        [element]: {
          ...safeResumeStyles[element],
          [property]: finalValue
        }
      }
    }));
  };
  
  const StyleEditor = ({ element, title }: { element: keyof ResumeStyles, title: string }) => {
    const styles = safeResumeStyles[element];
    if (!styles) return null;

    return (
      <div className="space-y-4 p-4 border border-border rounded-lg bg-background/50">
        <h4 className="font-semibold text-lg">{title}</h4>
        <div className="space-y-2">
          <Label>Font Size</Label>
           <div className="flex items-center gap-4">
            <Slider
              value={[styles.fontSize]}
              onValueChange={([val]) => handleStyleChange(element, 'fontSize', val)}
              min={8}
              max={48}
              step={1}
            />
             <Input
                type="number"
                value={styles.fontSize}
                onChange={(e) => handleStyleChange(element, 'fontSize', e.target.value)}
                className="w-20"
              />
          </div>
        </div>
         <div className="space-y-2">
          <Label>Font Family</Label>
          <Select
            value={styles.fontFamily}
            onValueChange={(val) => handleStyleChange(element, 'fontFamily', val)}
          >
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent position="popper">
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
        <div className="space-y-2">
          <Label>Line Height</Label>
           <div className="flex items-center gap-4">
            <Slider
              value={[styles.lineHeight]}
              onValueChange={([val]) => handleStyleChange(element, 'lineHeight', val)}
              min={0.8}
              max={2.5}
              step={0.1}
            />
             <Input
                type="number"
                value={styles.lineHeight}
                onChange={(e) => handleStyleChange(element, 'lineHeight', e.target.value)}
                step={0.1}
                className="w-20"
              />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Letter Spacing (px)</Label>
           <div className="flex items-center gap-4">
            <Slider
              value={[styles.letterSpacing]}
              onValueChange={([val]) => handleStyleChange(element, 'letterSpacing', val)}
              min={-2}
              max={5}
              step={0.1}
            />
             <Input
                type="number"
                value={styles.letterSpacing}
                onChange={(e) => handleStyleChange(element, 'letterSpacing', e.target.value)}
                step={0.1}
                className="w-20"
              />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Padding Top (px)</Label>
           <div className="flex items-center gap-4">
            <Slider
              value={[styles.paddingTop]}
              onValueChange={([val]) => handleStyleChange(element, 'paddingTop', val)}
              min={0}
              max={48}
              step={1}
            />
             <Input
                type="number"
                value={styles.paddingTop}
                onChange={(e) => handleStyleChange(element, 'paddingTop', e.target.value)}
                className="w-20"
              />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Padding Bottom (px)</Label>
           <div className="flex items-center gap-4">
            <Slider
              value={[styles.paddingBottom]}
              onValueChange={([val]) => handleStyleChange(element, 'paddingBottom', val)}
              min={0}
              max={48}
              step={1}
            />
             <Input
                type="number"
                value={styles.paddingBottom}
                onChange={(e) => handleStyleChange(element, 'paddingBottom', e.target.value)}
                className="w-20"
              />
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card className="shadow-lg bg-card h-full">
      <CardHeader>
        <CardTitle className="text-xl">Style Your Resume</CardTitle>
        <CardDescription>
          Customize fonts and colors for your resume elements.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <StyleEditor element="h1" title="Main Title (H1)" />
        <StyleEditor element="h2" title="Section Titles (H2)" />
        <StyleEditor element="h3" title="Job/Degree Titles (H3)" />
        <StyleEditor element="p" title="Paragraphs (p)" />
        <StyleEditor element="li" title="List Items (li)" />
      </CardContent>
    </Card>
  );
}
