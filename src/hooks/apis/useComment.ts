"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import commentAction from "@/apis/comment.action";
import { UpdateCommentDto } from "@/types/dtos/update-comment.dto";
import { CreateCommentDto } from "@/types/dtos/create-comment.dto";

export const useComment = (postId: string) => {
  const queryClient = useQueryClient();

  const useGetAllCommentsByPostId = () => {
    return useQuery({
      queryKey: ["comment", postId],
      queryFn: () => {
        return commentAction.getAllCommentByPostId(postId);
      },
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
