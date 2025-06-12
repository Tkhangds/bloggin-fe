"use client";
import { statisticsAction } from "@/apis/statistics.action";
import { useQuery } from "@tanstack/react-query";

export const useStatistics = () => {
  const useGetTopFollowedUser = (top?: number) => {
    return useQuery({
      queryKey: ["statistics", "top-followed-user"],
      queryFn: () => statisticsAction.getTopFollowedUser(top),
    });
  };
  const useGetTopTag = (top?: number) => {
    return useQuery({
      queryKey: ["statistics", "top-tag", top],
      queryFn: () => statisticsAction.getTopTag(top),
    });
  };

  const useGetOverallStatistics = () => {
    return useQuery({
      queryKey: ["statistics", "overall"],
      queryFn: () => statisticsAction.getTopOverall(),
    });
  };

  const useGetMonthlyUserRegistration = () => {
    return useQuery({
      queryKey: ["statistics", "resgistration"],
      queryFn: () => statisticsAction.getMonthlyUserRegistration(),
    });
  };

  const useGetMonthlyPostUpload = () => {
    return useQuery({
      queryKey: ["statistics", "post-upload"],
      queryFn: () => statisticsAction.getMonthlyPostUpload(),
    });
  };

  const useGetTagDistribution = () => {
    return useQuery({
      queryKey: ["statistics", "tag-distribution"],
      queryFn: () => statisticsAction.getTagDistribution(),
    });
  };

  const useGetTopInteractivePost = () => {
    return useQuery({
      queryKey: ["statistics", "top-interactive-post"],
      queryFn: () => statisticsAction.getTopInteractivePost(),
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
  };
};
