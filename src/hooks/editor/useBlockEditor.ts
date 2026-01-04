"use client";

import type { AnyExtension, Editor, EditorOptions } from "@tiptap/core";
import { useEditor } from "@tiptap/react";
import * as Y from "yjs";
import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { Socket } from "socket.io-client";

import { useAuthContext } from "@/context/AuthContext";
import { ExtensionKit } from "@/extensions/extension-kit";
import getTemplate from "@/utils/getTemplate";
import debounce from "lodash/debounce";
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
  templateName,
  enableCollaboration = false,
  collaborationYdoc,
  collaborationProvider,
  collaborationSocket,
  ...editorOptions
}: {
  id: string | undefined;
  mode: string;
  templateName?: string;
  enableCollaboration?: boolean;
  collaborationYdoc?: Y.Doc;
  collaborationProvider?: any;
  collaborationSocket?: Socket;
} & Partial<
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
  const saveCountRef = useRef(0);

  // Memoize extensions to prevent recreating them on every render
  const extensions = useMemo(() => {
    const exts = ExtensionKit({
      provider: collaborationProvider,
      ydoc: enableCollaboration ? collaborationYdoc : undefined
    });
    console.log("🎯 Creating extensions array", {
      hasYdoc: !!collaborationYdoc,
      enableCollaboration,
      extensionCount: exts.length
    });
    return [...exts].filter((e): e is AnyExtension => e !== undefined);
  }, [enableCollaboration, collaborationSocket, collaborationYdoc]);

  const editor = useEditor(
    {
      ...editorOptions,
      immediatelyRender: false,
      // Allow re-renders on transaction for collaboration sync
      shouldRerenderOnTransaction: enableCollaboration,
      autofocus: true,
      content: enableCollaboration ? undefined : (contentData
        ? JSON.parse(contentData.content)
        : getTemplate(templateName || "")),
      onCreate: ({ editor }) => {
        if (enableCollaboration && collaborationYdoc) {
          console.log("✅ Editor created with Yjs collaboration", {
            hasYdoc: !!collaborationYdoc,
            ydocClientId: collaborationYdoc?.clientID,
            extensionCount: editor.extensionManager.extensions.length
          });

          // Debug: Log all transactions to see if remote updates trigger them
          const originalDispatch = editor.view.dispatch.bind(editor.view);
          editor.view.dispatch = (tr) => {
            console.log("🔄 Transaction dispatched:", {
              docChanged: tr.docChanged,
              steps: tr.steps.length,
              meta: Object.keys((tr as any).meta || {}),
              isRemote: tr.getMeta('y-sync$') !== undefined
            });
            return originalDispatch(tr);
          };
        }
      },
      onUpdate: ({ editor }) => {
        if (enableCollaboration) {
          console.log("✏️ Editor updated (collaboration mode)");
          // Yjs Collaboration extension handles sync automatically
          // We also save to DB for backup and to trigger the "Saving..." UI state
          saveContent(editor);
        } else {
          saveContent(editor);
        }
      },
      extensions,
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
    [extensions],
  );

  useEffect(() => {
    console.log("Editor initialized:", contentData);
    console.log("template name", templateName);
    // Only set content from database when NOT in collaboration mode
    // In collaboration mode, the Yjs document is the source of truth
    if (!enableCollaboration && editor && contentData && contentData.content) {
      const parsedContent = JSON.parse(contentData.content);

      if (editor.getJSON() !== parsedContent) {
        editor.commands.setContent(parsedContent);
      }
    }
  }, [editor, contentData, enableCollaboration]);

  if (typeof window !== "undefined") {
    window.editor = editor;
  }

  useEffect(() => {
    // Only set content from database when NOT in collaboration mode
    // In collaboration mode, the Yjs document is the source of truth
    if (!enableCollaboration && editor?.isEmpty && contentData?.content) {
      const parsedContent = JSON.parse(contentData.content);
      editor.commands.setContent(parsedContent);
    }
  }, [contentData, editor, enableCollaboration]);

  const debouncedSave = useCallback(
    debounce(
      async (editor: Editor, contentId: string, userId: string | undefined, currentSaveCount: number) => {
        const jsonContent = editor.getJSON();
        const json = JSON.stringify(jsonContent);

        try {
          await updateContent({
            id: contentId,
            data: { content: json, authorId: userId },
          });
        } catch (error) {
          console.error("Failed to save content:", error);
        } finally {
          // Only turn off saving if this is still the latest save request
          if (saveCountRef.current === currentSaveCount) {
            setIsSaving(false);
          }
        }
      },
      2000,
    ),
    [updateContent],
  );

  const saveContent = useCallback(
    (editor: Editor) => {
      if (!id) return;

      setIsSaving(true);
      // Increment save count to track this new request
      saveCountRef.current += 1;
      const currentCount = saveCountRef.current;

      debouncedSave(editor, id, user?.id, currentCount);
    },
    [id, user?.id, debouncedSave],
  );

  useEffect(() => {
    return () => {
      debouncedSave.cancel();
    };
  }, [debouncedSave]);

  return {
    editor,
    isSaving,
    contentData,
  };
};
