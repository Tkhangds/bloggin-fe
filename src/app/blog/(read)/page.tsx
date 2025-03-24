"use client";

import { useEffect, useRef } from "react";
import { usePost } from "@/hooks/apis/usePost";

import BlogCard from "@/components/blog/read/blog-card";
import BlogEndNotification from "@/components/blog/read/blog-end-notification";
import FullPageLoading from "@/components/loading/loading";
import TagRecommend from "@/components/blog/read/tag-recommend";
import WriterRecommend from "@/components/blog/read/writer-recommend";
import LoadBlogIndicator from "@/components/blog/read/load-blog-indicator";

export default function BlogBrowsing() {
  const {
    data: posts,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
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
              posts.pages.map((page) =>
                page.data.map((post, index) => (
                  <BlogCard key={post.id} post={post} index={index}></BlogCard>
                )),
              )}
            <LoadBlogIndicator ref={loaderRef} isLoading={isFetchingNextPage} />
          </div>
          {!hasNextPage && <BlogEndNotification></BlogEndNotification>}
        </div>

        {/* Sidebar */}
        <aside className="w-full space-y-8 md:sticky md:top-20 md:w-80 md:self-start lg:w-96">
          <WriterRecommend />
          <TagRecommend />
        </aside>
      </main>
    </div>
  );
}
