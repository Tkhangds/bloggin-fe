"use client";

import { EditorContent } from "@tiptap/react";
import React, { useRef, useState, useEffect } from "react";

import { LinkMenu } from "@/components/editor/menus";

import { useBlockEditor } from "@/hooks/editor/useBlockEditor";

import "@/styles/index.css";

import { Sidebar } from "@/components/editor/Sidebar";
import ImageBlockMenu from "@/extensions/ImageBlock/components/ImageBlockMenu";
import { ColumnsMenu } from "@/extensions/MultiColumn/menus";
import { TableColumnMenu, TableRowMenu } from "@/extensions/Table/menus";
import { EditorHeader } from "./components/EditorHeader";
import { TextMenu } from "../menus/TextMenu";
import { ContentItemMenu } from "../menus/ContentItemMenu";
import { useSidebar } from "@/hooks/editor/useSidebar";
import { useCollaboration } from "@/hooks/useCollaboration";
import { useAuthContext } from "@/context/AuthContext";
import { getCollaborators } from "@/apis/collaborator.action";

// Inner component that uses the editor - only rendered when collaboration is ready
const BlockEditorInner = ({
  id,
  mode,
  templateName,
  enableCollaboration,
  onToggleCollaboration,
  collaborationYdoc,
  collaborationProvider,
  collaborationSocket,
  isConnected,
}: {
  id: string | undefined;
  mode: string;
  templateName?: string;
  enableCollaboration: boolean;
  onToggleCollaboration: (enabled: boolean) => void;
  collaborationYdoc: any;
  collaborationProvider: any;
  collaborationSocket: any;
  isConnected: boolean;
}) => {
  const [isEditable, setIsEditable] = useState(true);
  const menuContainerRef = useRef(null);
  const rightSidebar = useSidebar();

  const { editor, isSaving, contentData } = useBlockEditor({
    id,
    mode: mode,
    templateName,
    enableCollaboration: mode === "draft" ? enableCollaboration : false,
    collaborationYdoc,
    collaborationProvider,
    collaborationSocket,
    onTransaction({ editor: currentEditor }) {
      setIsEditable(currentEditor.isEditable);
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="flex h-full" ref={menuContainerRef}>
      <div className="relative flex h-full flex-1 flex-col overflow-hidden">
        <EditorHeader
          mode={mode}
          isSaving={isSaving}
          editor={editor}
          isSidebarOpen={rightSidebar.isOpen}
          toggleSidebar={rightSidebar.toggle}
          draftId={mode === "draft" ? id : undefined}
          authorId={contentData?.authorId}
          enableCollaboration={enableCollaboration}
          onToggleCollaboration={onToggleCollaboration}
          isConnected={isConnected}
        />
        <EditorContent
          editor={editor}
          className="mt-16 flex-1 overflow-y-auto px-4 py-8 lg:px-0 lg:py-0"
        />
        <ContentItemMenu editor={editor} isEditable={isEditable} />
        <LinkMenu editor={editor} appendTo={menuContainerRef} />
        <TextMenu editor={editor} />
        <ColumnsMenu editor={editor} appendTo={menuContainerRef} />
        <TableRowMenu editor={editor} appendTo={menuContainerRef} />
        <TableColumnMenu editor={editor} appendTo={menuContainerRef} />
        <ImageBlockMenu editor={editor} appendTo={menuContainerRef} />
      </div>
      <Sidebar
        isOpen={rightSidebar.isOpen}
        onClose={rightSidebar.close}
        editor={editor}
      />
    </div>
  );
};

export const BlockEditor = ({
  id,
  mode,
  templateName,
}: {
  id: string | undefined;
  mode: string;
  templateName?: string;
}) => {
  const { user } = useAuthContext();
  const [isClient, setIsClient] = useState(false);
  const [enableCollaboration, setEnableCollaboration] = useState(false);

  // Handle client-side only initialization
  useEffect(() => {
    setIsClient(true);
    // Load collaboration preference from localStorage only on client
    if (id && mode === "draft") {
      const saved = localStorage.getItem(`collab-${id}`);
      if (saved !== null) {
        setEnableCollaboration(saved === "true");
      } else {
        // No saved preference — check whether the draft already has collaborators
        (async () => {
          try {
            const collaborators = await getCollaborators(id);
            if (collaborators && collaborators.length > 0) {
              setEnableCollaboration(true);
            } else {
              setEnableCollaboration(false);
            }
          } catch (err) {
            console.error("Failed to fetch collaborators", err);
            setEnableCollaboration(false);
          }
        })();
      }
    }
  }, [id, mode]);

  // Use collaboration hook at the top level
  const collaboration = useCollaboration({
    docId: id || "",
    userId: user?.id,
    userInfo: user ? {
      name: user.displayName,
      avatar: user.avatarUrl,
    } : undefined,
    enabled: isClient && enableCollaboration && mode === "draft" && !!id && !!user?.id,
  });

  // Save collaboration preference to localStorage
  React.useEffect(() => {
    if (isClient && id && mode === "draft") {
      localStorage.setItem(`collab-${id}`, String(enableCollaboration));
    }
  }, [enableCollaboration, id, mode, isClient]);

  const handleToggleCollaboration = (enabled: boolean) => {
    setEnableCollaboration(enabled);
    // Reload the page to reinitialize the editor with/without collaboration
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  // Show loading state during SSR or while client is initializing
  if (!isClient) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading editor...</p>
        </div>
      </div>
    );
  }

  // Show loading state while collaboration is initializing
  if (enableCollaboration && !collaboration.ydoc) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Initializing collaboration...</p>
        </div>
      </div>
    );
  }

  return (
    <BlockEditorInner
      id={id}
      mode={mode}
      templateName={templateName}
      enableCollaboration={enableCollaboration}
      onToggleCollaboration={handleToggleCollaboration}
      collaborationYdoc={collaboration.ydoc}
      collaborationSocket={collaboration.socket}
      collaborationProvider={collaboration.provider}
      isConnected={collaboration.isConnected}
    />
  );
};

export default BlockEditor;
