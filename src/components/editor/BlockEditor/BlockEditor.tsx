"use client";

import { EditorContent } from "@tiptap/react";
import React, { useRef, useState } from "react";

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

export const BlockEditor = ({
  id,
  mode,
}: {
  id: string | undefined;
  mode: string;
}) => {
  const [isEditable, setIsEditable] = useState(true);
  const menuContainerRef = useRef(null);

  const rightSidebar = useSidebar();
  const { editor, isSaving } = useBlockEditor({
    id,
    mode: mode,
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
        />
        <EditorContent
          editor={editor}
          className="mt-4 flex-1 overflow-y-auto"
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

export default BlockEditor;
