
"use client";

import type { ResumeData, Template, ATSCheckResult } from "@/lib/types";
import React, { useMemo, useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, ShieldCheck, Loader2, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { checkResumeAgainstATS } from "@/ai/flows/check-resume-against-ats";
import ATSCheckerDialog from "./ats-checker-dialog";
import { useAuth } from "@/lib/auth";
import { fillTemplate } from "@/lib/template-utils";
import MarkdownRenderer from "./markdown-renderer";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";


interface ResumePreviewProps {
  resumeData: ResumeData;
  template: Template;
  adsWatched: number;
}

export default function ResumePreview({ resumeData, template, adsWatched }: ResumePreviewProps) {
  const { toast } = useToast();
  const { user } = useAuth();
  const [atsResult, setAtsResult] = useState<ATSCheckResult>(null);
  const [isAtsLoading, setIsAtsLoading] = useState(false);
  const [isPdfLoading, setIsPdfLoading] = useState(false);
  const [isAtsDialogOpen, setIsAtsDialogOpen] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);
  
  const canUseAi = user && adsWatched >= 3;
  const canDownloadPdf = user && adsWatched >= 3;

  const finalMarkdown = useMemo(() => fillTemplate(template.markdown, resumeData), [template, resumeData]);

  const handleDownload = async (format: 'md' | 'pdf') => {
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
      if (!user?.isPremium) {
        toast({
            title: "Premium Feature",
            description: "This template requires a premium account for PDF downloads.",
            variant: "destructive",
        });
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
        if (!printRef.current) {
            toast({
                title: "Error",
                description: "Could not find resume content to download.",
                variant: "destructive",
            });
            return;
        }
        setIsPdfLoading(true);
        try {
            const canvas = await html2canvas(printRef.current, { scale: 2 });
            const imgData = canvas.toDataURL('image/png');
            
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'px',
                format: [canvas.width, canvas.height]
            });

            pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
            pdf.save('resume.pdf');

        } catch (error) {
            console.error("PDF generation failed:", error);
            toast({
                title: "PDF Generation Failed",
                description: "An unexpected error occurred while creating the PDF.",
                variant: "destructive",
            });
        } finally {
            setIsPdfLoading(false);
        }
    }
  };

  const handleAtsCheck = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to use AI features.",
        variant: "destructive",
      });
      return;
    }
    
    if (adsWatched < 3) {
      toast({
        title: "Unlock AI Features",
        description: `Please watch ${3 - adsWatched} more ad(s) to use the ATS checker.`,
        variant: "destructive",
      });
      return;
    }

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
              <Button variant="outline" size="sm" onClick={handleAtsCheck} disabled={isAtsLoading || !canUseAi}>
                {isAtsLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ShieldCheck className="mr-2 h-4 w-4" />}
                Check ATS
              </Button>
              <Button size="sm" onClick={() => handleDownload('pdf')} className={cn(canDownloadPdf && "glow-on-hover")} disabled={!canDownloadPdf || isPdfLoading}>
                {isPdfLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
                 PDF {template.isPremium && <Star className="ml-2 h-3 w-3 fill-amber-300 text-amber-500" />}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="bg-card-foreground/5 rounded-b-lg p-6 md:p-8 shadow-inner overflow-y-auto" style={{minHeight: '800px'}}>
          <div ref={printRef} className="bg-white p-8 rounded-md shadow-md">
            <MarkdownRenderer content={finalMarkdown} templateId={template.id} className={template.style} />
          </div>
        </CardContent>
      </Card>
      <ATSCheckerDialog open={isAtsDialogOpen} onOpenChange={setIsAtsDialogOpen} result={atsResult} />
    </>
  );
}
