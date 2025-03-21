"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { useState } from "react";
import { Textarea } from "../editor/ui/Textarea";
import { Button } from "../ui/button";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateCommentDto,
  CreateCommentSchema,
} from "@/types/dtos/create-comment.dto";
import { useComment } from "@/hooks/apis/useComment";

export default function CommentForm({
  postId,
}: {
  postId: string;
}): JSX.Element {
  const form = useForm<CreateCommentDto>({
    mode: "onSubmit",
    resolver: zodResolver(CreateCommentSchema),
    defaultValues: {
      content: "",
      postId: postId,
    },
  });

  const {
    control,
    setValue,
    handleSubmit,
    formState: {},
  } = form;

  const { mutateAsync: createComment } = useComment(postId).useCreateComment();

  const onSubmitHandle = async (data: CreateCommentDto) => {
    await createComment({ data });
    setValue("content", "");
  };

  return (
    <div className="mb-8">
      <div className="mb-4 flex items-center gap-3">
        <Avatar className="h-10 w-10 rounded-full">
          <AvatarImage
            className="rounded-full"
            src={`https://api.dicebear.com/9.x/initials/svg?seed=LaKhangDo`}
            alt="Your avatar"
          />
          <AvatarFallback>YA</AvatarFallback>
        </Avatar>
        <span className="font-medium">Add a comment</span>
      </div>
      <form onSubmit={handleSubmit(onSubmitHandle)}>
        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <Textarea
              placeholder="Share your thoughts..."
              className="mb-3 min-h-24 px-4 py-3"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />

        <div className="flex justify-end">
          <Button type="submit">Post Comment</Button>
        </div>
      </form>
    </div>
  );
}
