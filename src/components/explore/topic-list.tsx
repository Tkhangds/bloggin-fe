"use client";

import { cn } from "@/lib/utils";
import { GetTopTagResponseDto } from "@/types/dtos/get-top-tag-response.dto";
import { ChevronLeft, ChevronRight, Compass } from "lucide-react";
import { useRef } from "react";
import { twMerge } from "tailwind-merge";
import { Skeleton } from "../ui/skeleton";

export type Topic = {
  id: string;
  name: string;
  active: boolean;
};

export function TopicList({
  topicList,
  currentTopic,
  onTopicClicked,
}: {
  topicList?: GetTopTagResponseDto[];
  currentTopic?: GetTopTagResponseDto;
  onTopicClicked?: (topic: GetTopTagResponseDto) => void;
}) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 250; // Adjust this value to control scroll distance
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const newScroll =
        direction === "left"
          ? currentScroll - scrollAmount
          : currentScroll + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: newScroll,
        behavior: "smooth",
      });
    }
  };

  if (!topicList) {
    return <TopicSelectorSkeleton />;
  }

  return (
    <div className="relative mb-8 flex max-w-[80vw] items-center justify-start">
      <button
        onClick={() => scroll("left")}
        className={twMerge(
          "rounded-full p-2",
          topicList.length < 13 && "lg:hidden",
        )}
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <div
        className="no-scrollbar flex w-fit max-w-full items-center justify-start gap-2 overflow-x-auto md:gap-4"
        ref={scrollContainerRef}
      >
        <div className="inline-flex min-w-max items-center border-r-2 px-4 py-2 text-sm font-medium">
          <Compass className="mr-2 h-4 w-4" />
          Explore topics
        </div>

        {topicList.length === 0 && (
          <div className="inline-flex items-center px-4 py-2 text-sm font-medium text-muted-foreground">
            No topics available
          </div>
        )}

        {topicList.map((topic, index) => (
          <div
            key={index}
            onClick={() => onTopicClicked?.(topic)}
            className={cn(
              "inline-flex w-fit min-w-fit cursor-pointer items-center rounded-full px-4 py-2 text-sm font-medium transition-colors",
              currentTopic?.name === topic.name
                ? "bg-primary text-primary-foreground"
                : "border-muted-background border bg-primary-foreground",
            )}
          >
            {topic.name}
          </div>
        ))}
      </div>

      <button
        onClick={() => scroll("right")}
        className={twMerge(
          "rounded-full p-2",
          topicList.length < 13 && "lg:hidden",
        )}
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}

const TopicSelectorSkeleton = () => {
  return (
    <div className="relative mb-8 flex max-w-[80vw] items-center justify-start">
      {/* Left scroll button */}
      <button className="cursor-not-allowed rounded-full p-2 opacity-50">
        <ChevronLeft className="h-5 w-5 text-muted-foreground" />
      </button>

      <div className="no-scrollbar flex w-fit max-w-full items-center justify-start gap-2 overflow-x-auto md:gap-4">
        {/* Explore topics skeleton */}
        <div className="inline-flex min-w-max items-center border-r-2 px-4 py-2 text-sm font-medium">
          <Skeleton className="mr-2 h-4 w-4 rounded" />
          <Skeleton className="h-4 w-24" />
        </div>

        {/* Topic pills skeleton */}
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="border-muted-background inline-flex w-fit min-w-fit items-center rounded-full border bg-primary-foreground px-4 py-2"
          >
            <Skeleton
              className="h-4 w-16"
              style={{ width: `${Math.random() * 40 + 40}px` }}
            />
          </div>
        ))}
      </div>

      {/* Right scroll button */}
      <button className="cursor-not-allowed rounded-full p-2 opacity-50">
        <ChevronRight className="h-5 w-5 text-muted-foreground" />
      </button>
    </div>
  );
};
