"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { PostMonitoringStatus } from "@/enums/post-monitoring-status.enum";
import { useFavorite } from "@/hooks/apis/useFavorite";
import { Post } from "@/types/post";
import { formatDateFromISOString } from "@/utils/date-convert";
import firstSentenceJson from "@/utils/first-sentence-json";
import { Heart, MessageCircle, MessageSquareWarning } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";

export default function BlogCard({
  index,
  post,
}: {
  index: number;
  post: Post;
}) {
  const router = useRouter();
  const { data, isLoading } = useFavorite().useGetFavoriteCount(post.id);
  return (
    <article key={index} className="border-b pb-8">
      <div className="cursor-pointer">
        <div
          className="group mb-3 flex items-center gap-2"
          onClick={() => router.push("/profile/" + post.authorId)}
        >
          <Avatar className="h-6 w-6">
            <AvatarImage src={post.author.avatarUrl} alt={"Avatar"} />
            <AvatarFallback>{post.author.displayName.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium group-hover:underline group-hover:underline-offset-4">
            {post.author.displayName}
          </span>
          <span className="text-sm text-gray-500">·</span>
          <span className="text-sm text-gray-500">
            {formatDateFromISOString(post.createdAt)}
          </span>
        </div>

        <div
          className="flex flex-col gap-4 md:flex-row"
          onClick={() => router.push("/blog/" + post.id)}
        >
          <div className="flex-1">
            <div className="mb-2 flex items-center gap-2">
              <p className="text-xl font-bold transition-colors hover:text-gray-700">
                {post.title}
              </p>
              {post.monitoringStatus === PostMonitoringStatus.VIOLATED && (
                <MessageSquareWarning size={20} color="#eab308" />
              )}
            </div>

            <p className="mb-3 line-clamp-3 text-gray-700">
              {firstSentenceJson(post.content)}
            </p>

            <div className="mb-4 flex flex-wrap gap-2">
              {post.tags &&
                post.tags.map((tag, idx) => (
                  <Badge
                    key={idx}
                    variant="secondary"
                    className="bg-gray-100 font-normal text-gray-700 hover:bg-gray-200"
                  >
                    {tag.name}
                  </Badge>
                ))}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div
                  className={twMerge(
                    "flex items-center gap-1",
                    !isLoading && data?.data.isFavorite
                      ? "font-semibold text-red-500"
                      : "text-gray-500",
                  )}
                >
                  <Heart className="h-4 w-4" />
                  {!isLoading && (
                    <span className="text-xs">{data?.data.count}</span>
                  )}
                </div>
                <div className="flex items-center gap-1 text-gray-500">
                  <MessageCircle className="h-4 w-4" />
                  <span className="text-xs">{post.commentCount ?? "2"}</span>
                </div>
                {/* <span className="text-xs text-gray-500">
                  {post.readTime} min read
                </span> */}
              </div>
            </div>
          </div>

          <div className="relative h-48 overflow-hidden rounded-md md:h-32 md:w-1/3">
            <Image
              src={post.thumbnailUrl ?? "https://placehold.co/600x400/png"}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </article>
  );
}
