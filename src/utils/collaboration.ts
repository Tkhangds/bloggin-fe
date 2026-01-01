/**
 * Utility functions for collaborative editing
 */

import * as Y from "yjs";

/**
 * Convert Yjs document to base64 string for storage
 */
export function encodeYjsDocument(ydoc: Y.Doc): string {
  const state = Y.encodeStateAsUpdate(ydoc);
  return btoa(String.fromCharCode(...Array.from(new Uint8Array(state))));
}

/**
 * Convert base64 string to Yjs update
 */
export function decodeYjsUpdate(base64: string): Uint8Array {
  return Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
}

/**
 * Apply base64-encoded update to Yjs document
 */
export function applyBase64Update(ydoc: Y.Doc, base64Update: string): void {
  try {
    const update = decodeYjsUpdate(base64Update);
    Y.applyUpdate(ydoc, update);
  } catch (error) {
    console.error("Failed to apply Yjs update:", error);
    throw error;
  }
}

/**
 * Get user initials from display name
 */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Generate random color for user cursor
 */
export function generateUserColor(): string {
  const colors = [
    "#958DF1", // Purple
    "#F98181", // Red
    "#FBBC88", // Orange
    "#FAF594", // Yellow
    "#70CFF8", // Blue
    "#94FADB", // Teal
    "#B9F18D", // Green
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

/**
 * Format time from ISO string to relative time
 */
export function formatRelativeTime(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}

/**
 * Check if user has permission to perform action
 * Note: "owner" is determined by authorId, not stored as a collaborator role
 */
export function hasPermission(
  action: "view" | "edit" | "manage",
  role: "editor" | "viewer",
  isOwner: boolean = false
): boolean {
  // Owner has all permissions
  if (isOwner) {
    return true;
  }

  const permissions = {
    editor: ["view", "edit"],
    viewer: ["view"],
  };

  return permissions[role]?.includes(action) ?? false;
}

/**
 * Validate user ID format (UUID)
 */
export function isValidUserId(userId: string): boolean {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(userId);
}

/**
 * Get role badge color variant
 * Note: "owner" is a display role, determined by authorId comparison
 */
export function getRoleBadgeVariant(
  role: string,
  isOwner: boolean = false
): "default" | "secondary" | "outline" {
  if (isOwner) {
    return "default";
  }
  
  switch (role) {
    case "editor":
      return "secondary";
    case "viewer":
      return "outline";
    default:
      return "outline";
  }
}
