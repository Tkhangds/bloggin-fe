"use client";

import { useComment } from "@/hooks/apis/useComment";
import CommentItem from "./comment-item";
import { MessageSquare } from "lucide-react";
import CommentPagination from "./comment-pagination";
import { useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
export default function CommentsList({
  postId,
}: {
  postId: string;
}): JSX.Element {
  const [page, setPage] = useState<number>(1);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const { data: comments } = useComment(postId).useGetAllCommentsByPostId(
    page,
    5,
  );

  const { user } = useAuthContext();

  return (
    <div className="space-y-8">
      {comments?.data.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          isAuthor={user?.id === comment.authorId}
        />
      ))}

      {comments?.data.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed bg-muted/30 px-4 py-16 text-center">
          <div className="mb-4 rounded-full bg-primary/5 p-4">
            {<MessageSquare className="h-10 w-10 text-muted-foreground" />}
          </div>

          <h3 className="mb-2 text-lg font-medium">{"No comments yet"}</h3>

          <p className="mb-6 max-w-md text-muted-foreground">
            Be the first to share your thoughts on this post. Your insights and
            opinions matter to our community!
          </p>
        </div>
      )}

      {comments?.data.length !== 0 && (
        <CommentPagination
          totalPages={comments?.meta.totalPages ?? 0}
          initialPage={1}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
