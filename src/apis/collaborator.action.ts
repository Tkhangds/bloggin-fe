import { bloggingApi } from "@/lib/HttpClient";
import type {
  Collaborator,
  CollaboratorRole,
} from "@/types/collaborator";

/**
 * Get list of all collaborators for a draft
 */
export const getCollaborators = async (
  draftId: string
): Promise<Collaborator[]> => {
  const response = await bloggingApi.get<SuccessResponseWrapper<Collaborator[]>>(
    `/drafts/${draftId}/collaborators`
  );

  console.log("Fetched collaborators:", response.data);

  // If response.data is an array (raw response), use it directly
  if (Array.isArray(response.data)) {
    return response.data;
  }

  // Otherwise, try to access nested data (if wrapped)
  // @ts-ignore - handling specific case where type differs from runtime
  return response.data.data ?? [];
};

/**
 * Add a new collaborator to the draft
 * Only the draft owner can add collaborators
 */
export const addCollaborator = async (
  draftId: string,
  email: string,
  role: CollaboratorRole
): Promise<Collaborator> => {
  const response = await bloggingApi.post<SuccessResponseWrapper<Collaborator>>(
    `/drafts/${draftId}/collaborators`,
    { email, role }
  );
  // @ts-ignore
  return response.data.data ?? response.data;
};

/**
 * Update a collaborator's role
 * Only the draft owner can update roles
 */
export const updateCollaboratorRole = async (
  draftId: string,
  collaboratorId: string,
  role: CollaboratorRole
): Promise<Collaborator> => {
  const response = await bloggingApi.patch<SuccessResponseWrapper<Collaborator>>(
    `/drafts/${draftId}/collaborators/${collaboratorId}`,
    { role }
  );
  // @ts-ignore
  return response.data.data ?? response.data;
};

/**
 * Remove a collaborator from the draft
 * Only the draft owner can remove collaborators
 */
export const removeCollaborator = async (
  draftId: string,
  collaboratorId: string
): Promise<void> => {
  await bloggingApi.delete(
    `/drafts/${draftId}/collaborators/${collaboratorId}`
  );
};

/**
 * Get the current Yjs document state for a draft
 */
export const getDraftContent = async (draftId: string): Promise<Uint8Array> => {
  const response = await bloggingApi.get<SuccessResponseWrapper<{ content: number[] }>>(
    `/drafts/${draftId}/content`
  );
  return new Uint8Array(response.data.data.content);
};

/**
 * Save the current Yjs document state
 * Only owner and editor can save (not viewers)
 */
export const saveDraftContent = async (
  draftId: string,
  content: Uint8Array
): Promise<void> => {
  await bloggingApi.post(
    `/drafts/${draftId}/content`,
    { content: Array.from(content) }
  );
};
