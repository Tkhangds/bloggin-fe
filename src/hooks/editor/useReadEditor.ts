"use client";

import type { AnyExtension, Editor, EditorOptions } from "@tiptap/core";
import { useEditor } from "@tiptap/react";

import { ExtensionKit } from "@/extensions/extension-kit";
import { initialContent } from "@/lib/editor/data/initialContent";
import { useEffect } from "react";

declare global {
  interface Window {
    editor: Editor | null;
  }
}

export const useReadEditor = ({
  content,
  ...editorOptions
}: { content: string } & Partial<Omit<EditorOptions, "extensions">>) => {
  const editor = useEditor(
    {
      ...editorOptions,
      immediatelyRender: false,
      shouldRerenderOnTransaction: false,
      autofocus: true,
      content: content ? JSON.parse(content) : initialContent,
      extensions: [...ExtensionKit({})].filter(
        (e): e is AnyExtension => e !== undefined,
      ),
      editorProps: {
        attributes: {
          autocomplete: "off",
          autocorrect: "off",
          autocapitalize: "off",
          class: "min-h-full",
        },
        editable: () => false,
      },
    },
    [],
  );

  useEffect(() => {
    if (editor && content && content) {
      const parsedContent = JSON.parse(content);

      if (editor.getJSON() !== parsedContent) {
        editor.commands.setContent(parsedContent);
      }
    }
  }, [editor, content]);

  if (typeof window !== "undefined") {
    window.editor = editor;
  }

  return { editor };
};
