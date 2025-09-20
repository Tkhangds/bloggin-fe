import BlogCard from "@/components/blog/read/blog-card";
import { StoryCard } from "@/components/explore/story-list";
import { AuthorResultCard } from "@/components/search/author-result-card";
import { SearchBar } from "@/components/search/search-bar";
import { Badge } from "@/components/ui/badge";
import { User } from "@/types/user";
import { Bookmark, Tag, UserPen } from "lucide-react";
import React, { ReactNode } from "react";

const mockTopics = [
  { tagName: "adventure", postCount: 10 },
  { tagName: "royalty", postCount: 10 },
  { tagName: "inspiration", postCount: 10 },
  { tagName: "friendship", postCount: 10 },
  { tagName: "women", postCount: 10 },
];

const mockAuthors: User[] = [
  {
    id: "123456",
    username: "user1",
    email: "user1@example.com",
    displayName: "User 1",
    isAdmin: false,
    specialties: "Something",
    about: "Something Something",
  },
  {
    id: "123456",
    username: "user2",
    email: "user2@example.com",
    displayName: "User 2",
    isAdmin: false,
    specialties: "Something",
    about: "Something Something",
  },
  {
    id: "123456",
    username: "user3",
    email: "user3@example.com",
    displayName: "User 3",
    isAdmin: false,
    specialties: "Something",
    about: "Something Something",
  },
  {
    id: "123456",
    username: "user4",
    email: "user1@example.com",
    displayName: "User 4",
    isAdmin: false,
    specialties: "Something",
    about: "Something Something",
  },
  {
    id: "123456",
    username: "user4",
    email: "user1@example.com",
    displayName: "User 4",
    isAdmin: false,
    specialties: "Something",
    about: "Something Something",
  },
];

const mockBlogs = [
  {
    id: "123456",
    title: "Blog Title 1",
    excerpt: "This is a short excerpt of the blog post 1.",
    authorName: "Author 1",
    date: "Jan 1, 2023",
  },
  {
    id: "123456",
    title: "Blog Title 2",
    excerpt: "This is a short excerpt of the blog post 2.",
    authorName: "Author 2",
    date: "Jan 1, 2023",
  },
  {
    id: "123456",
    title: "Blog Title 3",
    excerpt: "This is a short excerpt of the blog post 3.",
    authorName: "Author 3",
    date: "Jan 1, 2023",
  },
  {
    id: "123456",
    title: "Blog Title 4",
    excerpt: "This is a short excerpt of the blog post 4.",
    authorName: "Author 4",
    date: "Jan 1, 2023",
  },
  {
    id: "123456",
    title: "Blog Title 5",
    excerpt: "This is a short excerpt of the blog post 5.",
    authorName: "Author 5",
    date: "Jan 1, 2023",
  },
  {
    id: "123456",
    title: "Blog Title 6",
    excerpt: "This is a short excerpt of the blog post 6.",
    authorName: "Author 6",
    date: "Jan 1, 2023",
  },
  {
    id: "123456",
    title: "Blog Title 7",
    excerpt: "This is a short excerpt of the blog post 7.",
    authorName: "Author 7",
    date: "Jan 1, 2023",
  },
];

export default function SearchPage() {
  return (
    <div className="flex flex-col items-center gap-5">
      <h1 className="text-center text-2xl font-bold md:text-3xl">
        Search Results
      </h1>

      <SearchBar className="mb-2 w-1/2" />

      <SearchSection sectionTitle="Topics" icon={<Tag size={20} />}>
        {mockTopics.map((topic, index) => (
          <TopicItem
            key={index}
            topicName={topic.tagName}
            postCount={topic.postCount}
          />
        ))}
      </SearchSection>

      <SearchSection sectionTitle="Authors" icon={<UserPen size={20} />}>
        {mockAuthors.map((author) => (
          <AuthorResultCard writer={author} className="w-full" />
        ))}
      </SearchSection>

      <SearchSection sectionTitle="Blogs" icon={<Bookmark size={20} />}>
        <div className="flex flex-wrap justify-center gap-10 md:justify-start">
          {mockBlogs.map((blog) => (
            <StoryCard
              className="md:max-w-[350px]"
              id={blog.id}
              title={blog.title}
              authorAvatar={""}
              authorName={blog.authorName}
              date={blog.date}
              excerpt={blog.excerpt}
            ></StoryCard>
          ))}
        </div>
      </SearchSection>
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
