"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import draftAction from "@/apis/draft.action";
import { UpdateDraftDto } from "@/types/dtos/update-draft.dto";
import { CreateDraftDto } from "@/types/dtos/create-draft.dto";
import { toast } from "sonner";

export const useDraft = () => {
  const queryClient = useQueryClient();

  const useGetAllDraftsByAuthorId = () => {
    return useQuery({
      queryKey: ["draft", "author"],
      queryFn: () => {
        return draftAction.getAllDraftByUserId();
      },
    });
  };

  const useUpdateDraftById = () => {
    return useMutation({
      mutationFn: ({ id, data }: { id: string; data: UpdateDraftDto }) => {
        return draftAction.updateDraftById(id, data);
      },
    });
  };

  const useCreateDraft = () => {
    return useMutation({
      mutationFn: async ({ data }: { data: CreateDraftDto }) => {
        return await draftAction.createDraft(data);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["draft", "author"],
        });
      },
    });
  };

  const useDeleteDraftById = () => {
    return useMutation({
      mutationFn: async (id: string) => {
        return await draftAction.deleteDraftById(id);
      },
      onSuccess: (_, id) => {
        queryClient.invalidateQueries({ queryKey: ["draft", id] });
        queryClient.invalidateQueries({
          queryKey: ["draft", "author"],
        });
        toast.success("Draft deleted successfully");
      },
    });
  };

  const useGetDraftById = (id: string) => {
    return useQuery({
      queryKey: ["draft", id],
      queryFn: () => {
        return draftAction.getDraftById(id);
      },
    });
  };

  return {
    queryClient,
    useUpdateDraftById,
    useCreateDraft,
    useGetDraftById,
    useDeleteDraftById,
    useGetAllDraftsByAuthorId,
  };
};
