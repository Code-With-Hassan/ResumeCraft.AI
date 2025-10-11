"use client";

import type { Template } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface TemplateSelectorProps {
  templates: Template[];
  selectedTemplate: Template;
  onSelect: (template: Template) => void;
}

export default function TemplateSelector({ templates, selectedTemplate, onSelect }: TemplateSelectorProps) {
  return (
     <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Choose Your Template</CardTitle>
        <CardDescription>Select a base for your AI-crafted resume.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {templates.map((template) => (
            <Card
              key={template.id}
              onClick={() => onSelect(template)}
              className={cn(
                "cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-primary/60 relative group",
                selectedTemplate.id === template.id && "border-primary border-2 shadow-xl"
              )}
            >
              <CardContent className="p-3">
                <div className="w-full h-32 bg-secondary rounded-md flex items-center justify-center mb-3 border overflow-hidden">
                  <p className="text-muted-foreground font-headline text-md group-hover:scale-105 transition-transform duration-300">{template.name}</p>
                </div>
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold font-headline text-md">{template.name}</h3>
                  {template.isPremium && <Badge variant="secondary" className="bg-amber-400/20 text-amber-500 border-amber-500/30"><Star className="w-3 h-3 mr-1"/>Premium</Badge>}
                </div>
                {selectedTemplate.id === template.id && (
                  <div className="absolute top-1.5 right-1.5 bg-primary text-primary-foreground rounded-full p-0.5 shadow-lg">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
