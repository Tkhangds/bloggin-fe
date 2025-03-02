"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Bookmark, MessageCircle, Heart } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

export default function BlogCard({
  index,
  post,
}: {
  index: number;
  post: BlogPost;
}) {
  const router = useRouter();

  return (
    <article key={index} className="cursor-pointer border-b pb-8 last:border-0">
      <div onClick={() => router.push("/blog/" + post.id)}>
        <div className="mb-3 flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={post.author.avatar} alt={post.author.name} />
            <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{post.author.name}</span>
          <span className="text-sm text-gray-500">·</span>
          <span className="text-sm text-gray-500">{post.date}</span>
        </div>

        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex-1">
            <h2 className="mb-2 text-xl font-bold transition-colors hover:text-gray-700">
              {post.title}
            </h2>

            <p className="mb-3 line-clamp-3 text-gray-700">{post.excerpt}</p>

            <div className="mb-4 flex flex-wrap gap-2">
              {post.tags.map((tag, idx) => (
                <Badge
                  key={idx}
                  variant="secondary"
                  className="bg-gray-100 font-normal text-gray-700 hover:bg-gray-200"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-gray-500">
                  <Heart className="h-4 w-4" />
                  <span className="text-xs">{post.likes}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-500">
                  <MessageCircle className="h-4 w-4" />
                  <span className="text-xs">{post.comments}</span>
                </div>
                <span className="text-xs text-gray-500">
                  {post.readTime} min read
                </span>
              </div>

              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Bookmark className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {post.image && (
            <div className="relative h-48 overflow-hidden rounded-md md:h-32 md:w-1/3">
              <Image
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
