"use client";

import type { ATSCheckResult } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle } from "lucide-react";

interface ATSCheckerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  result: ATSCheckResult;
}

export default function ATSCheckerDialog({ open, onOpenChange, result }: ATSCheckerDialogProps) {
  if (!result) return null;

  const score = result.atsCompatibilityScore || 0;
  const getScoreColor = () => {
    if (score > 85) return 'bg-green-500';
    if (score > 60) return 'bg-yellow-500';
    return 'bg-red-500';
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>ATS Compatibility Report</DialogTitle>
          <DialogDescription>
            Here's how your resume scores against common Applicant Tracking Systems.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-6">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Compatibility Score</p>
            <div className="relative w-32 h-32 mx-auto">
               <svg className="w-full h-full" viewBox="0 0 36 36">
                <path
                  className="text-secondary"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  strokeWidth="3"
                />
                <path
                  className={`${getScoreColor().replace('bg-', 'text-')}`}
                  strokeDasharray={`${score}, 100`}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl font-bold">{score}</span>
              </div>
            </div>
            
          </div>
          <div>
            <h3 className="font-semibold mb-3">Suggestions for Improvement:</h3>
            <ul className="space-y-3">
              {result.suggestions?.map((suggestion, index) => (
                <li key={index} className="flex items-start gap-3 text-sm">
                  <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 shrink-0" />
                  <span>{suggestion}</span>
                </li>
              ))}
              {result.suggestions?.length === 0 && (
                 <li className="flex items-start gap-3 text-sm text-green-600">
                  <CheckCircle className="h-4 w-4 mt-0.5 shrink-0" />
                  <span>Great job! Your resume looks highly compatible.</span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
