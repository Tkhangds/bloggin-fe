"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePost } from "@/hooks/apis/usePost";
import { Post } from "@/types/post";
import { formatDateFromISOString } from "@/utils/date-convert";
import firstSentenceJson from "@/utils/first-sentence-json";
import { Dot, MessageSquareWarning } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { twMerge } from "tailwind-merge";
import { PostMonitoringStatus } from "@/enums/post-monitoring-status.enum";

export function StoryList({ tag }: { tag?: string }): JSX.Element {
  const { data, isLoading, refetch } = usePost().useGetAllPosts(
    undefined,
    undefined,
    tag,
  );
  const stories = data?.pages[0].data;
  const [firstTwoStories, setFirstTwoStories] = useState<Post[]>();
  const [restOfStories, setRestOfStories] = useState<Post[]>();

  useEffect(() => {
    refetch();
  }, [tag]);

  useEffect(() => {
    if (data) {
      const firstTwo = stories?.slice(0, 2);
      const rest = stories?.slice(2);
      setFirstTwoStories(firstTwo);
      setRestOfStories(rest);
    }
  }, [stories]);

  console.log("stories got topics: ", tag);
  return (
    <div className="w-full">
      <h2 className="mb-6 text-2xl font-bold">Recommended stories</h2>
      {/* first two stories */}
      <div className="mb-10 grid gap-10 sm:mb-20 md:grid-cols-2">
        {isLoading &&
          Array.from({ length: 2 }).map((_, index) => (
            <StoryCardSkeleton key={index} />
          ))}
        {firstTwoStories &&
          firstTwoStories.map((story) => (
            <StoryCard
              key={story.id}
              id={story.id}
              title={story.title}
              excerpt={firstSentenceJson(story.content)}
              authorAvatar={story.author.avatarUrl}
              authorName={story.author.displayName}
              date={formatDateFromISOString(story.createdAt)}
              monitoringStatus={story.monitoringStatus}
            ></StoryCard>
          ))}
      </div>

      {/* rest of the stories */}
      <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
        {isLoading &&
          Array.from({ length: 3 }).map((_, index) => (
            <StoryCardSkeleton key={index} />
          ))}
        {restOfStories &&
          restOfStories.map((story) => (
            <StoryCard
              key={story.id}
              id={story.id}
              title={story.title}
              excerpt={firstSentenceJson(story.content)}
              authorAvatar={story.author.avatarUrl}
              authorName={story.author.displayName}
              date={formatDateFromISOString(story.createdAt)}
              monitoringStatus={story.monitoringStatus}
            ></StoryCard>
          ))}
      </div>
    </div>
  );
}

export const StoryCard = ({
  id,
  title,
  excerpt,
  authorAvatar,
  authorName,
  date,
  className,
  monitoringStatus,
}: {
  id: string;
  title: string;
  excerpt?: string;
  authorAvatar: string;
  authorName: string;
  date: string;
  monitoringStatus: PostMonitoringStatus;
  className?: string;
}) => {
  return (
    <Link
      href={`/blog/${id}`}
      className={twMerge("lg:grid-row-2 group grid gap-4", className)}
    >
      {/* image */}
      <div className="overflow-hidden rounded-lg">
        <Image
          src="https://placehold.co/600x400/png"
          alt={title}
          width={600}
          height={400}
          className="aspect-video h-full w-full object-cover"
        />
      </div>
      {/* author */}
      <div className="flex items-center text-sm">
        <Avatar className="mr-3 h-8 w-8">
          <AvatarImage
            src={authorAvatar || "/placeholder.svg"}
            alt={authorName}
          />
          <AvatarFallback>{authorName[0]}</AvatarFallback>
        </Avatar>
        <div className="flex items-center text-sm">
          <span className="font-medium">{authorName}</span>
          <Dot></Dot>
          <div className="text-gray-500">
            <span>{date}</span>
          </div>
        </div>
      </div>

      {/* title and excerpt */}
      <div className="flex flex-col justify-between">
        <div>
          <div className="mb-2 flex gap-2">
            <span className="text-xl font-bold leading-tight group-hover:text-gray-700">
              {title}
            </span>
            {monitoringStatus === PostMonitoringStatus.VIOLATED && (
              <MessageSquareWarning className="size-fit" color="#eab308" />
            )}
          </div>

          <p className="line-clamp-2 text-muted-foreground">{excerpt}</p>
        </div>
      </div>
    </Link>
  );
};

const StoryCardSkeleton = () => {
  return (
    <div className="group">
      <div className="lg:grid-row-2 grid gap-4">
        {/* image skeleton */}
        <div className="overflow-hidden rounded-lg">
          <Skeleton className="aspect-video h-full w-full" />
        </div>

        {/* author skeleton */}
        <div className="flex items-center text-sm">
          <Skeleton className="mr-3 h-8 w-8 rounded-full" />
          <div className="flex items-center gap-2 text-sm">
            <Skeleton className="h-4 w-20" />
            <div className="h-1 w-1 rounded-full bg-muted" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>

        {/* title and excerpt skeleton */}
        <div className="flex flex-col justify-between">
          <div>
            <div className="mb-2">
              <Skeleton className="mb-1 h-6 w-full" />
              <Skeleton className="h-6 w-3/4" />
            </div>
            <div className="space-y-1">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
