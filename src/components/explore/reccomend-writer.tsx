"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useAuthContext } from "@/context/AuthContext";
import { useUser } from "@/hooks/apis/useUser";
import { FollowButton } from "../shared/follow-button";
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
            // Writer Card
            <div
              key={writer.id}
              className="border-muted-backgound flex flex-col justify-between rounded-lg border p-6 sm:h-56 sm:w-60"
            >
              <>
                <div className="flex items-start justify-between gap-y-4">
                  <Link
                    href={`/profile/${writer.id}`}
                    className="flex items-center space-x-3"
                  >
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={writer.avatarUrl || "/placeholder.svg"}
                        alt={writer.displayName}
                      />
                      <AvatarFallback>
                        {writer.displayName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="truncate font-semibold text-primary">
                        {writer.displayName}
                      </h3>
                      <p className="text-sm text-gray-500">{writer.username}</p>
                    </div>
                  </Link>
                  <FollowButton
                    userId="1"
                    className="sm:hidden sm:size-0"
                  ></FollowButton>
                </div>
                <p className="mt-2 line-clamp-2 min-h-[40px] text-sm text-muted-foreground">
                  {writer.specialties ? writer.specialties : "N/A."}
                </p>
              </>

              <div className="hidden sm:block">
                <FollowButton
                  userId={writer.id}
                  alwaysShow={true}
                  className="h-9 w-full"
                />
              </div>
            </div>
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
