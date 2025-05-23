"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useComment } from "@/hooks/apis/useComment";
import { Comment } from "@/types/comment";
import { Ellipsis, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface CommentActionProps {
  comment: Comment;
  onEditStart: () => void;
}

export default function CommentAction({
  comment,
  onEditStart,
}: CommentActionProps): JSX.Element {
  const { mutateAsync: deleteComment } = useComment(
    comment.postId,
  ).useDeleteCommentById();

  const handleEdit = () => {
    onEditStart();
  };

  const handleDelete = async () => {
    try {
      await deleteComment(comment.id);
    } catch (error) {
      console.error("Failed to delete comment:", error);
      toast.error("Failed to delete comment");
    }
  };

  return (
    <div className="space-y-4 border-neutral-500/10">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Ellipsis className="relative top-0 h-8 w-8 cursor-pointer rounded-[0.375rem] p-2 hover:bg-accent hover:text-accent-foreground"></Ellipsis>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="modal-open w-fit"
          align="end"
          forceMount
        >
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="w-full cursor-pointer"
              onClick={() => handleEdit()}
            >
              <Pencil className="mr-2 h-4 w-4" />
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="w-full cursor-pointer"
              onClick={() => handleDelete()}
            >
              <Trash2 className="mr-2 h-4 w-4 text-rose-500" />
              <span className="text-rose-500">Delete</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
