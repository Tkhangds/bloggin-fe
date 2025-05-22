"use client";
import { statisticsAction } from "@/apis/statistics.action";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useStatistics = () => {
  const queryClient = useQueryClient();

  const useGetTopFollowedUser = (top?: number) => {
    return useQuery({
      queryKey: ["statistics", "top-followed-user"],
      queryFn: () => statisticsAction.getTopFollowedUser(top),
    });
  };
  const useGetTopTag = (top?: number) => {
    return useQuery({
      queryKey: ["statistics", "top-tag"],
      queryFn: () => statisticsAction.getTopTag(top),
    });
  };
  return {
    useGetTopFollowedUser,
    useGetTopTag,
  };
};
