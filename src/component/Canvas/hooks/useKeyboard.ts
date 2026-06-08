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
    const isCtrl = (e: KeyboardEvent) => e.ctrlKey;

    const handlers: Record<string, (e: KeyboardEvent) => void> = {
      Delete: () => {
        if (selectedElement) {
          removeElement(selectedElement.id);
        }
      },

      z: (e) => {
        if (isCtrl(e)) undo();
      },

      r: (e) => {
        if (isCtrl(e)) {
          e.preventDefault();
          redo();
        }
      },

      c: (e) => {
        if (isCtrl(e) && selectedElementId) {
          handleCopy(selectedElementId, elements, copiedElementRef);
        }
      },

      v: (e) => {
        if (isCtrl(e)) {
          handlePaste(copiedElementRef);
        }
      },
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;

      const handler = handlers[key];
      if (handler) handler(e);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });
};
