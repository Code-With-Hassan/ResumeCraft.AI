
"use client";

import type { Dispatch, SetStateAction } from "react";
import type { ResumeData, Experience, Education } from "@/lib/types";
import { useState, useRef } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { User, Briefcase, GraduationCap, Wrench, Sparkles, PlusCircle, Trash2, Loader2, Save, Upload, Video } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { improveResumeContent } from "@/ai/flows/improve-resume-content";
import { useAuth } from "@/lib/auth";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ResumeFormProps {
  resumeData: ResumeData;
  setResumeData: Dispatch<SetStateAction<ResumeData>>;
  onWatchAd: () => void;
}

type ImprovementRequest = {
    type: 'experience' | 'education' | 'skills',
    index?: number
} | null;

export default function ResumeForm({ resumeData, setResumeData, onWatchAd }: ResumeFormProps) {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isImproving, setIsImproving] = useState<string | null>(null);
  const [adDialogOpen, setAdDialogOpen] = useState(false);
  const [currentImprovementRequest, setCurrentImprovementRequest] = useState<ImprovementRequest>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setResumeData(prev => ({ ...prev, personal: { ...prev.personal, [name]: value } }));
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResumeData(prev => ({ ...prev, skills: e.target.value }));
  };

  const handleExperienceChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const newExperience = [...resumeData.experience];
    newExperience[index] = { ...newExperience[index], [name]: value };
    setResumeData(prev => ({ ...prev, experience: newExperience }));
  };

  const addExperience = () => {
    setResumeData(prev => ({ ...prev, experience: [...prev.experience, { company: '', title: '', startDate: '', endDate: '', description: '' }] }));
  };

  const removeExperience = (index: number) => {
    const newExperience = [...resumeData.experience];
    newExperience.splice(index, 1);
    setResumeData(prev => ({ ...prev, experience: newExperience }));
  };

  const handleEducationChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const newEducation = [...resumeData.education];
    newEducation[index] = { ...newEducation[index], [name]: value };
    setResumeData(prev => ({ ...prev, education: newEducation }));
  };

  const addEducation = () => {
    setResumeData(prev => ({ ...prev, education: [...prev.education, { institution: '', degree: '', startDate: '', endDate: '', details: '' }] }));
  };

  const removeEducation = (index: number) => {
    const newEducation = [...resumeData.education];
    newEducation.splice(index, 1);
    setResumeData(prev => ({ ...prev, education: newEducation }));
  };

  const requestImprovement = (type: 'experience' | 'education' | 'skills', index?: number) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to use AI features.",
        variant: "destructive",
      });
      return;
    }

    setCurrentImprovementRequest({ type, index });
    setAdDialogOpen(true);
  };
  
  const handleConfirmWatchAd = () => {
      if (currentImprovementRequest) {
        onWatchAd();
        handleImproveContent(currentImprovementRequest.type, currentImprovementRequest.index);
      }
  }

  const handleImproveContent = async (
    type: 'experience' | 'education' | 'skills',
    index?: number
  ) => {
    let contentToImprove = '';
    const stateKey = type === 'skills' ? 'skills' : `${type}-${index}`;
    setIsImproving(stateKey);

    if (type === 'experience' && index !== undefined) {
      contentToImprove = resumeData.experience[index].description;
    } else if (type === 'education' && index !== undefined) {
      contentToImprove = resumeData.education[index].details;
    } else if (type === 'skills') {
      contentToImprove = resumeData.skills;
    }

    if (!contentToImprove.trim()) {
      toast({ title: 'Nothing to improve', description: 'Please enter some content first.', variant: 'destructive' });
      setIsImproving(null);
      return;
    }

    try {
      const result = await improveResumeContent({ resumeData: contentToImprove });
      if (result.improvedContent) {
        setResumeData(prev => {
          const newData = { ...prev };
          if (type === 'experience' && index !== undefined) {
            newData.experience[index].description = result.improvedContent;
          } else if (type === 'education' && index !== undefined) {
            newData.education[index].details = result.improvedContent;
          } else if (type === 'skills') {
            newData.skills = result.improvedContent;
          }
          return newData;
        });
        toast({ title: 'Content Improved!', description: 'AI has enhanced your content.', className: 'bg-green-100 dark:bg-green-900' });
      }
    } catch (error) {
      console.error('AI improvement failed:', error);
      toast({ title: 'Error', description: 'Failed to improve content.', variant: 'destructive' });
    } finally {
      setIsImproving(null);
    }
  };

  const handleSaveData = () => {
    try {
      const jsonString = JSON.stringify(resumeData, null, 2);
      const blob = new Blob([jsonString], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "resume-data.json";
      document.body.appendChild(a);
a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast({ title: 'Data Saved!', description: 'Your resume data has been saved as resume-data.json.' });
    } catch (error) {
      console.error("Failed to save data", error);
      toast({ title: 'Error', description: 'Could not save resume data.', variant: 'destructive' });
    }
  };

  const handleLoadData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result;
        if (typeof text === 'string') {
          const loadedData = JSON.parse(text);
          // Basic validation to ensure the loaded data has the expected structure
          if (loadedData.personal && loadedData.experience && loadedData.education && loadedData.skills !== undefined) {
            setResumeData(loadedData);
            toast({ title: 'Data Loaded!', description: 'Your resume data has been loaded successfully.' });
          } else {
            throw new Error("Invalid JSON structure.");
          }
        }
      } catch (error) {
        console.error("Failed to load or parse data", error);
        toast({ title: 'Error Loading Data', description: 'The selected file is not a valid resume JSON file.', variant: 'destructive' });
      }
    };
    reader.readAsText(file);
    
    // Reset file input value to allow loading the same file again
    if(fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  };

  const handleLoadClick = () => {
    fileInputRef.current?.click();
  };
  
  const canUseAi = !!user;

  return (
    <>
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2 text-2xl">
                Input Your Details
              </CardTitle>
              <CardDescription>
                Provide your information below. Use the magic wand to get AI suggestions!
              </CardDescription>
            </div>
            <div className="flex gap-2">
                <Button variant="outline" onClick={handleSaveData}><Save className="mr-2 h-4 w-4" />Save</Button>
                <Button variant="outline" onClick={handleLoadClick}><Upload className="mr-2 h-4 w-4" />Load</Button>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleLoadData}
                    accept="application/json"
                    className="hidden"
                />
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" defaultValue={['personal-info']} className="w-full space-y-4">
          
          <AccordionItem value="personal-info" className="border rounded-lg overflow-hidden">
             <AccordionTrigger className="text-lg p-4 font-semibold hover:no-underline bg-secondary/50">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-primary" /> Personal Information
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 pt-2 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2"><Label htmlFor="name">Full Name</Label><Input id="name" name="name" value={resumeData.personal.name} onChange={handlePersonalInfoChange} /></div>
                  <div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" name="email" type="email" value={resumeData.personal.email} onChange={handlePersonalInfoChange} /></div>
                  <div className="space-y-2"><Label htmlFor="phone">Phone</Label><Input id="phone" name="phone" value={resumeData.personal.phone} onChange={handlePersonalInfoChange} /></div>
                  <div className="space-y-2"><Label htmlFor="website">Website/Portfolio</Label><Input id="website" name="website" value={resumeData.personal.website} onChange={handlePersonalInfoChange} /></div>
                </div>
              </AccordionContent>
          </AccordionItem>

          <AccordionItem value="experience" className="border-b-0 border rounded-lg overflow-hidden">
              <AccordionTrigger className="text-lg p-4 font-semibold hover:no-underline bg-secondary/50">
                <div className="flex items-center gap-3">
                  <Briefcase className="h-5 w-5 text-primary" /> Work Experience
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 pt-2 space-y-6">
                {resumeData.experience.map((exp, index) => (
                  <div key={index} className="space-y-4 p-4 border rounded-lg relative bg-background/50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2"><Label>Title</Label><Input name="title" value={exp.title} onChange={(e) => handleExperienceChange(index, e)} /></div>
                      <div className="space-y-2"><Label>Company</Label><Input name="company" value={exp.company} onChange={(e) => handleExperienceChange(index, e)} /></div>
                      <div className="space-y-2"><Label>Start Date</Label><Input name="startDate" value={exp.startDate} onChange={(e) => handleExperienceChange(index, e)} /></div>
                      <div className="space-y-2"><Label>End Date</Label><Input name="endDate" value={exp.endDate} onChange={(e) => handleExperienceChange(index, e)} /></div>
                    </div>
                    <div className="space-y-2 relative">
                      <Label>Description</Label>
                      <Textarea name="description" value={exp.description} onChange={(e) => handleExperienceChange(index, e)} rows={4} />
                       <Button size="sm" variant="outline" className="absolute bottom-2 right-2 glow-on-hover" onClick={() => requestImprovement('experience', index)} disabled={!!isImproving || !canUseAi}>
                        {isImproving === `experience-${index}` ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                        Improve
                      </Button>
                    </div>
                    <Button variant="destructive" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={() => removeExperience(index)}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                ))}
                <Button variant="outline" onClick={addExperience}><PlusCircle className="mr-2 h-4 w-4" /> Add Experience</Button>
              </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="education" className="border-b-0 border rounded-lg overflow-hidden">
              <AccordionTrigger className="text-lg p-4 font-semibold hover:no-underline bg-secondary/50">
                <div className="flex items-center gap-3">
                  <GraduationCap className="h-5 w-5 text-primary" /> Education
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 pt-2 space-y-6">
                 {resumeData.education.map((edu, index) => (
                  <div key={index} className="space-y-4 p-4 border rounded-lg relative bg-background/50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2"><Label>Institution</Label><Input name="institution" value={edu.institution} onChange={(e) => handleEducationChange(index, e)} /></div>
                      <div className="space-y-2"><Label>Degree</Label><Input name="degree" value={edu.degree} onChange={(e) => handleEducationChange(index, e)} /></div>
                      <div className="space-y-2"><Label>Start Date</Label><Input name="startDate" value={edu.startDate} onChange={(e) => handleEducationChange(index, e)} /></div>
                      <div className="space-y-2"><Label>End Date</Label><Input name="endDate" value={edu.endDate} onChange={(e) => handleEducationChange(index, e)} /></div>
                    </div>
                     <div className="space-y-2 relative">
                      <Label>Details / Achievements</Label>
                      <Textarea name="details" value={edu.details} onChange={(e) => handleEducationChange(index, e)} rows={2} />
                      <Button size="sm" variant="outline" className="absolute bottom-2 right-2 glow-on-hover" onClick={() => requestImprovement('education', index)} disabled={!!isImproving || !canUseAi}>
                        {isImproving === `education-${index}` ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                        Improve
                      </Button>
                    </div>
                    <Button variant="destructive" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={() => removeEducation(index)}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                ))}
                <Button variant="outline" onClick={addEducation}><PlusCircle className="mr-2 h-4 w-4" /> Add Education</Button>
              </AccordionContent>
          </AccordionItem>

          <AccordionItem value="skills" className="border-b-0 border rounded-lg overflow-hidden">
              <AccordionTrigger className="text-lg p-4 font-semibold hover:no-underline bg-secondary/50">
                <div className="flex items-center gap-3">
                  <Wrench className="h-5 w-5 text-primary" /> Skills
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 pt-2 space-y-4">
                <div className="space-y-2 relative">
                  <Label htmlFor="skills">Skills (comma-separated)</Label>
                  <Textarea id="skills" value={resumeData.skills} onChange={handleSkillsChange} rows={3} />
                   <Button size="sm" variant="outline" className="absolute bottom-2 right-2 glow-on-hover" onClick={() => requestImprovement('skills')} disabled={!!isImproving || !canUseAi}>
                    {isImproving === 'skills' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                    Improve
                  </Button>
                </div>
              </AccordionContent>
          </AccordionItem>

        </Accordion>
      </CardContent>
    </Card>
    <AlertDialog open={adDialogOpen} onOpenChange={setAdDialogOpen}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center gap-2"><Video /> Watch Ad to Improve</AlertDialogTitle>
                <AlertDialogDescription>
                    To use our AI content improvement feature, you need to watch a short rewarded ad. This helps us keep our basic AI tools free!
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setCurrentImprovementRequest(null)}>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleConfirmWatchAd}>Watch Ad & Improve</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
    </>
  );
}
