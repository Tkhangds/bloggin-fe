import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

import { Badge } from "@/components/ui/badge";
export default function TagRecommend(): JSX.Element {
  return (
    <div className="rounded-lg bg-gray-50 p-6">
      <h2 className="mb-4 text-lg font-bold">Topics to Follow</h2>
      <div className="flex flex-wrap gap-2">
        {topicsToFollow.map((topic, index) => (
          <Badge
            key={index}
            variant="outline"
            className="cursor-pointer bg-white px-3 py-1 hover:bg-gray-100"
          >
            {topic}
          </Badge>
        ))}
      </div>
      <Button
        variant="ghost"
        className="mt-4 w-full text-gray-500 hover:text-gray-700"
      >
        See More Topics
        <ChevronDown className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}

const topicsToFollow = [
  "Technology",
  "Startups",
  "Self Improvement",
  "Writing",
  "Relationships",
  "Machine Learning",
  "Productivity",
  "Politics",
  "Health",
];
