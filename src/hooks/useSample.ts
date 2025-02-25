"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import sampleAction from "../apis/sample.action";
import { Sample } from "@/types/sample";

export const useSample = () => {
  const queryClient = useQueryClient();

  const useGetAllSamples = (page?: number, limit?: number) => {
    return useQuery({
      queryKey: ["sample"],
      queryFn: () => {
        return sampleAction.getAllSample(page, limit);
      },
    });
  };

  const useUpdateSampleById = () => {
    return useMutation({
      mutationFn: ({ id, data }: { id: string; data: Sample }) => {
        return sampleAction.updateSampleById(id, data);
      },
      onSuccess: (_, variable) => {
        queryClient.invalidateQueries({ queryKey: ["sample", variable.id] });
      },
    });
  };

  return {
    queryClient,
    useGetAllSamples,
    useUpdateSampleById,
  };
};
