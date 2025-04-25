import { forwardRef } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const ViewOnlyContent = forwardRef<HTMLDivElement, any>(
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
