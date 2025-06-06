"use client";

import { Icon } from "@/components/editor/ui/Icon";
import { EditorInfo } from "./EditorInfo";
import { Toolbar } from "@/components/editor/ui/Toolbar";
import { Editor } from "@tiptap/core";
import { useEditorState } from "@tiptap/react";
import { useCallback } from "react";
import { AvatarMenu } from "@/components/header-menu/avatar-menu";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { useRouter, usePathname } from "next/navigation";
import { MobileMenu } from "@/components/header-menu/mobile-menu";
import { useQueryClient } from "@tanstack/react-query";

export type EditorHeaderProps = {
  isSidebarOpen?: boolean;
  toggleSidebar?: () => void;
  editor: Editor;
  isSaving?: boolean;
  mode?: string;
};

export const EditorHeader = ({
  editor,
  isSidebarOpen,
  toggleSidebar,
  isSaving,
  mode,
}: EditorHeaderProps) => {
  const queryClient = useQueryClient();

  const router = useRouter();
  const pathname = usePathname();
  const { characters, words } = useEditorState({
    editor,
    selector: (ctx): { characters: number; words: number } => {
      const { characters, words } = ctx.editor?.storage.characterCount || {
        characters: () => 0,
        words: () => 0,
      };
      return { characters: characters(), words: words() };
    },
  });

  const toggleEditable = useCallback(() => {
    editor.setOptions({ editable: !editor.isEditable });
    editor.view.dispatch(editor.view.state.tr);
  }, [editor]);

  return (
    <div className="absolute left-0 right-0 top-0 z-50 flex flex-none flex-row items-center justify-between border-b border-neutral-200 bg-white py-2 pl-6 pr-3 text-black dark:border-neutral-800 dark:bg-black dark:text-white">
      <EditorInfo characters={characters} words={words} isSaving={isSaving} />

      <div className="flex flex-row items-center gap-x-1.5">
        <div className="flex items-center gap-x-1.5">
          {mode === "draft" ? (
            <Button
              onClick={() => {
                queryClient.invalidateQueries({
                  queryKey: ["draft", pathname.split("/").pop()],
                });
                router.push("/publish/" + pathname.split("/").pop());
              }}
              size={"sm"}
              className="mr-2 hidden lg:flex"
              disabled={isSaving}
            >
              Publish
              <Icon name="CloudUpload" />
            </Button>
          ) : (
            <Button
              onClick={() => {
                router.push("/blog/" + pathname.split("/").pop());
              }}
              size={"sm"}
              className="mr-2 hidden lg:flex"
            >
              Done
              <Icon name="Save" />
            </Button>
          )}

          <Toolbar.Button
            tooltip={editor.isEditable ? "Disable editing" : "Enable editing"}
            onClick={toggleEditable}
            className="hidden lg:flex"
          >
            <Icon name={editor.isEditable ? "PenOff" : "Pen"} />
          </Toolbar.Button>
          <Toolbar.Button
            tooltip={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
            onClick={toggleSidebar}
            active={isSidebarOpen}
            className={clsx(
              isSidebarOpen ? "bg-transparent" : "",
              "hidden lg:flex",
            )}
          >
            <Icon name={isSidebarOpen ? "PanelRightClose" : "PanelRight"} />
          </Toolbar.Button>
          <FloatingUpdateIndicator />
          <AvatarMenu></AvatarMenu>
          <MobileMenu></MobileMenu>
        </div>
      </div>
    </div>
  );
};

const FloatingUpdateIndicator = () => {
  return (
    <button
      className={clsx(
        "fixed bottom-6 right-6 rounded-full bg-[#171717]/90 p-4 text-white shadow-lg transition-all",
        "hover:bg-[#171717] active:scale-95",
        "lg:hidden", // Show only on mobile
        "opacity-100",
      )}
    >
      <Icon className="size-6" name="CloudUpload" />
    </button>
  );
};
