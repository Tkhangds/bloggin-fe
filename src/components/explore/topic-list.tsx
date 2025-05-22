"use client";

import { cn } from "@/lib/utils";
import { Compass } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const topics = [
  { id: "culture", name: "Culture", active: true },
  { id: "life", name: "Life", active: false },
  { id: "history", name: "History", active: false },
  { id: "politics", name: "Politics", active: false },
  { id: "society", name: "Society", active: false },
  { id: "writing", name: "Writing", active: false },
  { id: "travel", name: "Travel", active: false },
  { id: "art", name: "Art", active: false },
  { id: "relationships", name: "Relationships", active: false },
  { id: "education", name: "Education", active: false },
  { id: "technology", name: "Technology", active: false },
  { id: "health", name: "Health", active: false },
  { id: "science", name: "Science", active: false },
  { id: "business", name: "Business", active: false },
  { id: "education", name: "Education", active: false },
  { id: "technology", name: "Technology", active: false },
  { id: "history", name: "History", active: false },
  { id: "politics", name: "Politics", active: false },
];

export function TopicList() {
  const [activeTopics, setActiveTopics] = useState(topics);

  const handleTopicClick = (id: string) => {
    setActiveTopics(
      activeTopics.map((topic) => ({
        ...topic,
        active: topic.id === id,
      })),
    );
  };

  return (
    <div className="mb-8">
      <div className="w-full overflow-x-auto">
        <div className="flex min-w-max space-x-2 py-5">
          <Link
            href="/explore"
            className="inline-flex items-center rounded-full border border-gray-200 px-4 py-2 text-sm font-medium"
          >
            <Compass className="mr-2 h-4 w-4" />
            Explore topics
          </Link>
          {activeTopics.map((topic, index) => (
            <Link
              key={index}
              href={`/topic/${topic.id}`}
              onClick={() => handleTopicClick(topic.id)}
              className={cn(
                "inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-colors",
                topic.active
                  ? "bg-gray-900 text-white"
                  : "border border-gray-200 bg-white hover:bg-gray-100",
              )}
            >
              {topic.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
