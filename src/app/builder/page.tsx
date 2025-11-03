
"use client";

import { useState, useEffect } from "react";
import type { ResumeData, Template } from "@/lib/types";
import { templates } from "@/lib/templates";
import ResumeForm from "@/components/resume/resume-form";
import ResumePreview from "@/components/resume/resume-preview";
import StyleTemplateForm from "@/components/resume/style-template-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PenSquare, LayoutTemplate, Eye, Palette } from "lucide-react";
import { useUser, useFirestore } from '@/firebase';
import { useToast } from "@/hooks/use-toast";
import { doc, getDoc } from "firebase/firestore";
import { errorEmitter } from "@/firebase/error-emitter";
import { FirestorePermissionError } from "@/firebase/errors";

const initialResumeData: ResumeData = {
  personal: {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    phone: "123-456-7890",
    website: "janedoe.io",
  },
  summary: "A highly motivated and results-oriented professional with a proven track record of success in fast-paced environments. Seeking to leverage my skills and experience to contribute to a dynamic team.",
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
  styles: {
    h1: { fontSize: 30, fontFamily: "var(--font-headline)", color: "#000000", lineHeight: 1.2, letterSpacing: -1, paddingTop: 0, paddingBottom: 4 },
    h2: { fontSize: 22, fontFamily: "var(--font-headline)", color: "#000000", lineHeight: 1.2, letterSpacing: -0.5, paddingTop: 0, paddingBottom: 4 },
    h3: { fontSize: 18, fontFamily: "var(--font-headline)", color: "#000000", lineHeight: 1.3, letterSpacing: 0, paddingTop: 0, paddingBottom: 2 },
    p: { fontSize: 11, fontFamily: "var(--font-body)", color: "#333333", lineHeight: 1.5, letterSpacing: 0, paddingTop: 0, paddingBottom: 2 },
    li: { fontSize: 11, fontFamily: "var(--font-body)", color: "#333333", lineHeight: 1.5, letterSpacing: 0, paddingTop: 0, paddingBottom: 1 },
  }
};

export default function BuilderPage() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [selectedTemplate, setSelectedTemplate] = useState<Template>(templates[0]);
  const [adsWatched, setAdsWatched] = useState(0);
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  
  useEffect(() => {
    // Check for locally saved data first
    const savedDataRaw = localStorage.getItem('resumeData-unsaved');
    if (savedDataRaw) {
      try {
        const savedData = JSON.parse(savedDataRaw);
        setResumeData(savedData);
        localStorage.removeItem('resumeData-unsaved'); // Clear it after loading
        toast({
          title: 'Welcome Back!',
          description: 'Your unsaved work has been restored.',
        });
        // We stop here to not overwrite the restored data with Firestore data
        return;
      } catch (e) {
        console.error("Failed to parse unsaved resume data from localStorage", e);
        localStorage.removeItem('resumeData-unsaved');
      }
    }
    
    const loadResumeFromFirestore = async () => {
      if (user && firestore) {
        const docRef = doc(firestore, "users", user.uid, "resumes", "default_resume");
        getDoc(docRef).then(docSnap => {
            if (docSnap.exists()) {
              // Merge fetched data with initial data to ensure styles are present
              const fetchedData = docSnap.data();
              setResumeData(prev => ({
                ...initialResumeData,
                ...prev,
                ...fetchedData,
                personal: {...initialResumeData.personal, ...prev.personal, ...fetchedData.personal},
                styles: { ...initialResumeData.styles, ...prev.styles, ...fetchedData.styles }
              }));
               toast({ title: 'Data Loaded!', description: 'Your resume data has been loaded from the cloud.' });
            } else {
              console.log("No saved resume found.");
            }
        }).catch(async (serverError) => {
            const permissionError = new FirestorePermissionError({
                path: docRef.path,
                operation: 'get',
            });
            errorEmitter.emit('permission-error', permissionError);
        });
      }
    };

    // Only load from firestore if user is loaded and not during initial auth check
    if (!isUserLoading) {
      loadResumeFromFirestore();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, firestore, isUserLoading]);

  const incrementAdsWatched = () => {
     if (adsWatched < 3) {
      setAdsWatched(prev => prev + 1);
    }
  }

  return (
    <>
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-primary">Craft Your Future with AI</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Follow the steps to input your details, style your resume, and let our AI enhance it to perfection.
        </p>
      </div>
      
      <div className="w-full max-w-5xl mx-auto">
        <Tabs defaultValue="edit" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="edit"><PenSquare className="mr-2 h-4 w-4"/> Edit Content</TabsTrigger>
            <TabsTrigger value="style"><Palette className="mr-2 h-4 w-4"/> Style & Template</TabsTrigger>
            <TabsTrigger value="preview"><Eye className="mr-2 h-4 w-4"/> Preview & Export</TabsTrigger>
          </TabsList>
          
          <TabsContent value="edit">
            <ResumeForm 
              resumeData={resumeData} 
              setResumeData={setResumeData} 
              onWatchAd={incrementAdsWatched}
            />
          </TabsContent>
          
          <TabsContent value="style">
            <StyleTemplateForm
              templates={templates}
              selectedTemplate={selectedTemplate}
              onSelectTemplate={setSelectedTemplate}
              resumeData={resumeData}
              setResumeData={setResumeData}
            />
          </TabsContent>

          <TabsContent value="preview">
            <ResumePreview 
              resumeData={resumeData} 
              template={selectedTemplate} 
              adsWatched={adsWatched} 
              onWatchAd={incrementAdsWatched}
            />
          </TabsContent>

        </Tabs>
      </div>
    </>
  );
}
