"use client";

import { useState } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function TemplateGallery() {
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);

  const templates = [
    {
      id: 0,
      title: "Daily Blog",
      description:
        "Perfect for consistent daily updates and personal journaling",
      image: "https://placehold.co/300x200/png",
    },
    {
      id: 1,
      title: "Advice Blog",
      description:
        "Ideal for sharing wisdom, tips, and guidance with your audience",
      image: "https://placehold.co/300x200/png",
    },
    {
      id: 2,
      title: "Technical Blog",
      description:
        "Structured format for tutorials, code snippets, and technical explanations",
      image: "https://placehold.co/300x200/png",
    },
    {
      id: 3,
      title: "Tip Blog",
      description: "Quick, actionable tips and tricks in a concise format",
      image: "https://placehold.co/300x200/png",
    },
  ];

  const handleTemplateSelect = (id: number) => {
    setSelectedTemplate(id);
  };

  return (
    <div className="mx-auto flex max-w-5xl flex-col items-center space-y-6 bg-transparent p-4">
      <div className="w-full text-left">
        <h1 className="mb-2 w-full text-left text-3xl font-bold tracking-tight md:text-5xl">
          Need a template?
        </h1>
        <h3 className="text-1xl font-thin- mb-4 w-full text-left tracking-tight md:text-2xl">
          Big ideas, no clue where to start? No worries – Bloggin’s gotchu!
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {templates.map((template) => (
          <Card
            key={template.id}
            className={cn(
              "flex min-h-[400px] cursor-pointer flex-col transition-all hover:shadow-md",
              selectedTemplate === template.id && "ring-2 ring-primary",
            )}
            onClick={() => handleTemplateSelect(template.id)}
          >
            <CardHeader className="p-0">
              <div className="relative aspect-[3/2] w-full overflow-hidden rounded-t-lg">
                <Image
                  src={template.image || "/placeholder.svg"}
                  alt={`${template.title} template preview`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </CardHeader>
            <CardContent className="flex-grow p-4">
              <CardTitle className="mb-2 flex items-center justify-between">
                {template.title}
                {selectedTemplate === template.id && (
                  <Check className="h-5 w-5 text-primary" />
                )}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {template.description}
              </p>
            </CardContent>
            <CardFooter className="mt-auto p-4">
              <Button
                variant={
                  selectedTemplate === template.id ? "default" : "outline"
                }
                className="w-full"
                onClick={(e) => {
                  e.stopPropagation();
                  handleTemplateSelect(template.id);
                }}
              >
                {selectedTemplate === template.id
                  ? "Selected"
                  : "Select Template"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
