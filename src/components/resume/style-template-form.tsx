
"use client";

import type { Dispatch, SetStateAction } from "react";
import type { ResumeData, Template } from "@/lib/types";
import TemplateSelector from "@/components/resume/template-selector";
import ResumeStyler from "@/components/resume/resume-styler";

interface StyleTemplateFormProps {
  resumeData: ResumeData;
  setResumeData: Dispatch<SetStateAction<ResumeData>>;
  templates: Template[];
  selectedTemplate: Template;
  onSelectTemplate: (template: Template) => void;
}

export default function StyleTemplateForm({
  resumeData,
  setResumeData,
  templates,
  selectedTemplate,
  onSelectTemplate,
}: StyleTemplateFormProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      <div className="lg:col-span-1">
        <TemplateSelector
          templates={templates}
          selectedTemplate={selectedTemplate}
          onSelect={onSelectTemplate}
        />
      </div>
      <div className="lg:col-span-1">
        <ResumeStyler
          resumeStyles={resumeData.styles}
          setResumeData={setResumeData}
        />
      </div>
    </div>
  );
}
