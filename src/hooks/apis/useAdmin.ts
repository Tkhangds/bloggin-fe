"use client";
import { adminAction } from "@/apis/admin.action";
import { PostMonitoringStatus } from "@/enums/post-monitoring-status.enum";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAdmin = () => {
  const queryClient = useQueryClient();

  const useGetTopFollowedUser = (top?: number) => {
    return useQuery({
      queryKey: ["statistics", "top-followed-user"],
      queryFn: () => adminAction.getTopFollowedUser(top),
    });
  };
  const useGetTopTag = (top?: number) => {
    return useQuery({
      queryKey: ["statistics", "top-tag", top],
      queryFn: () => adminAction.getTopTag(top),
    });
  };

  const useGetOverallStatistics = () => {
    return useQuery({
      queryKey: ["statistics", "overall"],
      queryFn: () => adminAction.getTopOverall(),
    });
  };

  const useGetMonthlyUserRegistration = () => {
    return useQuery({
      queryKey: ["statistics", "resgistration"],
      queryFn: () => adminAction.getMonthlyUserRegistration(),
    });
  };

  const useGetMonthlyPostUpload = () => {
    return useQuery({
      queryKey: ["statistics", "post-upload"],
      queryFn: () => adminAction.getMonthlyPostUpload(),
    });
  };

  const useGetTagDistribution = () => {
    return useQuery({
      queryKey: ["statistics", "tag-distribution"],
      queryFn: () => adminAction.getTagDistribution(),
    });
  };

  const useGetTopInteractivePost = () => {
    return useQuery({
      queryKey: ["statistics", "top-interactive-post"],
      queryFn: () => adminAction.getTopInteractivePost(),
    });
  };

  const useFlagPost = () => {
    return useMutation({
      mutationFn: (postId: string) => {
        return adminAction.flagPost(postId);
      },
      onSuccess: async (_, variable) => {
        queryClient.invalidateQueries({
          queryKey: ["admin", "posts", PostMonitoringStatus.VIOLATED],
        });
        queryClient.invalidateQueries({
          queryKey: [
            "admin",
            "posts",
            PostMonitoringStatus.POTENTIAL_VIOLATION,
          ],
        });
        queryClient.invalidateQueries({
          queryKey: ["post", variable],
        });
        toast.success("Post has been flagged as VIOLATED");
      },
      onError: async () => {
        toast.error("Failed to flag the post");
      },
    });
  };

  const useUnflagPost = () => {
    return useMutation({
      mutationFn: (postId: string) => {
        return adminAction.unflagPost(postId);
      },
      onSuccess: async (_, variable) => {
        queryClient.invalidateQueries({
          queryKey: ["admin", "posts", PostMonitoringStatus.VIOLATED],
        });
        queryClient.invalidateQueries({
          queryKey: [
            "admin",
            "posts",
            PostMonitoringStatus.POTENTIAL_VIOLATION,
          ],
        });
        queryClient.invalidateQueries({
          queryKey: ["post", variable],
        });
        toast.success("Post has been unflagged");
      },
      onError: async () => {
        toast.error("Failed to unflag the post");
      },
    });
  };

  const useGetPostByMonitoringStatus = (status: PostMonitoringStatus) => {
    return useQuery({
      queryKey: ["admin", "posts", status],
      queryFn: () => adminAction.getPostByMonitoruingStatus(status),
    });
  };
  return {
    useGetTopFollowedUser,
    useGetTopTag,
    useGetOverallStatistics,
    useGetMonthlyUserRegistration,
    useGetMonthlyPostUpload,
    useGetTagDistribution,
    useGetTopInteractivePost,
    useFlagPost,
    useUnflagPost,
    useGetPostByMonitoringStatus,
  };
};
