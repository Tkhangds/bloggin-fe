import { bloggingApi } from "@/lib/HttpClient";
import type {
  Collaborator,
  CollaboratorRole,
} from "@/types/collaborator";

/**
 * The backend may return either a raw array or a wrapped `{ data: [...] }` object
 * depending on the endpoint version. This helper normalises both shapes.
 */
function unwrapCollaborator(
  raw: SuccessResponseWrapper<Collaborator> | Collaborator,
): Collaborator {
  if ("data" in raw && raw.data !== undefined) {
    return (raw as SuccessResponseWrapper<Collaborator>).data;
  }
  return raw as Collaborator;
}

function unwrapCollaborators(
  raw: SuccessResponseWrapper<Collaborator[]> | Collaborator[],
): Collaborator[] {
  if (Array.isArray(raw)) {
    return raw;
  }
  return (raw as SuccessResponseWrapper<Collaborator[]>).data ?? [];
}

/**
 * Get list of all collaborators for a draft.
 */
export const getCollaborators = async (
  draftId: string,
): Promise<Collaborator[]> => {
  const response = await bloggingApi.get<
    SuccessResponseWrapper<Collaborator[]> | Collaborator[]
  >(`/drafts/${draftId}/collaborators`);

  return unwrapCollaborators(response.data);
};

/**
 * Add a new collaborator to the draft.
 * Only the draft owner can add collaborators.
 */
export const addCollaborator = async (
  draftId: string,
  email: string,
  role: CollaboratorRole,
): Promise<Collaborator> => {
  const response = await bloggingApi.post<
    SuccessResponseWrapper<Collaborator> | Collaborator
  >(`/drafts/${draftId}/collaborators`, { email, role });

  return unwrapCollaborator(response.data);
};

/**
 * Update a collaborator's role.
 * Only the draft owner can update roles.
 */
export const updateCollaboratorRole = async (
  draftId: string,
  collaboratorId: string,
  role: CollaboratorRole,
): Promise<Collaborator> => {
  const response = await bloggingApi.patch<
    SuccessResponseWrapper<Collaborator> | Collaborator
  >(`/drafts/${draftId}/collaborators/${collaboratorId}`, { role });

  return unwrapCollaborator(response.data);
};

/**
 * Remove a collaborator from the draft.
 * Only the draft owner can remove collaborators.
 */
export const removeCollaborator = async (
  draftId: string,
  collaboratorId: string,
): Promise<void> => {
  await bloggingApi.delete(
    `/drafts/${draftId}/collaborators/${collaboratorId}`,
  );
};

/**
 * Get the current Yjs document state for a draft.
 */
export const getDraftContent = async (draftId: string): Promise<Uint8Array> => {
  const response = await bloggingApi.get<
    SuccessResponseWrapper<{ content: number[] }>
  >(`/drafts/${draftId}/content`);
  return new Uint8Array(response.data.data.content);
};

/**
 * Save the current Yjs document state.
 * Only owner and editor can save (not viewers).
 */
export const saveDraftContent = async (
  draftId: string,
  content: Uint8Array,
): Promise<void> => {
  await bloggingApi.post(`/drafts/${draftId}/content`, {
    content: Array.from(content),
  });
};
