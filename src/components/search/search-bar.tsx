import { Bookmark, Search, Tag, UserPen } from "lucide-react";
import { Input } from "../ui/input";
import React, { ReactNode } from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export const SearchBar = () => {
  return (
    <div className="relative hidden min-w-80 text-xs text-muted-foreground md:block">
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        size={15}
      />
      <Input
        placeholder="Search..."
        className="rounded-full bg-muted py-4 pl-8 shadow-none focus:bg-transparent"
      />

      <SearchResults>
        <SearchSection name="Blogs" icon={<Bookmark size={13} />}>
          <BlogResult title="blog1" authorName="author1" href="/"></BlogResult>
          <BlogResult title="blog2" authorName="author2" href="/"></BlogResult>
          <BlogResult title="blog3" authorName="author3" href="/"></BlogResult>
        </SearchSection>
        <SearchSection name="Authors" icon={<UserPen size={13} />}>
          <AuthorResult
            authorName="author1"
            follewers={10}
            href="/"
          ></AuthorResult>
          <AuthorResult
            authorName="author2"
            follewers={10}
            href="/"
          ></AuthorResult>
          <AuthorResult
            authorName="author2"
            follewers={10}
            href="/"
          ></AuthorResult>
        </SearchSection>
        <SearchSection name="Tags" icon={<Tag size={13} />}></SearchSection>
      </SearchResults>
    </div>
  );
};

const SearchResults = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="absolute top-10 z-10 w-full min-w-[450px] rounded border bg-background px-3 py-1 shadow-sm">
      {children}
    </div>
  );
};

interface SearchSectionProps {
  icon?: React.ReactNode;
  children?: ReactNode;
  name?: string;
}

const SearchSection = ({ icon, children, name }: SearchSectionProps) => {
  return (
    <div>
      {name && (
        <h3 className="flex border-spacing-2 items-center gap-0.5 border-b-2 py-1 font-semibold">
          {icon}
          {name}
        </h3>
      )}
      <div className="flex flex-col py-1">{children}</div>
    </div>
  );
};

const BlogResult = ({
  title,
  authorName,
  href,
}: {
  title: string;
  authorName: string;
  href: string;
}) => {
  return (
    <Link
      className="flex cursor-pointer justify-between p-1 hover:bg-muted"
      href={href}
    >
      <span className="text-sm">{title}</span>
      <span className="italic">by {authorName}</span>
    </Link>
  );
};

const AuthorResult = ({
  authorName,
  follewers,
  avatarUrl,
  href,
}: {
  authorName: string;
  follewers: number;
  avatarUrl?: string;
  href: string;
}) => (
  <Link
    className="flex cursor-pointer justify-between p-1 hover:bg-muted"
    href={href}
  >
    <div className="flex items-center gap-2">
      <Avatar className="h-5 w-5 border border-border">
        <AvatarImage
          src={`https://api.dicebear.com/9.x/initials/svg?seed=author`}
          alt="author"
        />
        <AvatarFallback className="bg-primary/10 text-primary">
          {`https://api.dicebear.com/9.x/initials/svg?seed=author`}
        </AvatarFallback>
      </Avatar>
      <span className="text-sm">{authorName}</span>
    </div>
    <span className="italic">{follewers} follewers</span>
  </Link>
);

const TagResult = () => {
  return <div></div>;
};
