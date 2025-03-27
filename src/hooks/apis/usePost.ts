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

  const useGetAllPosts = (limit?: number) => {
    return useInfiniteQuery({
      queryKey: ["posts"],
      queryFn: ({ pageParam = 1 }) => postAction.getAllPost(pageParam, limit),
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
      onSuccess: (_, variable) => {
        queryClient.invalidateQueries({ queryKey: ["post", variable.id] });
        queryClient.invalidateQueries({ queryKey: ["post", "all"] });
        queryClient.invalidateQueries({ queryKey: ["post", "author"] });
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
          queryKey: ["post", result.id],
        });
        queryClient.invalidateQueries({
          queryKey: ["draft", variable.data.authorId],
        });
        queryClient.invalidateQueries({
          queryKey: ["post", "author"],
        });
        queryClient.invalidateQueries({
          queryKey: ["post", "all"],
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
        toast.success("Post deleted successfully");
        queryClient.invalidateQueries({ queryKey: ["post", id] });
        queryClient.invalidateQueries({
          queryKey: ["post", "author"],
        });
        queryClient.invalidateQueries({
          queryKey: ["post", "all"],
        });
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
    useDeletePostById,
  };
};
