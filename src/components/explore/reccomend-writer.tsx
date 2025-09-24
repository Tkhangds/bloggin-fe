"use client";

import { useAuthContext } from "@/context/AuthContext";
import { useUser } from "@/hooks/apis/useUser";
import Link from "next/link";
import { AuthorResultCard } from "../search/author-result-card";
import { Skeleton } from "../ui/skeleton";

export function RecommendedWriters({ tag }: { tag?: string }): JSX.Element {
  const { user } = useAuthContext();
  const { data, isLoading } = useUser().useGetUser({ tag: tag });
  const filteredData = data?.filter((writer) => {
    return writer.id !== user?.id;
  });

  console.log("writter got topics:", tag);

  return (
    <div className="mb-12 w-full">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Who to follow</h2>
        <Link
          href="/discover/writers"
          className="text-sm text-muted-foreground hover:underline"
        >
          See all
        </Link>
      </div>

      <div className="grid w-full gap-y-4 overflow-x-auto sm:flex sm:gap-x-4">
        {isLoading &&
          Array.from({ length: 3 }).map((_, index) => (
            <WriterCardSkeleton key={index} />
          ))}
        {!isLoading &&
          filteredData &&
          filteredData.map((writer) => (
            <AuthorResultCard key={writer.id} writer={writer} />
          ))}
      </div>
    </div>
  );
}

function WriterCardSkeleton() {
  return (
    <div className="border-muted-backgound flex flex-col justify-between gap-2 rounded-lg border p-6 sm:h-56 sm:w-60">
      <div>
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center space-x-3">
            {/* Avatar skeleton */}
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              {/* Name skeleton */}
              <Skeleton className="h-4 w-24" />
              {/* Username skeleton */}
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
          {/* Mobile follow button skeleton */}
          <Skeleton className="h-8 w-16 sm:hidden" />
        </div>
        {/* Bio skeleton - fixed height */}
        <div className="mb-4 min-h-[40px] space-y-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-3/4" />
        </div>
      </div>
      {/* Desktop follow button skeleton */}
      <Skeleton className="hidden h-9 w-full sm:block" />
    </div>
  );
}
