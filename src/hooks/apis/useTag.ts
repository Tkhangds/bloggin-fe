"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import tagAction from "@/apis/tag.action";

export const useTag = () => {
  const queryClient = useQueryClient();
  // const useGetAllTags = (name?: string, page?: number, limit?: number) => {
  const useGetAllTags = (name?: string) => {
    return useQuery({
      queryKey: ["tags", name],
      queryFn: async () => {
        return await tagAction.getAllTags(name);
      },
    });
  };

  return {
    queryClient,
    useGetAllTags,
  };
};
