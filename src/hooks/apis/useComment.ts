"use client";

import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import commentAction from "@/apis/comment.action";
import { UpdateCommentDto } from "@/types/dtos/update-comment.dto";
import { CreateCommentDto } from "@/types/dtos/create-comment.dto";
import { toast } from "sonner";

export const useComment = (postId: string) => {
  const queryClient = useQueryClient();

  const useGetAllCommentsByPostId = (page?: number, limit?: number) => {
    return useQuery({
      queryKey: ["comment", postId, page, limit],
      queryFn: () => {
        return commentAction.getAllCommentByPostId(postId, page, limit);
      },
      placeholderData: keepPreviousData,
    });
  };

  const useUpdateCommentById = () => {
    return useMutation({
      mutationFn: ({ id, data }: { id: string; data: UpdateCommentDto }) => {
        return commentAction.updateCommentById(id, data);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["comment", postId] });
      },
    });
  };

  const useCreateComment = () => {
    return useMutation({
      mutationFn: async ({ data }: { data: CreateCommentDto }) => {
        return await commentAction.createComment(data);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["comment", postId],
        });
        queryClient.invalidateQueries({
          queryKey: ["post", postId],
        });
        queryClient.invalidateQueries({
          queryKey: ["post", "all"],
        });
        toast.success("Comment created successfully");
      },
    });
  };

  const useDeleteCommentById = () => {
    return useMutation({
      mutationFn: async (id: string) => {
        return await commentAction.deleteCommentById(id);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["comment", postId],
        });
        toast.success("Comment deleted successfully");
      },
    });
  };

  return {
    queryClient,
    useUpdateCommentById,
    useCreateComment,
    useGetAllCommentsByPostId,
    useDeleteCommentById,
  };
};
