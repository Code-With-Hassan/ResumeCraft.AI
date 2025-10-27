

"use client";

import type { ResumeData, Template, ATSCheckResult } from "@/lib/types";
import React, { useMemo, useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, ShieldCheck, Loader2, Star, Send, Video } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { checkResumeAgainstATS } from "@/ai/flows/check-resume-against-ats";
import ATSCheckerDialog from "./ats-checker-dialog";
import { useUser } from '@/firebase';
import { fillTemplate } from "@/lib/template-utils";
import MarkdownRenderer from "./markdown-renderer";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";
import { AdFactory } from "@/lib/ads/AdFactory";


interface ResumePreviewProps {
  resumeData: ResumeData;
  template: Template;
  adsWatched: number;
  onWatchAd: () => void;
}

export default function ResumePreview({ resumeData, template, adsWatched, onWatchAd }: ResumePreviewProps) {
  const { toast } = useToast();
  const { user } = useUser();
  const [atsResult, setAtsResult] = useState<ATSCheckResult>(null);
  const [isAtsLoading, setIsAtsLoading] = useState(false);
  const [isPdfLoading, setIsPdfLoading] = useState(false);
  const [isAtsDialogOpen, setIsAtsDialogOpen] = useState(false);
  const [adDialogOpen, setAdDialogOpen] = useState(false);
  const [adActionType, setAdActionType] = useState<'pdf' | 'ats' | null>(null);
  const printRef = useRef<HTMLDivElement>(null);
  
  const canUseAi = !!user;

  const finalMarkdown = useMemo(() => fillTemplate(template.markdown, resumeData), [template, resumeData]);

  const handleDownload = async (format: 'md' | 'pdf') => {
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
        return;
    }
    
    if (format === 'pdf') {
        if (!user) {
            toast({ title: "Authentication Required", description: "Please log in to download a PDF.", variant: "destructive" });
            return;
        }

        if (template.isPremium) {
            toast({ title: "Premium Feature", description: "This template requires a premium account for PDF downloads.", variant: "destructive" });
            return;
        }
        
        if (adsWatched < 3) {
            setAdActionType('pdf');
            setAdDialogOpen(true);
            return;
        }
        
        generatePdf();
    }
  };
  
  const generatePdf = async () => {
    if (!printRef.current) {
        toast({ title: "Error", description: "Could not find resume content to download.", variant: "destructive" });
        return;
    }
    setIsPdfLoading(true);
    try {
        const canvas = await html2canvas(printRef.current, { 
          scale: 3, 
          backgroundColor: '#ffffff',
          useCORS: true 
        });
        const imgData = canvas.toDataURL('image/png');
        
        const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgProps = pdf.getImageProperties(imgData);
        const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, imgHeight);
        heightLeft -= pdfHeight;

        while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
            heightLeft -= pdfHeight;
        }

        pdf.save('resume.pdf');

    } catch (error) {
        console.error("PDF generation failed:", error);
        toast({ title: "PDF Generation Failed", description: "An unexpected error occurred.", variant: "destructive" });
    } finally {
        setIsPdfLoading(false);
    }
};

  const handleAtsCheck = async () => {
    if (!canUseAi) {
      toast({ title: "Authentication Required", description: "Please log in to use AI features.", variant: "destructive" });
      return;
    }
    
    if (adsWatched < 3) {
        setAdActionType('ats');
        setAdDialogOpen(true);
        return;
    }
    runAtsCheck();
  };
  
  const runAtsCheck = async () => {
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
  }

  const handleConfirmWatchAd = async () => {
      if (adActionType) {
        const adNetwork = AdFactory.getAdNetwork('GoogleAdSense');
        try {
          const adWatchedResult = await adNetwork.showRewardedAd();
          if (adWatchedResult) {
            onWatchAd();
            toast({
              title: "Ad Watched!",
              description: "Thank you! You can now proceed.",
            });
            if(adActionType === 'pdf') generatePdf();
            if(adActionType === 'ats') runAtsCheck();
          } else {
            toast({ title: "Ad Skipped", description: "You must watch the ad to proceed.", variant: "destructive" });
          }
        } catch (error) {
           console.error("Ad error:", error);
           toast({ title: "Ad Error", description: "Could not load ad. Try again later.", variant: "destructive" });
        }
      }
      setAdActionType(null);
  }

  return (
    <>
      <Card className="shadow-lg h-full">
        <CardHeader>
          <div className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-2xl">Preview</CardTitle>
              <CardDescription>Your resume is ready! Check ATS or export.</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleAtsCheck} disabled={isAtsLoading || !canUseAi}>
                {isAtsLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ShieldCheck className="mr-2 h-4 w-4" />}
                Check ATS
              </Button>
               <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button size="sm" className="glow-on-hover">
                        <Send className="mr-2 h-4 w-4" /> Export
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleDownload('pdf')} disabled={isPdfLoading}>
                         {isPdfLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
                         PDF {template.isPremium && <Star className="ml-2 h-3 w-3 fill-amber-300 text-amber-500" />}
                    </DropdownMenuItem>
                     <DropdownMenuItem onClick={() => handleDownload('md')}>
                        <Download className="mr-2 h-4 w-4" />
                        Markdown
                    </DropdownMenuItem>
                </DropdownMenuContent>
               </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent className="bg-gray-100 rounded-b-lg p-4 md:p-8 shadow-inner overflow-y-auto" style={{minHeight: '800px'}}>
          <div ref={printRef} className="bg-white p-8 rounded-md shadow-md aspect-[210/297] mx-auto" style={{width: '210mm'}}>
            <MarkdownRenderer 
              content={finalMarkdown} 
              templateId={template.id} 
              className={template.style} 
              styles={resumeData.styles}
            />
          </div>
        </CardContent>
      </Card>
      <ATSCheckerDialog open={isAtsDialogOpen} onOpenChange={setIsAtsDialogOpen} result={atsResult} />
      <AlertDialog open={adDialogOpen} onOpenChange={setAdDialogOpen}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center gap-2"><Video /> Watch Ad to Continue</AlertDialogTitle>
                <AlertDialogDescription>
                    {adsWatched < 3 ? `You have ${3-adsWatched} ad watch(es) left to unlock this feature.` : ''} This helps us keep our AI tools available for free.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setAdActionType(null)}>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleConfirmWatchAd}>Watch Ad</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
    </>
  );
}



