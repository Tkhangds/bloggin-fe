import z from "zod";

// Collaborator roles match backend CollaboratorRole enum
export const collaboratorRoleSchema = z.enum(["editor", "viewer"]);

export type CollaboratorRole = z.infer<typeof collaboratorRoleSchema>;

// User schema for collaborator response (subset of full user)
export const collaboratorUserSchema = z.object({
  id: z.string(),
  username: z.string(),
  displayName: z.string(),
  avatarUrl: z.string().optional(),
  email: z.string(),
});

export type CollaboratorUser = z.infer<typeof collaboratorUserSchema>;

export const collaboratorSchema = z.object({
  id: z.string(),
  draftId: z.string(),
  userId: z.string(),
  role: collaboratorRoleSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
  user: collaboratorUserSchema.optional(),
});

export type Collaborator = z.infer<typeof collaboratorSchema>;

export const addCollaboratorRequestSchema = z.object({
  email: z.string().email(),
  role: collaboratorRoleSchema,
});

export type AddCollaboratorRequest = z.infer<
  typeof addCollaboratorRequestSchema
>;

export const updateCollaboratorRequestSchema = z.object({
  role: collaboratorRoleSchema,
});

export type UpdateCollaboratorRequest = z.infer<
  typeof updateCollaboratorRequestSchema
>;

// WebSocket event types
export interface YjsUpdateEvent {
  update: string; // base64-encoded
  userId?: string; // optional sender userId
}

export interface AwarenessUpdateEvent {
  awareness: AwarenessState;
}

export interface AwarenessState {
  user?: {
    name: string;
    color: string;
    avatar?: string;
  };
  cursor?: {
    anchor: number;
    head: number;
  };
  selection?: {
    from: number;
    to: number;
  };
}

export interface SyncUpdateEvent {
  update: string; // base64-encoded
}

// WebSocket role includes "owner" which is computed at runtime (not stored)
export type WebSocketRole = "owner" | "editor" | "viewer";

export interface UserJoinedEvent {
  userId: string;
  role: WebSocketRole;
  socketId: string;
}

export interface UserLeftEvent {
  userId: string;
  socketId: string;
}

export interface CollaborationErrorEvent {
  message: string;
}

export interface ActiveUser {
  userId: string;
  role: WebSocketRole;
  socketId: string;
  user?: {
    id: string;
    displayName: string;
    avatarUrl?: string;
    username: string;
  };
}

export interface DraftContentResponse {
  draftId: string;
  yjsContent: string;
}

export interface SaveDraftContentRequest {
  content: string;
}

export interface SaveDraftContentResponse {
  message: string;
  data: DraftContentResponse;
}
