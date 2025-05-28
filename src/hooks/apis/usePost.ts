"use client";

import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import postAction from "@/apis/post.action";
import { CreatePostDto } from "@/types/dtos/create-post.dto";
import { UpdatePostDto } from "@/types/dtos/update-post.dto";
import { toast } from "sonner";

export const usePost = () => {
  const queryClient = useQueryClient();

  const useGetAllPosts = (limit?: number, title?: string, tagName?: string) => {
    return useInfiniteQuery({
      queryKey: ["posts"],
      queryFn: ({ pageParam = 1 }) =>
        postAction.getAllPost(pageParam, limit, title, tagName),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        return lastPage.meta.nextPage ?? undefined;
      },
    });
  };

  const useUpdatePostById = () => {
    return useMutation({
      mutationFn: ({ id, data }: { id: string; data: UpdatePostDto }) => {
        return postAction.updatePostById(id, data);
      },
      onSuccess: (result, variable) => {
        queryClient.invalidateQueries({ queryKey: ["post", variable.id] });
        queryClient.invalidateQueries({ queryKey: ["posts"] });
        queryClient.invalidateQueries({
          queryKey: ["post", "author", result.data.data.authorId],
        });
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
          queryKey: ["draft", variable.data.authorId],
        });
        queryClient.invalidateQueries({
          queryKey: ["post", "author"],
        });
        queryClient.invalidateQueries({
          queryKey: ["posts"],
        });
        toast.success("Post created successfully");
      },
    });
  };

  const useDeletePostById = () => {
    return useMutation({
      mutationFn: async (id: string) => {
        return await postAction.deletePostById(id);
      },
      onSuccess: (_, id) => {
        queryClient.invalidateQueries({ queryKey: ["post", id] });
        queryClient.invalidateQueries({
          queryKey: ["post", "author"],
        });
        queryClient.invalidateQueries({
          queryKey: ["post", "all"],
        });
        toast.success("Post deleted successfully");
      },
    });
  };

  const useGetPostById = (id: string) => {
    return useQuery({
      queryKey: ["post", id],
      queryFn: () => {
        return postAction.getPostById(id);
      },
    });
  };

  const useGetPostByAuthor = (authorId: string) => {
    return useQuery({
      queryKey: ["post", "author", authorId],
      queryFn: () => {
        return postAction.getPostByAuthor(authorId);
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
    useDeletePostById,
  };
};
