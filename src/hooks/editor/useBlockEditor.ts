import { useEffect, useState } from "react";
import { useEditor, useEditorState } from "@tiptap/react";
import type { AnyExtension, Editor, EditorOptions } from "@tiptap/core";
import { TiptapCollabProvider, WebSocketStatus } from "@hocuspocus/provider";

import { ExtensionKit } from "@/extensions/extension-kit";
import type { EditorUser } from "@/components/editor/BlockEditor/types";
import { initialContent } from "@/lib/editor/data/initialContent";

declare global {
  interface Window {
    editor: Editor | null;
  }
}

export const useBlockEditor = ({
  provider,
  ...editorOptions
}: {
  provider?: TiptapCollabProvider | null | undefined;
} & Partial<Omit<EditorOptions, "extensions">>) => {
  const [collabState, setCollabState] = useState<WebSocketStatus>(
    provider ? WebSocketStatus.Connecting : WebSocketStatus.Disconnected,
  );

  // A simpler approach using just the HTML content
  const STORAGE_KEY = "editor-content-html";

  const editor = useEditor(
    {
      ...editorOptions,
      immediatelyRender: true,
      shouldRerenderOnTransaction: false,
      autofocus: true,
      content: localStorage.getItem(STORAGE_KEY) || initialContent,
      onUpdate: ({ editor }) => {
        // Save HTML directly
        const html = editor.getHTML();
        localStorage.setItem(STORAGE_KEY, html);
        console.log("Saved HTML content:", html.substring(0, 100) + "...");
      },
      extensions: [
        ...ExtensionKit({}),
        // Your other extensions...
      ].filter((e): e is AnyExtension => e !== undefined),
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
  const users = useEditorState({
    editor,
    selector: (ctx): (EditorUser & { initials: string })[] => {
      if (!ctx.editor?.storage.collaborationCursor?.users) {
        return [];
      }

      return ctx.editor.storage.collaborationCursor.users.map(
        (user: EditorUser) => {
          const names = user.name?.split(" ");
          const firstName = names?.[0];
          const lastName = names?.[names.length - 1];
          const initials = `${firstName?.[0] || "?"}${lastName?.[0] || "?"}`;

          return { ...user, initials: initials.length ? initials : "?" };
        },
      );
    },
  });

  useEffect(() => {
    provider?.on("status", (event: { status: WebSocketStatus }) => {
      setCollabState(event.status);
    });
  }, [provider]);

  window.editor = editor;

  return { editor, users, collabState };
};
