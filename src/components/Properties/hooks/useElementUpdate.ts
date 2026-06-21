import { useEditorStore } from "../../../store/useEditorStore";
import type { Element } from "../../../types";

export function useElementUpdate(element: Element | null) {
  const { updateElement } = useEditorStore();

  return (patch: Partial<Element>) => {
    if (element?.type === "draw") {
      const dx = patch.x !== undefined ? patch.x - element.x : 0;
      const dy = patch.y !== undefined ? patch.y - element.y : 0;

      if (dx !== 0 || dy !== 0) {
        patch = {
          ...patch,
          startPoint: [element.startPoint[0] + dx, element.startPoint[1] + dy],
          drawingPoint: element.drawingPoint.map((val, i) =>
            i % 2 === 0 ? val + dx : val + dy,
          ),
        };
      }
    }

    updateElement(element?.id, patch);
  };
}
