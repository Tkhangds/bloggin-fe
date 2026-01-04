"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as Y from "yjs";
import { io, Socket } from "socket.io-client";
import * as AwarenessProtocol from "y-protocols/awareness";
import type {
  ActiveUser,
  CollaborationErrorEvent,
  SyncUpdateEvent,
  UserJoinedEvent,
  UserLeftEvent,
  YjsUpdateEvent,
} from "@/types/collaborator";
import { saveDraftContent } from "@/apis/collaborator.action";
import { toast } from "sonner";

interface UseCollaborationOptions {
  docId: string;
  userId?: string;
  userInfo?: {
    name: string;
    avatar?: string;
    color?: string; // Add color support
  };
  enabled?: boolean;
  wsUrl?: string;
}

export interface UseCollaborationReturn {
  ydoc: Y.Doc | null;
  provider: any | null; // Mock provider with awareness
  socket: Socket | null;
  isConnected: boolean;
  isReady: boolean;
  activeUsers: ActiveUser[];
  error: string | null;
  saveDocument: () => Promise<void>;
  isSaving: boolean;
}

const getRandomColor = () => {
  const colors = [
    "#958DF1", "#F98181", "#FBBC88", "#FAF594", "#70CFF8", "#94FADB", "#B9F18D",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

/**
 * Custom hook for collaborative editing with Yjs and Socket.IO
 */
export function useCollaboration({
  docId,
  userId,
  userInfo,
  enabled = true,
  wsUrl,
}: UseCollaborationOptions): UseCollaborationReturn {
  const [ydoc, setYdoc] = useState<Y.Doc | null>(null);
  const [provider, setProvider] = useState<any>(null); // Mock provider
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [activeUsers, setActiveUsers] = useState<ActiveUser[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const awarenessRef = useRef<AwarenessProtocol.Awareness | null>(null);

  // Serialize userInfo to prevent unnecessary re-renders
  const userInfoStr = userInfo ? JSON.stringify(userInfo) : undefined;

  // Manual save function
  const saveDocument = useCallback(async () => {
    if (!ydoc || !docId) return;

    setIsSaving(true);
    try {
      const state = Y.encodeStateAsUpdate(ydoc);
      await saveDraftContent(docId, state);
      toast.success("Document saved successfully");
    } catch (err) {
      console.error("Failed to save document:", err);
      toast.error("Failed to save document");
      throw err;
    } finally {
      setIsSaving(false);
    }
  }, [docId, ydoc]);

  useEffect(() => {
    // Reset states when disabled or missing required params
    if (!enabled || !docId || !userId) {
      setYdoc(null);
      setProvider(null);
      if (awarenessRef.current) awarenessRef.current.destroy();
      setSocket(null);
      setIsConnected(false);
      setIsReady(false);
      setActiveUsers([]);
      setError(null);
      return;
    }

    console.log("🚀 Initializing collaboration for draft:", docId);
    let isMounted = true;
    let cleanupDone = false;

    // Create Yjs document
    const newYdoc = new Y.Doc();
    // Create Awareness instance
    const awareness = new AwarenessProtocol.Awareness(newYdoc);
    awarenessRef.current = awareness;

    // Set local user state
    awareness.setLocalStateField("user", {
      name: userInfo?.name || "Anonymous",
      color: userInfo?.color || getRandomColor(),
      avatar: userInfo?.avatar,
      id: userId,
    });

    console.log("🔧 Created Yjs document & Awareness", { clientId: newYdoc.clientID });

    // Create socket connection
    const socketUrl = wsUrl || process.env.NEXT_PUBLIC_WS_URL || "http://localhost:8080/collaboration";
    console.log("🔌 Connecting to:", socketUrl);

    const newSocket = io(socketUrl, {
      auth: {
        userId,
        userInfo: userInfoStr,
      },
      query: { draftId: docId },
      transports: ['websocket', 'polling'],
    });

    // Set state immediately so editor can use ydoc
    setYdoc(newYdoc);
    setSocket(newSocket);

    // Create a mock provider object that ExtensionKit expects
    // We only need to expose 'awareness' for the cursor extension
    setProvider({
      awareness,
      document: newYdoc,
    });

    // Yjs update handler - send local changes to server
    const yjsUpdateHandler = (update: Uint8Array, origin: any) => {
      // Skip updates from remote (server)
      if (origin === 'remote' || origin === newSocket) {
        return;
      }

      if (!newSocket.connected) {
        return;
      }

      const base64Update = btoa(String.fromCharCode(...Array.from(update)));
      newSocket.emit("yjs-update", { update: base64Update });
    };

    newYdoc.on("update", yjsUpdateHandler);

    // Awareness update handler - send local awareness changes to server
    const awarenessUpdateHandler = ({ added, updated, removed }: any, origin: any) => {
      // Skip updates from remote
      if (origin === 'remote') return;

      const changedClients = added.concat(updated).concat(removed);
      const update = AwarenessProtocol.encodeAwarenessUpdate(awareness, changedClients);
      const base64Update = btoa(String.fromCharCode(...Array.from(update)));

      if (newSocket.connected) {
        newSocket.emit("awareness-update", { awareness: base64Update });
      }
    };

    awareness.on('update', awarenessUpdateHandler);

    // Track if sync was received
    let syncReceived = false;

    // Socket event handlers
    newSocket.on("connect", () => {
      if (!isMounted) return;
      console.log("✅ Connected!", { socketId: newSocket.id });
      setIsConnected(true);
      setError(null);

      // Request initial document state
      newSocket.emit("request-sync");

      // Fallback: mark as ready if server doesn't send sync-update
      setTimeout(() => {
        if (isMounted && !syncReceived) {
          setIsReady(true);
        }
      }, 2000);
    });

    newSocket.on("connect_error", (err) => {
      if (!isMounted) return;
      console.error("❌ Connection error:", err.message);
      setError(`Connection failed: ${err.message}`);
      setIsConnected(false);
    });

    newSocket.on("disconnect", (reason) => {
      if (!isMounted) return;
      console.log("🔴 Disconnected:", reason);
      setIsConnected(false);
    });

    // Receive initial sync state
    newSocket.on("sync-update", ({ update }: SyncUpdateEvent) => {
      if (!isMounted) return;
      syncReceived = true;
      try {
        const bytes = Uint8Array.from(atob(update), c => c.charCodeAt(0));
        Y.applyUpdate(newYdoc, bytes, 'remote');
        setIsReady(true);
      } catch (err) {
        console.error("❌ Failed to apply sync:", err);
      }
    });

    // Receive incremental updates from other users
    newSocket.on("yjs-update", ({ update, userId: senderId }: YjsUpdateEvent) => {
      if (!isMounted) return;

      // Skip own updates if server echoes them back
      if (senderId === userId) {
        return;
      }

      try {
        const bytes = Uint8Array.from(atob(update), c => c.charCodeAt(0));
        Y.applyUpdate(newYdoc, bytes, 'remote');
      } catch (err) {
        console.error("❌ Failed to apply update:", err);
      }
    });

    // Receive awareness updates from other users
    newSocket.on("awareness-update", ({ awareness: updateBase64 }: { awareness: string }) => {
      if (!isMounted) return;
      try {
        const bytes = Uint8Array.from(atob(updateBase64), c => c.charCodeAt(0));
        AwarenessProtocol.applyAwarenessUpdate(awareness, bytes, 'remote');
      } catch (err) {
        console.error("❌ Failed to apply awareness update:", err);
      }
    });

    // Presence: receive active users list
    newSocket.on("active-users", (users: ActiveUser[]) => {
      if (!isMounted) return;
      setActiveUsers(users.filter(u => u.userId !== userId));
    });

    // Presence: user joined
    newSocket.on("user-joined", (data: UserJoinedEvent & { user?: ActiveUser['user'] }) => {
      if (!isMounted || data.userId === userId) return;
      setActiveUsers(prev => {
        if (prev.some(u => u.socketId === data.socketId)) return prev;
        return [...prev, {
          userId: data.userId,
          role: data.role,
          socketId: data.socketId,
          user: data.user,
        }];
      });
    });

    // Presence: user left
    newSocket.on("user-left", ({ socketId }: UserLeftEvent) => {
      if (!isMounted) return;
      setActiveUsers(prev => prev.filter(u => u.socketId !== socketId));
    });

    // Error from server
    newSocket.on("error", ({ message }: CollaborationErrorEvent) => {
      if (!isMounted) return;
      console.error("❌ Server error:", message);
      setError(message);
    });

    // Cleanup function
    return () => {
      if (cleanupDone) return;
      cleanupDone = true;
      isMounted = false;

      console.log("🧹 Cleaning up collaboration");
      newYdoc.off("update", yjsUpdateHandler);
      awareness.off("update", awarenessUpdateHandler);
      awareness.destroy();

      newSocket.removeAllListeners();
      newSocket.disconnect();
      newYdoc.destroy();

      setYdoc(null);
      setProvider(null);
      setSocket(null);
      setIsConnected(false);
      setIsReady(false);
    };
  }, [docId, userId, enabled, wsUrl, userInfoStr]);

  return {
    ydoc,
    provider,
    socket,
    isConnected,
    isReady,
    activeUsers,
    error,
    saveDocument,
    isSaving,
  };
}
