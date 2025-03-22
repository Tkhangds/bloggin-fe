"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import BlogCard from "@/components/blog/blog-card";
import { usePost } from "@/hooks/apis/usePost";
import FullPageLoading from "@/components/loading/loading";
import BlogEndNotification from "@/components/blog/blog-end-notification";

export default function BlogBrowsing() {
  const {
    data: posts,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    status,
  } = usePost().useGetAllPosts();

  const loaderRef = useRef<HTMLDivElement>(null);

  //Infinite scroll implementation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 },
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [fetchNextPage, hasNextPage]);

  if (!posts) {
    return <FullPageLoading text="We are preparing everything for you." />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-white px-4 text-gray-900 sm:px-6 lg:px-20">
      {/* Main Content */}
      <main className="container flex flex-1 flex-col gap-8 py-6 md:flex-row md:py-8">
        {/* Blog Posts */}
        <div className="flex-1">
          <h1 className="mb-6 text-2xl font-bold">For You</h1>
          <div className="grid grid-cols-1 gap-8">
            {posts &&
              posts.pages.map((page, index) =>
                page.data.map((post, index) => (
                  <BlogCard key={post.id} post={post} index={index}></BlogCard>
                )),
              )}

            {/* Loader for infinite scroll */}
            <div ref={loaderRef} className="flex justify-center">
              {isFetchingNextPage && (
                <div className="flex items-center justify-center space-x-2">
                  <div
                    className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                    style={{ animationDelay: "150ms" }}
                  ></div>
                  <div
                    className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                </div>
              )}
            </div>
          </div>
          {!hasNextPage && <BlogEndNotification></BlogEndNotification>}
        </div>

        {/* Sidebar */}
        <aside className="w-full space-y-8 md:sticky md:top-20 md:w-80 md:self-start lg:w-96">
          {/* Recommended Writers */}
          <div className="rounded-lg bg-gray-50 p-6">
            <h2 className="mb-4 text-lg font-bold">Recommended Writers</h2>
            <div className="space-y-4">
              {recommendedWriters.map((writer, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={writer.avatar} alt={writer.name} />
                      <AvatarFallback>{writer.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{writer.name}</h3>
                      <p className="text-sm text-gray-500">{writer.bio}</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 rounded-full"
                  >
                    Follow
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Topics to Follow */}
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
        </aside>
      </main>
    </div>
  );
}

const recommendedWriters = [
  {
    name: "Jamie Rodriguez",
    bio: "Tech journalist & AI researcher",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Nora Kim",
    bio: "Bestselling author on productivity",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Marcus Lee",
    bio: "Climate scientist & educator",
    avatar: "/placeholder.svg?height=40&width=40",
  },
];

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
