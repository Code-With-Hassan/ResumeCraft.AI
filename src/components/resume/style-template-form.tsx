
"use client";

import type { Dispatch, SetStateAction } from "react";
import type { ResumeData, Template } from "@/lib/types";
import TemplateSelector from "@/components/resume/template-selector";
import ResumeStyler from "@/components/resume/resume-styler";
import MarkdownRenderer from "./markdown-renderer";
import { useMemo } from "react";
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
    summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.",
    experience: [
        {
            company: "Innovate Corp",
            title: "Senior Product Manager",
            startDate: "Jan 2022",
            endDate: "Present",
            description: "Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
        {
            company: "Tech Solutions",
            title: "Software Developer",
            startDate: "Jun 2019",
            endDate: "Dec 2021",
            description: "Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi. Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit.",
        },
    ],
    education: [
        {
            institution: "University of Technology",
            degree: "Master of Science",
            startDate: "2017",
            endDate: "2019",
            details: "Focused on human-computer interaction and data visualization. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
        },
    ],
    skills: "React, TypeScript, Node.js, Project Management, Agile Methodologies, UI/UX Design",
    styles: { // This will be overwritten by real styles
      h1: { fontSize: 30, fontFamily: "var(--font-headline)", color: "#000000" },
      h2: { fontSize: 22, fontFamily: "var(--font-headline)", color: "#000000" },
      h3: { fontSize: 18, fontFamily: "var(--font-headline)", color: "#000000" },
      p: { fontSize: 11, fontFamily: "var(--font-body)", color: "#333333" },
    }
};

export default function StyleTemplateForm({
  resumeData,
  setResumeData,
  templates,
  selectedTemplate,
  onSelectTemplate,
}: StyleTemplateFormProps) {
  
  const finalMarkdown = useMemo(() => {
    // We use the dummy data but apply the REAL styles from the user's resumeData
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
         <Card className="shadow-lg h-full bg-card">
            <CardContent className="bg-muted/30 rounded-b-lg p-4 md:p-8 shadow-inner overflow-y-auto">
                <div className="bg-white p-8 rounded-md shadow-md mx-auto" style={{width: '210mm', minHeight: '297mm', transform: 'scale(0.8)', transformOrigin: 'top center'}}>
                    <MarkdownRenderer 
                    content={finalMarkdown} 
                    templateId={selectedTemplate.id} 
                    className={selectedTemplate.style} 
                    styles={resumeData.styles}
                    />
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
