"use client";

import { useEditor } from "@tiptap/react";
import type { AnyExtension, Editor, EditorOptions } from "@tiptap/core";

import { ExtensionKit } from "@/extensions/extension-kit";
import { initialContent } from "@/lib/editor/data/initialContent";
import { useCallback, useEffect, useRef, useState } from "react";
import debounce from "lodash/debounce";
import { useDraft } from "../apis/useDraft";
import { usePost } from "../apis/usePost";
import { useAuthContext } from "@/context/AuthContext";
import { useDebounce } from "use-debounce";

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

  const saveContent = useCallback(
    debounce(async (editor: Editor) => {
      if (!id) return;
      const { from, to } = editor.state.selection;

      setIsSaving(true);

      const jsonContent = editor.getJSON();
      const json = JSON.stringify(jsonContent);

      try {
        updateContent({ id, data: { content: json, authorId: user?.id } });

        const newFrom = Math.min(from, editor.state.doc.content.size);
        const newTo = Math.min(to, editor.state.doc.content.size);

        editor.commands.setTextSelection({ from: newFrom, to: newTo });
      } catch (error) {
        console.error("Failed to save content:", error);
      } finally {
        setIsSaving(false);
      }
    }, 3000),
    [id, updateContent, user, setIsSaving],
  );

  return { editor, isSaving };
};
