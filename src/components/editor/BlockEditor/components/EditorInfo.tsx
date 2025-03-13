import { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@/components/editor/ui/Icon";

export type EditorInfoProps = {
  characters: number;
  words: number;
  isSaving?: boolean;
};

export const EditorInfo = memo(
  ({ characters, words, isSaving }: EditorInfoProps) => {
    return (
      <div className="flex items-center gap-3">
        <Link href="/">
          <div className="w-24 overflow-hidden sm:w-32 lg:h-[40px] lg:w-[150px]">
            <Image
              width={120}
              height={240}
              src={`/image/Blogging-ngang.svg`}
              alt="logo"
              className="h-full w-full scale-125 object-cover transition-transform duration-300"
            />
          </div>
        </Link>

        <div className="mr-4 hidden flex-col justify-center border-l border-neutral-200 pl-4 text-right dark:border-neutral-800 lg:flex">
          <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
            {words} {words === 1 ? "word" : "words"}
          </div>
          <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
            {characters} {characters === 1 ? "character" : "characters"}
          </div>
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <div className="text-[0.9rem] text-neutral-500 dark:text-neutral-400">
            {isSaving ? "Saving..." : "Saved"}
          </div>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <div className="text-[0.9rem] text-neutral-500 dark:text-neutral-400">
            {isSaving ? (
              <Icon name="SaveOff"></Icon>
            ) : (
              <Icon name="Save"></Icon>
            )}
          </div>
        </div>
      </div>
    );
  },
);

EditorInfo.displayName = "EditorInfo";
