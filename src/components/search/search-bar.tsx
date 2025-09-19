"use client";

import { Bookmark, Search, Tag, UserPen } from "lucide-react";
import { Input } from "../ui/input";
import React, { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { twMerge } from "tailwind-merge";

const mockBlogs = [
  {
    title: "Witch of the day",
    authorName: "author1",
    href: "/",
  },
  { title: "Descendant with vigor", authorName: "author2", href: "/" },
  { title: "Result of greatness", authorName: "author3", href: "/" },
];

const mockAuthors = [
  { authorName: "author1", follewers: 10, href: "/" },
  { authorName: "author2", follewers: 10, href: "/" },
  { authorName: "author3", follewers: 10, href: "/" },
];

const mockTags = [
  { tagName: "adventure" },
  { tagName: "royalty" },
  { tagName: "inspiration" },
  { tagName: "friendship" },
  { tagName: "women" },
];

export const SearchBar = ({
  className,
  showSearchBar = true,
}: {
  className?: string;
  showSearchBar?: boolean;
}) => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(query.length > 0);

  const pathName = usePathname();
  const searchQuery = useSearchParams().get("query");
  const isInSearchPage = pathName.toString().indexOf("/search") !== -1;

  const router = useRouter();

  useEffect(() => {
    if (searchQuery) {
      setQuery(searchQuery);
    }
  }, []);

  const onInputEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const encodedQuery = encodeURIComponent(query);

      if (!isInSearchPage) {
        router.push(`/search?query=${encodedQuery}`);
      } else {
        router.replace(`/search?query=${encodedQuery}`);
      }
    }
  };

  return (
    <div
      className={twMerge(
        "relative min-w-80 text-xs text-muted-foreground",
        className,
        !showSearchBar && "hidden",
      )}
    >
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        size={15}
      />
      <Input
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(e.target.value.length > 0);
        }}
        type="text"
        placeholder="Search..."
        className="rounded-full bg-muted py-4 pl-8 shadow-none focus:bg-transparent"
        onKeyDown={(e) => onInputEnter(e)}
        onBlur={() => setOpen(false)}
        onFocus={() => setOpen(true)}
      />

      {open && (
        <SearchResults>
          {mockBlogs && mockBlogs.length > 0 && (
            <SearchSection name="Blogs" icon={<Bookmark size={13} />}>
              {mockBlogs.map((blog, index) => (
                <BlogResult
                  key={index}
                  title={blog.title}
                  authorName={blog.authorName}
                  href={blog.href}
                ></BlogResult>
              ))}
            </SearchSection>
          )}

          {mockAuthors && mockAuthors.length > 0 && (
            <SearchSection name="Authors" icon={<UserPen size={13} />}>
              {mockAuthors.map((author, index) => (
                <AuthorResult
                  key={index}
                  authorName={author.authorName}
                  follewers={author.follewers}
                  authorId={"authorId"}
                ></AuthorResult>
              ))}
            </SearchSection>
          )}

          {mockTags && mockTags.length > 0 && (
            <SearchSection name="Tags" icon={<Tag size={13} />}>
              <div className="flex flex-wrap gap-2 py-2">
                {mockTags.map((tag, index) => (
                  <TagResult key={index} tagName={tag.tagName}></TagResult>
                ))}
              </div>
            </SearchSection>
          )}

          <SearchSection>
            <button
              onClick={() => {
                const encodedQuery = encodeURIComponent(query);
                router.push(`/search?query=${encodedQuery}`);
              }}
              className="group w-full rounded hover:bg-muted"
            >
              <p className="w-full py-1 text-center text-sm">
                See more results
              </p>
            </button>
          </SearchSection>
        </SearchResults>
      )}
    </div>
  );
};

const SearchResults = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="absolute top-10 z-10 w-full rounded border bg-background px-3 py-2 shadow-sm md:min-w-[450px]">
      {children}
    </div>
  );
};

const SearchSection = ({
  icon,
  children,
  name,
}: {
  icon?: React.ReactNode;
  children?: ReactNode;
  name?: string;
}) => {
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
  authorId,
  authorName,
  follewers,
  avatarUrl,
}: {
  authorId: string;
  authorName: string;
  follewers: number;
  avatarUrl?: string;
}) => (
  <Link
    className="flex cursor-pointer justify-between p-1 hover:bg-muted"
    href={`/profile/${authorId}`}
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

const TagResult = ({ tagName }: { tagName: string }) => {
  return (
    <Badge
      variant="outline"
      className="min-w-10 cursor-pointer bg-white px-3 py-1 hover:bg-gray-100 dark:text-black"
    >
      {tagName}
    </Badge>
  );
};
