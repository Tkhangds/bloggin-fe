"use client";

import { useEditor } from "@tiptap/react";
import type { AnyExtension, Editor, EditorOptions } from "@tiptap/core";

import { ExtensionKit } from "@/extensions/extension-kit";
import { initialContent } from "@/lib/editor/data/initialContent";
import { useEffect, useState } from "react";
import debounce from "lodash/debounce";
import { useDraft } from "../apis/useDraft";
import { usePost } from "../apis/usePost";
import { useAuthProvider } from "@/context/AuthContext";

declare global {
  interface Window {
    editor: Editor | null;
  }
}

export const useBlockEditor = ({
  id,
  mode,
  ...editorOptions
}: { id: string | undefined; mode: string } & Partial<
  Omit<EditorOptions, "extensions">
>) => {
  const { user } = useAuthProvider();

  const { useGetDraftById, useUpdateDraftById } = useDraft();
  const { useGetPostById, useUpdatePostById } = usePost();

  const getData = mode === "draft" ? useGetDraftById : useGetPostById;
  const updateData = mode === "draft" ? useUpdateDraftById : useUpdatePostById;

  const { data: contentData } = getData(id || "");
  const { mutate: updateContent } = updateData();

  const [isSaving, setIsSaving] = useState(false);

  const editor = useEditor(
    {
      ...editorOptions,
      immediatelyRender: false,
      shouldRerenderOnTransaction: false,
      autofocus: true,
      content: contentData ? JSON.parse(contentData.content) : initialContent,
      onUpdate: ({ editor }) => {
        setIsSaving(true);
        saveContent(editor);
      },
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
      },
    },
    [],
  );

  useEffect(() => {
    if (editor && contentData && contentData.content) {
      const parsedContent = JSON.parse(contentData.content);

      if (editor.getJSON() !== parsedContent) {
        editor.commands.setContent(parsedContent);
      }
    }
  }, [editor, contentData]);

  if (typeof window !== "undefined") {
    window.editor = editor;
  }

  const saveContent = debounce((editor: Editor) => {
    const jsonContent = editor.getJSON();
    const json = JSON.stringify(jsonContent);
    if (!id) {
      return;
    }
    updateContent({ id, data: { content: json, authorId: user?.id } });

    setIsSaving(false);
  }, 3000);

  return { editor, isSaving };
};
