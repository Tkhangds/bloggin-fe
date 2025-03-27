import React, { forwardRef, HTMLProps } from "react";
import { Editor } from "@tiptap/core";

export interface EditorContentProps extends HTMLProps<HTMLDivElement> {
  editor: Editor | null;
}

export const ViewOnlyContent = forwardRef<HTMLDivElement, EditorContentProps>(
  ({ editor, ...props }, ref) => {
    if (!editor) return null;

    return (
      <div
        className="tiptap ProseMirror min-h-full"
        ref={ref}
        {...props}
        dangerouslySetInnerHTML={{ __html: editor.getHTML() }}
      />
    );
  },
);

ViewOnlyContent.displayName = "ViewOnlyContent";
