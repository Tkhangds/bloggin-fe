"use client";

import { useState, useCallback } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getCollaborators,
  addCollaborator,
  updateCollaboratorRole,
  removeCollaborator,
} from "@/apis/collaborator.action";
import type {
  Collaborator,
  AddCollaboratorRequest,
  UpdateCollaboratorRequest,
} from "@/types/collaborator";
import { toast } from "sonner";

interface UseCollaboratorManagementOptions {
  draftId: string;
  authorId?: string;
  enabled?: boolean;
}

interface UseCollaboratorManagementReturn {
  collaborators: Collaborator[];
  isLoading: boolean;
  error: Error | null;
  addCollaboratorMutation: {
    mutate: (data: AddCollaboratorRequest) => void;
    isPending: boolean;
  };
  updateRoleMutation: {
    mutate: (data: { collabId: string; role: "editor" | "viewer" }) => void;
    isPending: boolean;
  };
  removeCollaboratorMutation: {
    mutate: (collabId: string) => void;
    isPending: boolean;
  };
  refetch: () => void;
  isOwner: (userId: string) => boolean;
  currentUserRole: (userId: string) => "editor" | "viewer" | null;
}

const QUERY_KEY = "collaborators";

export function useCollaboratorManagement({
  draftId,
  authorId,
  enabled = true,
}: UseCollaboratorManagementOptions): UseCollaboratorManagementReturn {
  const queryClient = useQueryClient();

  // Fetch collaborators
  const {
    data: collaborators = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: [QUERY_KEY, draftId],
    queryFn: async () => await getCollaborators(draftId),
    enabled,
  });

  // Add collaborator mutation
  const addCollaboratorMutation = useMutation({
    mutationFn: (data: AddCollaboratorRequest) =>
      addCollaborator(draftId, data.email, data.role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, draftId] });
      toast.success("Collaborator added successfully");
      // Auto-enable collaboration when a collaborator is added and no preference exists
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(`collab-${draftId}`, "true");
          // Reload so the editor re-initializes with collaboration enabled
          window.location.reload();
        } catch (err) {
          console.error("Failed to auto-enable collaboration", err);
        }
      }
    },
    onError: (error: any) => {
      const message = error?.message || "Failed to add collaborator";
      toast.error(message);
    },
  });

  // Update role mutation
  const updateRoleMutation = useMutation({
    mutationFn: ({
      collabId,
      role,
    }: {
      collabId: string;
      role: "editor" | "viewer";
    }) => updateCollaboratorRole(draftId, collabId, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, draftId] });
      toast.success("Role updated successfully");
    },
    onError: (error: any) => {
      const message = error?.message || "Failed to update role";
      toast.error(message);
    },
  });

  // Remove collaborator mutation
  const removeCollaboratorMutation = useMutation({
    mutationFn: (collabId: string) => removeCollaborator(draftId, collabId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, draftId] });
      toast.success("Collaborator removed successfully");
    },
    onError: (error: any) => {
      const message = error?.message || "Failed to remove collaborator";
      toast.error(message);
    },
  });

  // Helper: Check if user is owner (owner is determined by authorId, not collaborator role)
  const isOwner = useCallback(
    (userId: string): boolean => {
      // Check if this user is the draft author
      return authorId ? userId === authorId : false;
    },
    [authorId],
  );

  // Helper: Get current user's collaborator role (returns null for owner since owner is not a collaborator)
  const currentUserRole = useCallback(
    (userId: string): "editor" | "viewer" | null => {
      const collab = collaborators.find((c) => c.userId === userId);
      return (collab?.role as "editor" | "viewer") || null;
    },
    [collaborators],
  );

  return {
    collaborators,
    isLoading,
    error: error as Error | null,
    addCollaboratorMutation: {
      mutate: addCollaboratorMutation.mutate,
      isPending: addCollaboratorMutation.isPending,
    },
    updateRoleMutation: {
      mutate: updateRoleMutation.mutate,
      isPending: updateRoleMutation.isPending,
    },
    removeCollaboratorMutation: {
      mutate: removeCollaboratorMutation.mutate,
      isPending: removeCollaboratorMutation.isPending,
    },
    refetch,
    isOwner,
    currentUserRole,
  };
}
