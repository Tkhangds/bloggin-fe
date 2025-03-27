"use client";

import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import AnimatedContent from "../ui/animated-content";

export default function TagSection() {
  const topics = [
    { name: "Web Development", slug: "web-development" },
    { name: "UI Design", slug: "ui-design" },
    { name: "Machine Learning", slug: "machine-learning" },
    { name: "Productivity", slug: "productivity" },
    { name: "Career Growth", slug: "career-growth" },
    { name: "Technology", slug: "technology" },
    { name: "Artificial Intelligence", slug: "artificial-intelligence" },
    { name: "Mobile Development", slug: "mobile-development" },
    { name: "Cloud Computing", slug: "cloud-computing" },
    { name: "Cybersecurity", slug: "cybersecurity" },
    { name: "Data Science", slug: "data-science" },
    { name: "Blockchain", slug: "blockchain" },
  ];

  return (
    <section className="relative mx-auto flex w-full items-center justify-center bg-neutral-100 px-[-1rem] py-12 dark:bg-black md:py-24 lg:py-28">
      <div className="absolute left-0 right-0 top-0 h-10 bg-gradient-to-b from-white to-neutral-100 dark:from-neutral-950 dark:to-black"></div>
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-b from-neutral-100 to-white dark:from-black dark:to-neutral-950"></div>
      <div className="container flex w-full max-w-5xl flex-col justify-center px-4 md:px-6">
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
            Topics you may find interesting!
          </h1>
          <h3 className="text-1xl mb-4 w-full text-left tracking-tight text-muted-foreground md:text-2xl">
            Explore content across various subjects that match your interests
          </h3>
        </AnimatedContent>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {topics.map((topic, index) => (
            <AnimatedContent
              distance={20}
              direction="vertical"
              reverse={false}
              config={{ tension: 100, friction: 20 }}
              animateOpacity
              scale={1}
              threshold={0.3}
              delay={index * 50}
              key={topic.slug}
            >
              <Link href={`/topics/${topic.slug}`}>
                <Badge
                  variant="secondary"
                  className="cursor-pointer border border-input bg-white px-4 py-2 text-sm shadow-sm transition hover:scale-105 hover:bg-secondary/80 hover:text-accent-foreground dark:bg-black dark:hover:bg-accent"
                >
                  {topic.name}
                </Badge>
              </Link>
            </AnimatedContent>
          ))}

          {/* "And much more" badge with special styling */}
          <AnimatedContent
            distance={50}
            direction="vertical"
            reverse={false}
            config={{ tension: 100, friction: 20 }}
            animateOpacity
            scale={1}
            threshold={0.3}
            delay={(topics.length + 1) * 50}
          >
            <Link href="/topics">
              <Badge
                variant="outline"
                className="group flex cursor-pointer items-center border-dashed bg-white/50 px-4 py-2 text-sm transition hover:scale-105 dark:bg-white/30"
              >
                And much more
                <ChevronRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
              </Badge>
            </Link>
          </AnimatedContent>
        </div>
      </div>
    </section>
  );
}
