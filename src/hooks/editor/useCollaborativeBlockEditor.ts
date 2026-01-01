"use client";

import type { AnyExtension, Editor, EditorOptions } from "@tiptap/core";
import { useEditor } from "@tiptap/react";

import { useAuthContext } from "@/context/AuthContext";
import { ExtensionKit } from "@/extensions/extension-kit";
import getTemplate from "@/utils/getTemplate";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDraft } from "../apis/useDraft";
import { useCollaboration } from "../useCollaboration";

declare global {
  interface Window {
    editor: Editor | null;
  }
}

interface UseCollaborativeBlockEditorOptions {
  draftId: string;
  templateName?: string;
  enableCollaboration?: boolean;
  wsUrl?: string;
}

export const useCollaborativeBlockEditor = ({
  draftId,
  templateName,
  enableCollaboration = false,
  wsUrl,
  ...editorOptions
}: UseCollaborativeBlockEditorOptions &
  Partial<Omit<EditorOptions, "extensions">>) => {
  const { user } = useAuthContext();
  const { useGetDraftById } = useDraft();
  const { data: draftData } = useGetDraftById(draftId);

  const [isSaving, setIsSaving] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Track ydoc instance to prevent unnecessary editor recreation
  const ydocInstanceRef = useRef<any>(null);

  // Initialize collaboration if enabled
  const {
    ydoc,
    isConnected,
    isReady,
    activeUsers,
    error: collabError,
    saveDocument,
    isSaving: isCollabSaving,
  } = useCollaboration({
    docId: draftId,
    userId: user?.id,
    userInfo: user ? {
      name: user.displayName || "Anonymous",
      avatar: user.avatarUrl,
    } : undefined,
    enabled: enableCollaboration && !!user?.id,
    wsUrl,
  });

  // Track when we have a new ydoc instance
  const hasNewYdoc = ydoc && ydoc !== ydocInstanceRef.current;
  if (hasNewYdoc) {
    ydocInstanceRef.current = ydoc;
    console.log("📝 New ydoc instance detected", { clientId: ydoc.clientID });
  }

  // Build extensions - only rebuild when ydoc changes
  const extensions = useMemo((): AnyExtension[] => {
    const shouldUseYdoc = enableCollaboration && ydoc;
    
    console.log("🎯 Building extensions", {
      enableCollaboration,
      hasYdoc: !!ydoc,
      ydocClientId: ydoc?.clientID,
      shouldUseYdoc,
    });

    const exts = ExtensionKit({
      ydoc: shouldUseYdoc ? ydoc : undefined,
    });

    return exts.filter((e): e is AnyExtension => e !== undefined);
  }, [enableCollaboration, ydoc]);

  // Determine initial content for non-collaborative mode
  const initialContent = useMemo(() => {
    if (enableCollaboration) {
      return undefined; // Yjs handles content
    }
    
    if (draftData?.content) {
      try {
        return JSON.parse(draftData.content);
      } catch {
        return undefined;
      }
    }
    
    if (templateName) {
      return getTemplate(templateName);
    }
    
    return undefined;
  }, [enableCollaboration, draftData?.content, templateName]);

  // Create editor
  // Key insight: In collaboration mode, we MUST wait for ydoc before creating editor
  const shouldCreateEditor = !enableCollaboration || !!ydoc;
  
  const editor = useEditor(
    {
      ...editorOptions,
      immediatelyRender: false,
      shouldRerenderOnTransaction: false,
      autofocus: true,
      extensions,
      content: initialContent,
      onCreate: ({ editor }) => {
        console.log("✅ Editor created", {
          collaboration: enableCollaboration,
          hasYdoc: !!ydoc,
        });
      },
      onUpdate: ({ editor }) => {
        // In collaboration mode, updates are synced via Yjs
        // The useCollaboration hook handles sending updates to the server
        if (enableCollaboration) {
          console.log("📝 Editor updated (collaboration)");
        }
      },
      editorProps: {
        attributes: {
          autocomplete: "off",
          autocorrect: "off",
          autocapitalize: "off",
          class: "min-h-full",
        },
      },
    },
    // Only recreate when extensions change (which happens when ydoc changes)
    [shouldCreateEditor, extensions]
  );

  // Track initialization
  useEffect(() => {
    if (!editor) return;
    
    if (enableCollaboration) {
      if (isConnected && ydoc) {
        console.log("✅ Collaboration ready");
        setIsInitialized(true);
      }
    } else {
      setIsInitialized(true);
    }
  }, [editor, enableCollaboration, isConnected, ydoc]);

  // Debug: window.editor
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.editor = editor;
    }
  }, [editor]);

  return {
    editor,
    isSaving: enableCollaboration ? isCollabSaving : isSaving,
    isInitialized,
    isCollaborative: enableCollaboration,
    isConnected: enableCollaboration ? isConnected : false,
    activeUsers: enableCollaboration ? activeUsers : [],
    collabError,
    saveDocument: enableCollaboration ? saveDocument : undefined,
  };
};
