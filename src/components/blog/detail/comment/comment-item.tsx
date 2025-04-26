"use client";

import { Comment } from "@/types/comment";
import { timeAgo } from "@/utils/date-from-now";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import CommentAction from "./comment-action";
import { useState } from "react";
import { useComment } from "@/hooks/apis/useComment";
import { Button } from "@/components/ui/button";

interface CommentProps {
  comment: Comment;
  isAuthor?: boolean;
}

export default function CommentItem({
  comment,
  isAuthor,
}: CommentProps): JSX.Element {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);

  const { mutateAsync: updateComment } = useComment(
    comment.postId,
  ).useUpdateCommentById();

  const handleSaveEdit = async () => {
    try {
      await updateComment({
        id: comment.id,
        data: { content: editedContent },
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update comment:", error);
    }
  };

  const handleEditStart = () => {
    setIsEditing(true);
    setEditedContent(comment.content);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedContent(comment.content);
  };

  return (
    <div className="space-y-4 border-b-[1px] border-neutral-500/10">
      <div className="space-y-3">
        {/* Comment Header */}

        <div className="flex items-start justify-between">
          <div className="flex flex-1 items-center gap-3">
            <Avatar className="h-10 w-10 rounded-full">
              <AvatarImage
                className="rounded-full"
                src={`https://api.dicebear.com/9.x/initials/svg?seed=${comment.author.displayName}`}
                alt={comment.author.displayName}
              />
              <AvatarFallback>
                {comment.author.displayName?.charAt(0) ?? "N/A"}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{comment.author.displayName}</div>
              <div className="text-sm text-gray-500">
                {timeAgo(comment.createdAt)}
              </div>
            </div>
          </div>

          {isAuthor && (
            <CommentAction
              comment={comment}
              onEditStart={handleEditStart}
            ></CommentAction>
          )}
        </div>

        {/* Comment Content */}
        {isEditing ? (
          <div className="pl-13 space-y-2">
            <textarea
              className="w-full rounded-md border border-gray-300 p-2 text-gray-800 focus:border-blue-500 focus:outline-none"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              rows={3}
            />
            <div className="flex justify-end space-x-2">
              <Button variant="outline" size="sm" onClick={handleCancelEdit}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleSaveEdit}>
                Save
              </Button>
            </div>
          </div>
        ) : (
          <p className="pl-13 text-gray-800">{comment.content}</p>
        )}

        <div className="pl-13 flex h-3 items-center"></div>
      </div>
    </div>
  );
}
