
"use client";

import type { Dispatch, SetStateAction } from "react";
import type { ResumeData, Template } from "@/lib/types";
import TemplateSelector from "@/components/resume/template-selector";
import ResumeStyler from "@/components/resume/resume-styler";
import MarkdownRenderer from "./markdown-renderer";
import { useMemo, memo } from "react";
import { fillTemplate } from "@/lib/template-utils";
import { Card, CardContent } from "../ui/card";

interface StyleTemplateFormProps {
  resumeData: ResumeData;
  setResumeData: Dispatch<SetStateAction<ResumeData>>;
  templates: Template[];
  selectedTemplate: Template;
  onSelectTemplate: (template: Template) => void;
}

const dummyResumeData: ResumeData = {
    personal: {
        name: "John Doe",
        email: "john.doe@email.com",
        phone: "555-123-4567",
        website: "johndoe.dev",
    },
    summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. ",
    experience: [
        {
            company: "Innovate Corp",
            title: "Senior Product Manager",
            startDate: "Jan 2022",
            endDate: "Present",
            description: "Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus.",
        },
        {
            company: "Tech Solutions",
            title: "Software Developer",
            startDate: "Jun 2019",
            endDate: "Dec 2021",
            description: "Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi. Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque. Quisque porta. ",
        },
    ],
    education: [
        {
            institution: "University of Technology",
            degree: "Master of Science",
            startDate: "2017",
            endDate: "2019",
            details: "Focused on human-computer interaction and data visualization. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. ",
        },
    ],
    skills: "React, TypeScript, Node.js, Project Management, Agile Methodologies, UI/UX Design",
    styles: { // This will be overwritten by real styles
      h1: { fontSize: 30, fontFamily: "var(--font-headline)", color: "#000000", lineHeight: 1.2, letterSpacing: -1, marginBottom: 4 },
      h2: { fontSize: 22, fontFamily: "var(--font-headline)", color: "#000000", lineHeight: 1.2, letterSpacing: -0.5, marginBottom: 4 },
      h3: { fontSize: 18, fontFamily: "var(--font-headline)", color: "#000000", lineHeight: 1.3, letterSpacing: 0, marginBottom: 2 },
      p: { fontSize: 11, fontFamily: "var(--font-body)", color: "#333333", lineHeight: 1.5, letterSpacing: 0, marginBottom: 2 },
    }
};

const MemoizedMarkdownRenderer = memo(MarkdownRenderer);

export default function StyleTemplateForm({
  resumeData,
  setResumeData,
  templates,
  selectedTemplate,
  onSelectTemplate,
}: StyleTemplateFormProps) {
  
  const finalMarkdown = useMemo(() => {
    const dataForPreview: ResumeData = {
        ...dummyResumeData,
        styles: resumeData.styles,
    }
    return fillTemplate(selectedTemplate.markdown, dataForPreview);
  }, [selectedTemplate, resumeData.styles]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      <div className="space-y-8">
        <TemplateSelector
          templates={templates}
          selectedTemplate={selectedTemplate}
          onSelect={onSelectTemplate}
        />
        <ResumeStyler
          resumeStyles={resumeData.styles}
          setResumeData={setResumeData}
        />
      </div>
      <div className="hidden lg:block sticky top-24">
         <Card className="shadow-lg h-full bg-card overflow-hidden">
            <CardContent className="bg-muted/30 rounded-b-lg p-4 md:p-8 shadow-inner overflow-auto h-[calc(100vh-10rem)]">
              {/* This outer container handles the scaling */}
              <div
                className="mx-auto origin-top"
                style={{
                  width: '210mm',
                  height: '297mm',
                  transform: 'scale(0.8)',
                  transformOrigin: 'top center',
                }}
              >
                {/* This inner container has the fixed A4 dimensions for content layout */}
                <div
                    className="bg-white p-8 shadow-md" 
                    style={{width: '210mm', height: '297mm'}}
                >
                    <MemoizedMarkdownRenderer 
                        content={finalMarkdown} 
                        templateId={selectedTemplate.id} 
                        className={selectedTemplate.style} 
                        styles={resumeData.styles}
                    />
                </div>
              </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
