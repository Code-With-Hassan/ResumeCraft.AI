"use client";

import type { Template } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
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
    <section>
      <h2 className="text-3xl font-bold text-center mb-8">1. Choose Your Template</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {templates.map((template) => (
          <Card
            key={template.id}
            onClick={() => onSelect(template)}
            className={cn(
              "cursor-pointer transition-all duration-300 hover:shadow-xl hover:border-primary/80 relative group",
              selectedTemplate.id === template.id && "border-primary border-2 shadow-2xl"
            )}
          >
            <CardContent className="p-4">
              <div className="w-full h-48 bg-secondary rounded-md flex items-center justify-center mb-4 border overflow-hidden">
                <p className="text-muted-foreground font-headline text-lg group-hover:scale-105 transition-transform duration-300">{template.name}</p>
              </div>
              <div className="flex justify-between items-center">
                <h3 className="font-semibold font-headline text-lg">{template.name}</h3>
                {template.isPremium && <Badge className="bg-amber-500 text-white"><Star className="w-3 h-3 mr-1"/>Premium</Badge>}
              </div>
              {selectedTemplate.id === template.id && (
                <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1 shadow-lg">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
