"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import postAction from "@/apis/post.action";
import { Post } from "@/types/post";
import { CreatePostDto } from "@/types/dtos/create-post.dto";

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
      mutationFn: async ({ data }: { data: CreatePostDto }) => {
        return await postAction.createPost(data);
      },
      onSuccess: (result, variable) => {
        queryClient.invalidateQueries({
          queryKey: ["sample", result.id],
        });
        queryClient.invalidateQueries({
          queryKey: ["draft", variable.data.authorId],
        });
        queryClient.invalidateQueries({
          queryKey: ["post", "author"],
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

  const useGetPostByAuthor = () => {
    return useQuery({
      queryKey: ["post", "author"],
      queryFn: () => {
        return postAction.getPostByAuthor();
      },
    });
  };

  return {
    queryClient,
    useGetAllPosts,
    useUpdatePostById,
    useCreatePost,
    useGetPostById,
    useGetPostByAuthor,
  };
};
