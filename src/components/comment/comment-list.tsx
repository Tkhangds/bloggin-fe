"use client";

import { useComment } from "@/hooks/apis/useComment";
import CommentItem from "./comment-item";
import { Comment } from "@/types/comment";
export default function CommentsList({
  postId,
}: {
  postId: string;
}): JSX.Element {
  const { data: comments, isPending } =
    useComment(postId).useGetAllCommentsByPostId();

  // // Sample comments data
  // const comments: Comment[] = [
  //   {
  //     id: "123",
  //     authorId: "1",
  //     postId: "1",
  //     author: {
  //       displayName: "Sarah Johnson",
  //       id: "1",
  //       avatarUrl: "/placeholder.svg?height=40&width=40",
  //     },
  //     content:
  //       "This is such a great article! I've been struggling with useEffect cleanup for months, and this finally cleared things up for me.",
  //     createdAt: "2025-03-20T15:06:02.237Z",
  //     updatedAt: "2025-03-20T15:06:02.237Z",
  //   },
  //   {
  //     id: "1233",
  //     authorId: "1",
  //     postId: "1",
  //     author: {
  //       displayName: "Sarah Johnson",
  //       id: "1",
  //       avatarUrl: "/placeholder.svg?height=40&width=40",
  //     },
  //     content:
  //       "This is such a great article! I've been struggling with useEffect cleanup for months, and this finally cleared things up for me.",
  //     createdAt: "2025-03-20T15:06:02.237Z",
  //     updatedAt: "2025-03-20T15:06:02.237Z",
  //   },
  //   {
  //     id: "12333",
  //     authorId: "1",
  //     postId: "1",
  //     author: {
  //       displayName: "Sarah Johnson",
  //       id: "1",
  //       avatarUrl: "/placeholder.svg?height=40&width=40",
  //     },
  //     content:
  //       "This is such a great article! I've been struggling with useEffect cleanup for months, and this finally cleared things up for me.",
  //     createdAt: "2025-03-20T15:06:02.237Z",
  //     updatedAt: "2025-03-20T15:06:02.237Z",
  //   },
  // ];

  return (
    <div className="space-y-8">
      {comments?.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
