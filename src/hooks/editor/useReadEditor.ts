"use client";

import type { AnyExtension, Editor, EditorOptions } from "@tiptap/core";
import { useEditor } from "@tiptap/react";

import { ExtensionKit } from "@/extensions/extension-kit";
import { initialContent } from "@/lib/editor/data/initialContent";
import { useEffect } from "react";
import { usePost } from "../apis/usePost";

declare global {
  interface Window {
    editor: Editor | null;
  }
}

export const useReadEditor = ({
  id,
  ...editorOptions
}: { id: string } & Partial<Omit<EditorOptions, "extensions">>) => {
  const { data, isPending } = usePost().useGetPostById(id);

  const editor = useEditor(
    {
      ...editorOptions,
      immediatelyRender: false,
      shouldRerenderOnTransaction: false,
      autofocus: true,
      content: data?.content ? JSON.parse(data.content) : initialContent,
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
    [data],
  );

  useEffect(() => {
    if (editor && data?.content) {
      const parsedContent = JSON.parse(data.content);
      editor.commands.setContent(parsedContent, false);
    }
  }, [editor, data?.content]);

  if (typeof window !== "undefined") {
    window.editor = editor;
  }

  return { editor, isLoading: isPending, post: data };
};
