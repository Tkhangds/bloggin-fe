"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AnimatedContent from "../../ui/animated-content";

export default function TemplateGallery() {
  const router = useRouter();
  const templates = [
    {
      id: 0,
      title: "Daily Blog",
      description:
        "Perfect for consistent daily updates and personal journaling",
      image: "/image/template/daily.png",
      name: "daily",
    },
    {
      id: 1,
      title: "Advice Blog",
      description:
        "Ideal for sharing wisdom, tips, and guidance with your audience",
      image: "/image/template/advice.png",
      name: "advice",
    },
    {
      id: 2,
      title: "Technical Blog",
      description:
        "Structured format for tutorials, code snippets, and technical explanations",
      image: "/image/template/technical.png",
      name: "technical",
    },
    {
      id: 3,
      title: "Tip Blog",
      description: "Quick, actionable tips and tricks in a concise format",
      image: "/image/template/tip.png",
      name: "tip",
    },
  ];

  const handleTemplateSelect = (id: number) => {
    //handle template selection logic here
    router.push("/draft" + `?templateName=${templates[id].name}`);
  };

  return (
    <div className="mx-auto flex max-w-5xl flex-col items-center space-y-6 bg-transparent p-4">
      <div className="w-full text-left">
        <AnimatedContent
          distance={100}
          direction="horizontal"
          reverse={true}
          config={{ tension: 100, friction: 20 }}
          animateOpacity
          scale={0.8}
          threshold={0.2}
          delay={100}
        >
          <h1 className="mb-2 w-full text-left text-3xl font-bold tracking-tight text-[#171717] dark:text-white md:text-5xl">
            Need a template?
          </h1>
          <h3 className="mb-4 w-full text-left text-xl tracking-tight text-muted-foreground md:text-2xl">
            Big ideas, no clue where to start? No worries – Bloggin’s gotchu!
          </h3>
        </AnimatedContent>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {templates.map((template) => (
          <AnimatedContent
            distance={100}
            direction="vertical"
            reverse={false}
            config={{ tension: 100, friction: 15 }}
            animateOpacity
            scale={0.9}
            threshold={0.2}
            delay={100}
            key={template.id}
          >
            <Card
              className={cn(
                "flex h-full min-h-[400px] flex-col transition-all hover:shadow-md",
              )}
            >
              <CardHeader className="p-0">
                <div className="relative aspect-[3/2] w-full overflow-hidden rounded-t-lg">
                  <Image
                    src={template.image || "/placeholder.svg"}
                    alt={`${template.title} template preview`}
                    fill
                    className="object-scale-down"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </CardHeader>
              <CardContent className="flex-grow p-4 pb-0">
                <CardTitle className="mb-2 flex items-center justify-between">
                  {template.title}
                  {/* {selectedTemplate === template.id && (
                    <Check className="h-5 w-5 text-primary" />
                  )} */}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {template.description}
                </p>
              </CardContent>
              <CardFooter className="mt-auto p-4">
                <Button
                  variant={"outline"}
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTemplateSelect(template.id);
                  }}
                >
                  Select Template
                </Button>
              </CardFooter>
            </Card>
          </AnimatedContent>
        ))}
      </div>
    </div>
  );
}
