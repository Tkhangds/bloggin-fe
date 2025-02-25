import { EditorBubble, removeAIHighlight, useEditor } from "novel";
import { Fragment, type ReactNode, useEffect } from "react";

interface GenerativeMenuSwitchProps {
  children: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
const GenerativeMenuSwitch = ({
  children,
  open,
  onOpenChange,
}: GenerativeMenuSwitchProps) => {
  const { editor } = useEditor();

  useEffect(() => {
    if (!open) removeAIHighlight(editor!);
  }, [open]);
  return (
    <EditorBubble
      tippyOptions={{
        placement: open ? "bottom-start" : "top",
        onHidden: () => {
          onOpenChange(false);
          if (editor != null) {
            editor.chain().unsetHighlight().run();
          }
        },
      }}
      className="border-muted flex w-fit max-w-[90vw] overflow-hidden rounded-md border bg-white/90 shadow-xl"
    >
      {!open && <Fragment>{children}</Fragment>}
    </EditorBubble>
  );
};

export default GenerativeMenuSwitch;
