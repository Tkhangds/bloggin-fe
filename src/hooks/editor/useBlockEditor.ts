"use client";

import type { AnyExtension, Editor, EditorOptions } from "@tiptap/core";
import { useEditor } from "@tiptap/react";

import { useAuthContext } from "@/context/AuthContext";
import { ExtensionKit } from "@/extensions/extension-kit";
import { initialContent } from "@/lib/editor/data/initialContent";
import debounce from "lodash/debounce";
import { useCallback, useEffect, useState } from "react";
import { useDraft } from "../apis/useDraft";
import { usePost } from "../apis/usePost";

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
  const { user } = useAuthContext();

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
        handleDOMEvents: {
          blur: () => {
            if (editor) {
              saveContent(editor);
            }
          },
        },
      },
    },
    [],
  );

  useEffect(() => {
    console.log("Editor initialized:", contentData);

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

  useEffect(() => {
    if (editor?.isEmpty && contentData?.content) {
      const parsedContent = JSON.parse(contentData.content);
      editor.commands.setContent(parsedContent);
    }
  }, [contentData, editor]);

  const debouncedSave = useCallback(
    debounce(
      async (editor: Editor, contentId: string, userId: string | undefined) => {
        const jsonContent = editor.getJSON();
        const json = JSON.stringify(jsonContent);

        try {
          updateContent({
            id: contentId,
            data: { content: json, authorId: userId },
          });
        } catch (error) {
          console.error("Failed to save content:", error);
        } finally {
          setIsSaving(false);
        }
      },
      3000,
    ),
    [updateContent],
  );

  const saveContent = useCallback(
    (editor: Editor) => {
      if (!id) return;

      setIsSaving(true);
      debouncedSave(editor, id, user?.id);
    },
    [id, user?.id, debouncedSave],
  );

  useEffect(() => {
    return () => {
      debouncedSave.cancel();
    };
  }, [debouncedSave]);

  return { editor, isSaving };
};
