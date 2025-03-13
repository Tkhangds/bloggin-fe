"use client";

import { useEditor } from "@tiptap/react";
import type { AnyExtension, Editor, EditorOptions } from "@tiptap/core";

import { ExtensionKit } from "@/extensions/extension-kit";
import { initialContent } from "@/lib/editor/data/initialContent";
import { useEffect, useState } from "react";
import debounce from "lodash/debounce";
import { useDraft } from "../apis/useDraft";

declare global {
  interface Window {
    editor: Editor | null;
  }
}

export const useBlockEditor = ({
  id,
  ...editorOptions
}: { id: string | undefined } & Partial<Omit<EditorOptions, "extensions">>) => {
  const { useGetDraftById, useUpdateDraftById } = useDraft();

  const { data: draft } = useGetDraftById(id || "");

  const saveContent = debounce((editor: Editor) => {
    const jsonContent = editor.getJSON();
    const json = JSON.stringify(jsonContent);
    if (!id) {
      return;
    }
    updateDraft({ id, data: { content: json } });

    setIsSaving(false);
  }, 3000);

  const { mutate: updateDraft } = useUpdateDraftById();

  const [isSaving, setIsSaving] = useState(false);

  const editor = useEditor(
    {
      ...editorOptions,
      immediatelyRender: false,
      shouldRerenderOnTransaction: false,
      autofocus: true,
      content: draft ? JSON.parse(draft.content) : initialContent,
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
    if (editor && draft && draft.content) {
      const parsedContent = JSON.parse(draft.content);

      if (editor.getJSON() !== parsedContent) {
        editor.commands.setContent(parsedContent);
      }
    }
  }, [editor, draft]);

  if (typeof window !== "undefined") {
    window.editor = editor;
  }

  return { editor, isSaving };
};
