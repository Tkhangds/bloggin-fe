import { SearchAction } from "@/apis/search.action";
import { StoryCard } from "@/components/explore/story-list";
import { AuthorResultCard } from "@/components/search/author-result-card";
import { SearchBar } from "@/components/search/search-bar";
import { Badge } from "@/components/ui/badge";
import { formatDateFromISOString } from "@/utils/date-convert";
import { Bookmark, Tag, UserPen } from "lucide-react";
import Link from "next/link";
import React, { ReactNode } from "react";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { query?: string };
}) {
  const query = searchParams.query || "";
  const searchResults = query ? await SearchAction.searchAsync(query) : null;

  return (
    <div className="flex flex-col items-center gap-5">
      <h1 className="text-center text-2xl font-bold md:text-3xl">
        Search Results
      </h1>

      <SearchBar className="mb-2 w-1/2" />

      {searchResults?.Tags && searchResults.Tags.length > 0 && (
        <SearchSection sectionTitle="Topics" icon={<Tag size={20} />}>
          {searchResults.Tags.map((topic) => (
            <TopicItem key={topic.id} topicName={topic.name} />
          ))}
        </SearchSection>
      )}

      {searchResults?.Authors && searchResults.Authors.length > 0 && (
        <SearchSection sectionTitle="Authors" icon={<UserPen size={20} />}>
          {searchResults.Authors.map((author) => (
            <AuthorResultCard
              key={author.id}
              writer={author}
              className="w-full"
            />
          ))}
        </SearchSection>
      )}

      {searchResults?.Posts && searchResults.Posts.length > 0 && (
        <SearchSection sectionTitle="Blogs" icon={<Bookmark size={20} />}>
          <div className="flex flex-wrap justify-center gap-10 md:justify-start">
            {searchResults.Posts.map((blog) => (
              <StoryCard
                key={blog.id}
                className="md:max-w-[300px]"
                id={blog.id}
                title={blog.title}
                authorAvatar={""}
                authorName={blog.author.displayName}
                date={formatDateFromISOString(blog.createdAt)}
              ></StoryCard>
            ))}
          </div>
        </SearchSection>
      )}
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
      <div className="flex flex-row items-center gap-2 py-1">
        {icon}
        <span className="text-lg font-semibold md:text-xl">{sectionTitle}</span>
      </div>

      <div className="flex w-full flex-wrap gap-4 py-4">{children}</div>
    </section>
  );
};

const TopicItem = ({ topicName }: { topicName: string }) => {
  return (
    <Link href={`/explore/${topicName}`}>
      <Badge
        variant="outline"
        className="cursor-pointer bg-background px-3 py-1 text-sm hover:bg-muted"
      >
        {topicName}
      </Badge>
    </Link>
  );
};
