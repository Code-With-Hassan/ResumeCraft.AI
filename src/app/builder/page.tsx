
"use client";

import { useState } from "react";
import type { ResumeData, Template } from "@/lib/types";
import { templates } from "@/lib/templates";
import ResumeForm from "@/components/resume/resume-form";
import ResumePreview from "@/components/resume/resume-preview";
import TemplateSelector from "@/components/resume/template-selector";
import AdPlaceholder from "@/components/ad-placeholder";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PenSquare, LayoutTemplate, Send } from "lucide-react";

const initialResumeData: ResumeData = {
  personal: {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    phone: "123-456-7890",
    website: "janedoe.io",
  },
  education: [
    {
      institution: "Global University",
      degree: "M.S. in Data Science",
      startDate: "Sep 2020",
      endDate: "Jun 2022",
      details: "Thesis on predictive modeling for e-commerce.",
    },
     {
      institution: "State College",
      degree: "B.S. in Computer Science",
      startDate: "Aug 2016",
      endDate: "May 2020",
      details: "Graduated with Magna Cum Laude honors.",
    },
  ],
  experience: [
    {
      company: "Innovate Inc.",
      title: "Senior Software Engineer",
      startDate: "Jul 2022",
      endDate: "Present",
      description: "Led a team of developers in creating a scalable microservices architecture. Improved application performance by 30% through code optimization and database tuning.",
    },
    {
      company: "DataDriven LLC",
      title: "Junior Developer",
      startDate: "Jun 2020",
      endDate: "Jun 2022",
      description: "Developed features for a customer relationship management (CRM) platform using Angular and .NET Core. Wrote and maintained unit tests to ensure code quality.",
    },
  ],
  skills: "TypeScript, React, Node.js, Python, PostgreSQL, AWS, Docker, Kubernetes",
};

export default function BuilderPage() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [selectedTemplate, setSelectedTemplate] = useState<Template>(templates[0]);
  const [adsWatched, setAdsWatched] = useState(0);

  const handleWatchAd = () => {
    if (adsWatched < 3) {
      setAdsWatched(prev => prev + 1);
    }
  };
  
  return (
    <>
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-primary">Craft Your Future with AI</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Input your details, choose a template, and let our AI enhance your resume to perfection.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5">
            <Tabs defaultValue="edit" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="edit"><PenSquare className="mr-2 h-4 w-4"/> Edit</TabsTrigger>
                <TabsTrigger value="template"><LayoutTemplate className="mr-2 h-4 w-4"/> Template</TabsTrigger>
                <TabsTrigger value="export"><Send className="mr-2 h-4 w-4"/> Export</TabsTrigger>
              </TabsList>
              <TabsContent value="edit">
                <ResumeForm resumeData={resumeData} setResumeData={setResumeData} />
              </TabsContent>
              <TabsContent value="template">
                <TemplateSelector
                  templates={templates}
                  selectedTemplate={selectedTemplate}
                  onSelect={setSelectedTemplate}
                />
              </TabsContent>
              <TabsContent value="export">
                <AdPlaceholder adsWatched={adsWatched} onWatchAd={handleWatchAd} />
              </TabsContent>
            </Tabs>
        </div>
        <div className="lg:col-span-7 lg:sticky top-8">
          <ResumePreview resumeData={resumeData} template={selectedTemplate} adsWatched={adsWatched} />
        </div>
      </div>
    </>
  );
}
