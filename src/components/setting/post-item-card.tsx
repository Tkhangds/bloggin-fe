"use client";

import { FileText } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Post } from "@/types/post";
import { formatDateFromISOString } from "@/utils/date-convert";
import firstSentenceJson from "@/utils/first-sentence-json";
import { useRouter } from "next/navigation";
import { usePost } from "@/hooks/apis/usePost";
import { toast } from "sonner";

export default function PostItemCard({ post }: { post: Post }) {
  const router = useRouter();
  const { mutateAsync: deletePost } = usePost().useDeletePostById();

  const handleDeletePost = async (id: string) => {
    await deletePost(id);
    toast.success("Post deleted successfully");
  };

  return (
    <Card>
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">{post.title}</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => router.push(`/blog/${post.id}`)}
          >
            <FileText className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription>
          Published on {formatDateFromISOString(post.createdAt)}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {firstSentenceJson(post.content)}
        </p>
      </CardContent>
      <div className="flex items-center justify-end border-t p-4">
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push(`/blog/edit/${post.id}`)}
          >
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => handleDeletePost(post.id)}
          >
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
}
