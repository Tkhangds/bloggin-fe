import { SearchBar } from "@/components/search/search-bar";
import { Badge } from "@/components/ui/badge";
import { Bookmark, Tag, UserPen } from "lucide-react";
import React, { ReactNode } from "react";

const mockTopics = [
  { tagName: "adventure", postCount: 10 },
  { tagName: "royalty", postCount: 10 },
  { tagName: "inspiration", postCount: 10 },
  { tagName: "friendship", postCount: 10 },
  { tagName: "women", postCount: 10 },
];

export default function SearchPage() {
  return (
    <div className="flex flex-col items-center gap-5">
      <h1 className="text-center text-2xl font-bold md:text-3xl">
        Search Results
      </h1>

      <SearchBar className="w-1/2" />

      <SearchSection sectionTitle="Topics" icon={<Tag size={20} />}>
        {mockTopics.map((topic, index) => (
          <TopicItem
            key={index}
            topicName={topic.tagName}
            postCount={topic.postCount}
          />
        ))}
      </SearchSection>

      <SearchSection
        sectionTitle="Authors"
        icon={<UserPen size={20} />}
      ></SearchSection>

      <SearchSection
        sectionTitle="Blogs"
        icon={<Bookmark size={20} />}
      ></SearchSection>
    </div>
  );
}

const SearchSection = ({
  children,
  icon,
  sectionTitle,
}: {
  children?: ReactNode;
  icon?: React.ReactNode;
  sectionTitle?: string;
}) => {
  return (
    <section className="w-full">
      <div className="flex flex-row items-center gap-2 border-b-2 py-1">
        {icon}
        <span className="text-lg font-semibold">{sectionTitle}</span>
      </div>

      <div className="flex w-full flex-wrap gap-4 py-4">{children}</div>
    </section>
  );
};

const TopicItem = ({
  topicName,
  postCount,
}: {
  topicName: string;
  postCount: number;
}) => {
  return (
    <Badge
      variant="outline"
      className="cursor-pointer bg-white px-3 py-1 hover:bg-gray-100 dark:text-black"
    >
      {topicName} ({postCount})
    </Badge>
  );
};
