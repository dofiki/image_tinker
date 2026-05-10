import { getCanvasCoords } from "../utils/getCanvasCoords";
import type { MouseMoveProps } from "../types";
import { drawRulerPointer } from "../utils/drawRulerPointer";

export function handleMouseMove({
  e,
  canvasRef,
  selectedElement,
  updateElement,
  isDragging,
  dragOffset,
  dragElementId,
  isResizing,
  resizeHandle,
  resizeOrigin,
}: MouseMoveProps) {
  const canvas = canvasRef.current;
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  // ruler pointer
  drawRulerPointer(e, ctx, canvas);

  const { x: mouseX, y: mouseY } = getCanvasCoords(e, canvas);

  // Resize logic
  if (isResizing.current && selectedElement) {
    const anchor = resizeOrigin.current;
    const MIN_SIZE = 20;

    let newX = selectedElement.x;
    let newY = selectedElement.y;
    let newWidth = selectedElement.width;
    let newHeight = selectedElement.height;

    switch (resizeHandle.current) {
      case "top-left":
        newX = mouseX;
        newY = mouseY;
        newWidth = anchor.x - mouseX;
        newHeight = anchor.y - mouseY;
        break;

      case "top-right":
        newX = anchor.x;
        newY = mouseY;
        newWidth = mouseX - anchor.x;
        newHeight = anchor.y - mouseY;
        break;

      case "bottom-left":
        newX = mouseX;
        newY = anchor.y;
        newWidth = anchor.x - mouseX;
        newHeight = mouseY - anchor.y;
        break;

      case "bottom-right":
        newX = anchor.x;
        newY = anchor.y;
        newWidth = mouseX - anchor.x;
        newHeight = mouseY - anchor.y;
        break;
    }

    if (newWidth < MIN_SIZE) {
      newWidth = MIN_SIZE;
      if (
        resizeHandle.current === "top-left" ||
        resizeHandle.current === "bottom-left"
      ) {
        newX = anchor.x - MIN_SIZE;
      }
    }

    if (newHeight < MIN_SIZE) {
      newHeight = MIN_SIZE;
      if (
        resizeHandle.current === "top-left" ||
        resizeHandle.current === "top-right"
      ) {
        newY = anchor.y - MIN_SIZE;
      }
    }

    updateElement(selectedElement.id, {
      x: newX,
      y: newY,
      width: newWidth,
      height: newHeight,
    });

    return;
  }

  // Drag logic
  if (!isDragging.current || !dragElementId.current) return;

  updateElement(dragElementId.current, {
    x: mouseX - dragOffset.current.x,
    y: mouseY - dragOffset.current.y,
  });
}
