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

interface CommentProps {
  comment: Comment;
  isAuthor?: boolean;
  onEditStart: () => void;
}

export default function CommentAction({
  comment,
  isAuthor,
  onEditStart,
}: CommentProps): JSX.Element {
  const { mutateAsync: deleteComment } = useComment(
    comment.postId,
  ).useDeleteCommentById();

  const handleEdit = () => {
    onEditStart();
  };

  const handleDelete = () => {
    deleteComment(comment.id);
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
