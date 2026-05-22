import type { MouseDownProps } from "../types/mouse";
import { getCanvasCoords } from "../utils/getCanvasCoords";
import { getHandleRect } from "../utils/getHandleRect";

export function handleMouseDown({
  e,
  canvasRef,
  moveStatus,
  elements,
  selectedElement,
  setSelectedElementId,
  isDragging,
  dragOffset,
  dragElementId,
  isResizing,
  resizeHandle,
  resizeOrigin,
}: MouseDownProps) {
  if (!moveStatus) return;

  const canvas = canvasRef.current;
  if (!canvas) return;

  const { x: mouseX, y: mouseY } = getCanvasCoords(e, canvas);

  if (selectedElement) {
    const handles = getHandleRect(selectedElement);
    const hitHandle = handles.find(
      (h) =>
        mouseX >= h.x &&
        mouseX <= h.x + h.width &&
        mouseY >= h.y &&
        mouseY <= h.y + h.height,
    );

    if (hitHandle) {
      isResizing.current = true;
      resizeHandle.current = hitHandle.position;

      //look up table... to find diagonally opposite handler
      const anchorMap: Record<string, { x: number; y: number }> = {
        "top-left": {
          x: selectedElement.x + selectedElement.width,
          y: selectedElement.y + selectedElement.height,
        },
        "top-right": {
          x: selectedElement.x,
          y: selectedElement.y + selectedElement.height,
        },
        "bottom-left": {
          x: selectedElement.x + selectedElement.width,
          y: selectedElement.y,
        },
        "bottom-right": {
          x: selectedElement.x,
          y: selectedElement.y,
        },
      };

      // and that will be our resize origin
      resizeOrigin.current = anchorMap[resizeHandle.current];
      return;
    }
  }

  // if clicked inside the image
  // initiate the draggin process
  for (let i = elements.length - 1; i >= 0; i--) {
    const el = elements[i];
    if (
      mouseX >= el.x &&
      mouseX <= el.x + el.width &&
      mouseY >= el.y &&
      mouseY <= el.y + el.height
    ) {
      isDragging.current = true;
      dragElementId.current = el.id;
      dragOffset.current = { x: mouseX - el.x, y: mouseY - el.y };
      setSelectedElementId(el.id);
      return;
    }
  }

  setSelectedElementId(null);
}
