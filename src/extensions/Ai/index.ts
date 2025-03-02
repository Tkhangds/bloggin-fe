// This is a dummy file, to make the project work without the AI extension.
import { Extension } from "@tiptap/core";

export type AiStorage = string;
export type Language = string;
export const tryParseToTiptapHTML = (args: string) => args;
export const Ai = Extension.create({
  name: "aiFree",
});
