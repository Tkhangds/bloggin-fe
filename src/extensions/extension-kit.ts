"use client";

import { HocuspocusProvider } from "@hocuspocus/provider";

import { API } from "@/lib/editor/api";

import {
  BlockquoteFigure,
  CharacterCount,
  CodeBlock,
  Color,
  Details,
  DetailsContent,
  DetailsSummary,
  Document,
  Dropcursor,
  Emoji,
  Figcaption,
  FileHandler,
  Focus,
  FontFamily,
  FontSize,
  Heading,
  Highlight,
  HorizontalRule,
  ImageBlock,
  Link,
  Placeholder,
  Selection,
  SlashCommand,
  StarterKit,
  Subscript,
  Superscript,
  Table,
  TableOfContents,
  TableCell,
  TableHeader,
  TableRow,
  TextAlign,
  TextStyle,
  TrailingNode,
  Typography,
  Underline,
  emojiSuggestion,
  Columns,
  Column,
  TaskItem,
  TaskList,
  UniqueID,
} from ".";
import { ImageUpload } from "./ImageUpload";
import { TableOfContentsNode } from "./TableOfContentsNode";
import { isChangeOrigin } from "@tiptap/extension-collaboration";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";

interface ExtensionKitProps {
  provider?: HocuspocusProvider | null;
  ydoc?: any;
}

export const ExtensionKit = ({ provider, ydoc }: ExtensionKitProps) => {
  if (ydoc) {
    console.log("🔧 ExtensionKit: Initializing with Yjs document", {
      hasYdoc: !!ydoc,
      ydocType: ydoc?.constructor?.name,
      clientId: ydoc?.clientID,
      shareKeys: ydoc ? Array.from(ydoc.share.keys()) : []
    });

    // Pre-initialize the fragment to ensure it exists
    const fragment = ydoc.getXmlFragment('default');
    console.log("🔧 ExtensionKit: XmlFragment 'default' initialized", {
      fragmentLength: fragment.length,
      fragmentType: fragment.constructor.name
    });
  }

  return [
    Document,
    // Add collaboration extensions if ydoc is provided
    ...(ydoc
      ? [
        Collaboration.configure({
          document: ydoc,
          field: 'default', // Explicitly specify the fragment name
        }),
      ]
      : []),
    ...(provider?.awareness
      ? [
        CollaborationCursor.configure({
          provider: provider,
          user: provider.awareness.getLocalState().user || {
            name: 'Anonymous',
            color: '#f783ac',
          },
        }),
      ]
      : []),
    Columns,
    TaskList,
    TaskItem.configure({
      nested: true,
    }),
    Column,
    Selection,
    Heading.configure({
      levels: [1, 2, 3, 4, 5, 6],
    }),
    HorizontalRule,
    UniqueID.configure({
      types: ["paragraph", "heading", "blockquote", "codeBlock", "table"],
      filterTransaction: (transaction) => !isChangeOrigin(transaction),
    }),
    StarterKit.configure({
      document: false,
      dropcursor: false,
      heading: false,
      horizontalRule: false,
      blockquote: false,
      history: ydoc ? false : {
        depth: 100,
        newGroupDelay: 500,
      },
      codeBlock: false,
    }),
    Details.configure({
      persist: true,
      HTMLAttributes: {
        class: "details",
      },
    }),
    DetailsContent,
    DetailsSummary,
    CodeBlock,
    TextStyle,
    FontSize,
    FontFamily,
    Color,
    TrailingNode,
    Link.configure({
      openOnClick: false,
    }),
    Highlight.configure({ multicolor: true }),
    Underline,
    CharacterCount.configure({ limit: 50000 }),
    TableOfContents,
    TableOfContentsNode,
    ImageUpload.configure({
      clientId: provider?.document?.clientID,
    }),
    ImageBlock,
    FileHandler.configure({
      allowedMimeTypes: ["image/png", "image/jpeg", "image/gif", "image/webp"],
      onDrop: (currentEditor, files, pos) => {
        files.forEach(async (file) => {
          const url = await API.uploadImage(file);

          currentEditor.chain().setImageBlockAt({ pos, src: url }).focus().run();
        });
      },
      onPaste: (currentEditor, files) => {
        files.forEach(async (file) => {
          const url = await API.uploadImage(file);

          return currentEditor
            .chain()
            .setImageBlockAt({
              pos: currentEditor.state.selection.anchor,
              src: url,
            })
            .focus()
            .run();
        });
      },
    }),
    Emoji.configure({
      enableEmoticons: true,
      suggestion: emojiSuggestion,
    }),
    TextAlign.extend({
      addKeyboardShortcuts() {
        return {};
      },
    }).configure({
      types: ["heading", "paragraph"],
    }),
    Subscript,
    Superscript,
    Table,
    TableCell,
    TableHeader,
    TableRow,
    Typography,
    Placeholder.configure({
      includeChildren: true,
      showOnlyCurrent: false,
      placeholder: () => "",
    }),
    SlashCommand,
    Focus,
    Figcaption,
    BlockquoteFigure,
    Dropcursor.configure({
      width: 2,
      class: "ProseMirror-dropcursor border-black",
    }),
  ];
};

export default ExtensionKit;
