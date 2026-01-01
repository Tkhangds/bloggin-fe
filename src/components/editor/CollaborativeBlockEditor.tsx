"use client";

import { EditorContent } from "@tiptap/react";
import React, { useRef, useState } from "react";

import { LinkMenu } from "@/components/editor/menus";

import "@/styles/index.css";

import { Sidebar } from "@/components/editor/Sidebar";
import ImageBlockMenu from "@/extensions/ImageBlock/components/ImageBlockMenu";
import { ColumnsMenu } from "@/extensions/MultiColumn/menus";
import { TableColumnMenu, TableRowMenu } from "@/extensions/Table/menus";
import { EditorHeader } from "./BlockEditor/components/EditorHeader";
import { TextMenu } from "./menus/TextMenu";
import { ContentItemMenu } from "./menus/ContentItemMenu";
import { useSidebar } from "@/hooks/editor/useSidebar";
import { useCollaborativeBlockEditor } from "@/hooks/editor/useCollaborativeBlockEditor";
import { useAuthContext } from "@/context/AuthContext";
import { ShareCollaborateDialog } from "../shared/ShareCollaborateDialog";
import { PresenceIndicator } from "../shared/PresenceIndicator";
import { ConnectionStatus } from "../shared/ConnectionStatus";
import { Badge } from "../ui/badge";

export const CollaborativeBlockEditor = ({
  draftId,
  templateName,
  wsUrl,
}: {
  draftId: string;
  templateName?: string;
  wsUrl?: string;
}) => {
  const { user } = useAuthContext();
  const [isEditable, setIsEditable] = useState(true);
  const [enableCollaboration, setEnableCollaboration] = useState(false);
  const menuContainerRef = useRef(null);
  const rightSidebar = useSidebar();

  const {
    editor,
    isSaving,
    isInitialized,
    isCollaborative,
    isConnected,
    activeUsers,
    collabError,
  } = useCollaborativeBlockEditor({
    draftId,
    templateName,
    enableCollaboration,
    wsUrl,
    onTransaction({ editor: currentEditor }) {
      setIsEditable(currentEditor.isEditable);
    },
  });

  // Show loading state while editor initializes
  if (!editor) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-muted-foreground">Loading editor...</div>
      </div>
    );
  }

  return (
    <div className="flex h-full" ref={menuContainerRef}>
      <div className="relative flex h-full flex-1 flex-col overflow-hidden">
        <EditorHeader
          mode="draft"
          isSaving={isSaving}
          editor={editor}
          isSidebarOpen={rightSidebar.isOpen}
          toggleSidebar={rightSidebar.toggle}
        />

        {/* Collaboration controls bar */}
        {user && (
          <div className="border-b px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isCollaborative && (
                <>
                  <ConnectionStatus isConnected={isConnected} />
                  <PresenceIndicator activeUsers={activeUsers} maxDisplay={3} />
                </>
              )}
            </div>

            <ShareCollaborateDialog
              draftId={draftId}
              currentUserId={user.id}
              isCollaborative={isCollaborative}
              isConnected={isConnected}
              activeUsers={activeUsers}
              onEnableCollaboration={() => setEnableCollaboration(true)}
              onDisableCollaboration={() => setEnableCollaboration(false)}
            />
          </div>
        )}

        {/* Error banner if collaboration fails */}
        {collabError && (
          <div className="bg-destructive/10 border-b border-destructive/20 px-4 py-2">
            <p className="text-sm text-destructive">
              Collaboration error: {collabError}
            </p>
          </div>
        )}

        {/* Debug info - remove in production */}
        {enableCollaboration && process.env.NODE_ENV === 'development' && (
          <div className="bg-muted/50 border-b px-4 py-1 text-xs font-mono">
            <span className={isConnected ? "text-green-600" : "text-red-600"}>
              {isConnected ? "● Connected" : "○ Disconnected"}
            </span>
            {" | "}
            <span>Users: {activeUsers.length}</span>
            {" | "}
            <span>Draft: {draftId.slice(0, 8)}...</span>
          </div>
        )}

        {/* Read-only banner for viewers */}
        {isCollaborative && !isEditable && (
          <div className="bg-muted border-b px-4 py-2">
            <div className="flex items-center gap-2">
              <Badge variant="outline">View Only</Badge>
              <p className="text-sm text-muted-foreground">
                You have view-only access to this draft
              </p>
            </div>
          </div>
        )}

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

export default CollaborativeBlockEditor;
