"use client";

import { useComment } from "@/hooks/apis/useComment";
import {
  CreateCommentDto,
  CreateCommentSchema,
} from "@/types/dtos/create-comment.dto";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Textarea } from "../../../editor/ui/Textarea";
import { Button } from "../../../ui/button";

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

  const queryClient = useComment(postId).queryClient;

  const { mutateAsync: createComment } = useComment(postId).useCreateComment();

  const onSubmitHandle = async (data: CreateCommentDto) => {
    await createComment({ data });
    queryClient.invalidateQueries({ queryKey: ["posts"] });
    setValue("content", "");
  };

  return (
    <div className="mb-8">
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
