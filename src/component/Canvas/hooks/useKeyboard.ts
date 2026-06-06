import { useEffect } from "react";
import { useEditorStore } from "../../../store/useEditorStore";
import type { Element } from "../../../types/index";

export const useKeyboard = (
  selectedElement: Element | null,
  copiedElementRef: React.MutableRefObject<Element | null>,
) => {
  const {
    removeElement,
    undo,
    redo,
    handleCopy,
    handlePaste,
    selectedElementId,
    elements,
  } = useEditorStore();

  useEffect(() => {
    function handleKeyPress(e: KeyboardEvent) {
      if (e.key === "Delete" && selectedElement) {
        removeElement(selectedElement.id);
      } else if (e.key === "z" && e.ctrlKey) {
        undo();
      } else if (e.key === "r" && e.ctrlKey) {
        e.preventDefault();
        redo();
      } else if (e.key === "c" && e.ctrlKey) {
        if (!selectedElementId) return;
        handleCopy(selectedElementId, elements, copiedElementRef);
      } else if (e.key === "v" && e.ctrlKey) {
        handlePaste(copiedElementRef);
      }
    }

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  });
};
