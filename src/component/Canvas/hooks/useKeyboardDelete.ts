import { useEffect } from "react";
import { useEditorStore } from "../../../store/useEditorStore";
import type { Element } from "../../../types/index";

export const useKeyboardDelete = (selectedElement: Element | null) => {
  const { removeElement } = useEditorStore();

  useEffect(() => {
    function handleKeyPress(e: KeyboardEvent) {
      if (e.key === "Delete" && selectedElement) {
        removeElement(selectedElement.id);
      }
    }
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  });
};
