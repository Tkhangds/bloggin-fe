"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import postAction from "@/apis/post.action";
import { Post } from "@/types/post";

export const usePost = () => {
  const queryClient = useQueryClient();
  // const useGetAllPosts = (page?: number, limit?: number) => {
  const useGetAllPosts = () => {
    return useQuery({
      queryKey: ["post"],
      queryFn: () => {
        return postAction.getAllPost();
      },
    });
  };

  const useUpdatePostById = () => {
    return useMutation({
      mutationFn: ({ id, data }: { id: string; data: Post }) => {
        return postAction.updatePostById(id, data);
      },
      onSuccess: (_, variable) => {
        queryClient.invalidateQueries({ queryKey: ["sample", variable.id] });
      },
    });
  };

  const useCreatePost = () => {
    return useMutation({
      mutationFn: ({ data }: { data: Post }) => {
        return postAction.createPost(data);
      },
      onSuccess: (_, variable) => {
        queryClient.invalidateQueries({
          queryKey: ["sample", variable.data.id],
        });
      },
    });
  };

  // const useDeletePostById = () => {
  //   return useMutation({
  //     mutationFn: ({ id }: { id: string }) => {
  //       return postAction.deletePostById(id);
  //     },
  //     onSuccess: (_, variable) => {
  //       queryClient.invalidateQueries({ queryKey: ["sample", variable.id] });
  //     },
  //   });
  // };

  const useGetPostById = (id: string) => {
    return useQuery({
      queryKey: ["sample", id],
      queryFn: () => {
        return postAction.getPostById(id);
      },
    });
  };

  return {
    queryClient,
    useGetAllPosts,
    useUpdatePostById,
    useCreatePost,
    useGetPostById,
  };
};
