"use client";

import type { ResumeData, Template, ATSCheckResult } from "@/lib/types";
import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, ShieldCheck, FileText, Loader2, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { checkResumeAgainstATS } from "@/ai/flows/check-resume-against-ats";
import ATSCheckerDialog from "./ats-checker-dialog";
import { useAuth } from "@/lib/auth";

interface ResumePreviewProps {
  resumeData: ResumeData;
  template: Template;
  adsWatched: number;
}

const MarkdownRenderer = ({ content, templateId }: { content: string, templateId: string }) => {
  return (
    <div className={cn("prose prose-sm dark:prose-invert max-w-none", templateId === "bold-accent" && "prose-headings:text-primary")}>
      {content.split('\n').map((line, index) => {
        if (line.trim() === '') return null;
        if (line.startsWith('### ')) return <h3 key={index} className="text-lg font-semibold mb-1 mt-3">{line.substring(4).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>')}</h3>;
        if (line.startsWith('## ')) return <h2 key={index} className="text-xl font-bold border-b pb-2 mb-2 mt-4">{line.substring(3)}</h2>;
        if (line.startsWith('# ')) return <h1 key={index} className="text-3xl font-bold mb-2" dangerouslySetInnerHTML={{ __html: line.substring(2).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />;
        if (line.startsWith('> ')) return <blockquote key={index} className="border-l-4 border-primary pl-4 text-muted-foreground italic my-2">{line.substring(2)}</blockquote>;
        if (line.startsWith('---')) return <hr key={index} className="my-4" />;
        if (line.startsWith('- ')) return <li key={index} className="ml-4" dangerouslySetInnerHTML={{ __html: line.substring(2).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>') }} />;
        
        const formattedLine = line
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/\*(.*?)\*/g, '<em>$1</em>');
        
        return <p key={index} dangerouslySetInnerHTML={{ __html: formattedLine }} />;
      })}
    </div>
  );
};


const fillTemplate = (template: string, data: ResumeData): string => {
    let output = template;
    Object.entries(data.personal).forEach(([key, value]) => {
      output = output.replace(new RegExp(`{{${key}}}`, 'g'), value || '');
    });
  
    const processSection = (sectionName: 'experience' | 'education') => {
      const regex = new RegExp(`{{#${sectionName}}}(.*?){{\/${sectionName}}}`, 'gs');
      const match = output.match(regex);
      if (match) {
        const itemTemplate = match[0].replace(`{{#${sectionName}}}`, '').replace(`{{/${sectionName}}}`, '').trim();
        const items = data[sectionName];
        if (Array.isArray(items)) {
          const allItems = items.map(item => {
            let temp = itemTemplate;
            Object.entries(item).forEach(([key, value]) => {
              temp = temp.replace(new RegExp(`{{${key}}}`, 'g'), value || '');
            });
            return temp;
          }).join('\n\n');
          output = output.replace(regex, allItems);
        }
      }
    };
  
    processSection('experience');
    processSection('education');
    
    output = output.replace(/{{skills}}/g, data.skills || '');
    return output;
};


export default function ResumePreview({ resumeData, template, adsWatched }: ResumePreviewProps) {
  const { toast } = useToast();
  const { user } = useAuth();
  const [atsResult, setAtsResult] = useState<ATSCheckResult>(null);
  const [isAtsLoading, setIsAtsLoading] = useState(false);
  const [isAtsDialogOpen, setIsAtsDialogOpen] = useState(false);
  
  const canDownloadPdf = user && adsWatched >= 3;

  const finalMarkdown = useMemo(() => fillTemplate(template.markdown, resumeData), [template, resumeData]);

  const handleDownload = (format: 'md' | 'pdf') => {
    if (format === 'pdf' && !canDownloadPdf) {
      if(!user) {
        toast({
          title: "Authentication Required",
          description: "Please log in to download your resume as a PDF.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Watch Ads to Download",
          description: `Please watch ${3-adsWatched} more ad(s) to download your resume as a PDF.`,
          variant: "destructive",
        });
      }
      return;
    }

    if (template.isPremium && format === 'pdf') {
      toast({
        title: "Premium Feature",
        description: "Downloading in PDF format is a premium feature. For now, you can download as Markdown.",
        variant: "destructive",
      });
      // In a real app, you might not return here if the user is premium.
      // For mock purposes, we will prevent download.
      if (!user?.isPremium) {
        return;
      }
    }

    if (format === 'md') {
        const blob = new Blob([finalMarkdown], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'resume.md';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    } else if (format === 'pdf') {
      // PDF generation would happen here. For now, we'll just show a toast.
       toast({
        title: "PDF Download (Mock)",
        description: "This would trigger a PDF download in a real application.",
      });
    }
  };

  const handleAtsCheck = async () => {
    setIsAtsLoading(true);
    setAtsResult(null);
    try {
      const result = await checkResumeAgainstATS(finalMarkdown);
      setAtsResult(result);
      setIsAtsDialogOpen(true);
    } catch (error) {
      console.error("ATS Check failed", error);
      toast({ title: 'Error', description: 'Failed to check ATS compatibility.', variant: 'destructive' });
    } finally {
      setIsAtsLoading(false);
    }
  };

  return (
    <>
      <Card className="shadow-lg h-full">
        <CardHeader>
          <div className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-2xl">3. Preview & Export</CardTitle>
              <CardDescription>Your resume is ready! Check ATS score or download.</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleAtsCheck} disabled={isAtsLoading}>
                {isAtsLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ShieldCheck className="mr-2 h-4 w-4" />}
                Check ATS
              </Button>
              <Button size="sm" onClick={() => handleDownload('pdf')} className={cn(canDownloadPdf && "glow-on-hover")} disabled={!canDownloadPdf}>
                <Download className="mr-2 h-4 w-4" /> PDF {template.isPremium && <Star className="ml-2 h-3 w-3 fill-amber-300 text-amber-500" />}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="bg-card-foreground/5 rounded-b-lg p-6 md:p-8 shadow-inner overflow-y-auto" style={{minHeight: '800px'}}>
          <div className="bg-white text-black p-8 rounded-md shadow-md">
            <MarkdownRenderer content={finalMarkdown} templateId={template.id} />
          </div>
        </CardContent>
      </Card>
      <ATSCheckerDialog open={isAtsDialogOpen} onOpenChange={setIsAtsDialogOpen} result={atsResult} />
    </>
  );
}
