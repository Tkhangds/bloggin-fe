"use client";

import { usePost } from "@/hooks/apis/usePost";
import { Post } from "@/types/post";
import { formatDateFromISOString } from "@/utils/date-convert";
import firstSentenceJson from "@/utils/first-sentence-json";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { MessageSquareWarning } from "lucide-react";
import { PostMonitoringStatus } from "@/enums/post-monitoring-status.enum";

export default function PostItemCard({ post }: { post: Post }) {
  const router = useRouter();
  const { mutateAsync: deletePost } = usePost().useDeletePostById();

  const handleDeletePost = async (id: string) => {
    await deletePost(id);
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <CardTitle
            onClick={() => router.push(`/blog/${post.id}`)}
            className="cursor-pointer text-base"
          >
            {post.title}
          </CardTitle>

          {post.monitoringStatus === PostMonitoringStatus.VIOLATED && (
            <MessageSquareWarning size={20} color="#eab308" />
          )}
        </div>
        <CardDescription>
          Published on {formatDateFromISOString(post.createdAt)}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 p-4 pt-0">
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {firstSentenceJson(post.content)}
        </p>
      </CardContent>
      <div className="flex items-center justify-end border-t p-4">
        <div className="flex space-x-2">
          <Button
            variant="destructive_outline"
            size="sm"
            onClick={() => handleDeletePost(post.id)}
          >
            Delete
          </Button>
          <Button
            size="sm"
            onClick={() => router.push(`/blog/edit/${post.id}`)}
          >
            Edit
          </Button>
        </div>
      </div>
    </Card>
  );
}
