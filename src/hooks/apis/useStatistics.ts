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
  return {
    useGetTopFollowedUser,
    useGetTopTag,
  };
};
