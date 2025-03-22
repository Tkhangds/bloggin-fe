"use client";

import CommentSection from "@/components/comment/comment-section";
import FullPageLoading from "@/components/loading/loading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import ExtensionKit from "@/extensions/extension-kit";
import { usePost } from "@/hooks/apis/usePost";
import { initialContent } from "@/lib/editor/data/initialContent";
import { formatDate } from "@/utils/date-convert";
import { generateHTML } from "@tiptap/html";
import { AnyExtension } from "@tiptap/react";
import { Heart, MessageCircle, Play, Share2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function BlogReadingPage() {
  const { useGetPostById } = usePost();
  const params = useParams<{ id: string }>();

  const { data, isPending } = useGetPostById(params.id);

  const html = generateHTML(
    initialContent,
    [...ExtensionKit({})].filter((e): e is AnyExtension => e !== undefined),
  );

  const [content, setContent] = useState<string>(html);

  useEffect(() => {
    if (data) {
      setContent(
        generateHTML(
          JSON.parse(data.content),
          [...ExtensionKit({})].filter(
            (e): e is AnyExtension => e !== undefined,
          ),
        ),
      );
    }
  }, [data]);

  if (isPending) {
    return <FullPageLoading text="We are preparing everything for you." />;
  }

  if (!data || isPending) {
    return <FullPageLoading text="We are preparing everything for you." />;
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 md:py-12">
      {/* Article Title */}
      <h1 className="mb-6 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl lg:text-5xl">
        {data?.title || "Article Title"}
      </h1>
      {/* Author Info */}
      <div className="mb-8 flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage
            src={`https://api.dicebear.com/9.x/initials/svg?seed=${data.author.displayName}`}
            alt="Author"
          />
          <AvatarFallback>N/A</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
          <div className="flex items-center gap-1">
            <span className="font-medium">{data.author.displayName}</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-2 font-medium text-green-600"
            >
              Follow
            </Button>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <span>3 min read</span>
            <span className="mx-1">·</span>
            <span>
              {data?.createdAt ? formatDate(data.createdAt) : "Nov 15, 2024"}
            </span>
          </div>
        </div>
      </div>
      {/* Engagement Metrics */}
      <div className="mb-8 flex items-center justify-between border-b border-gray-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <Heart className="mr-1 h-5 w-5" />
              <span>506</span>
            </Button>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <MessageCircle className="mr-1 h-5 w-5" />
              <span>{data.commentCount}</span>
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Play className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      {/* Comment Section */}
      <CommentSection postId={params.id} commentCount={data.commentCount} />
    </div>
  );
}
