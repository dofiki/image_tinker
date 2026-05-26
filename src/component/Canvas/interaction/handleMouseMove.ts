import { getCanvasCoords } from "../utils/getCanvasCoords";
import type { MouseMoveProps } from "../types";
import { toLocalSpace } from "../utils/toLocalSpace";
import { toWorldSpace } from "../utils/toWorldSpace";

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
  resizePivot,
  resizeLocalAnchor,
}: MouseMoveProps) {
  const canvas = canvasRef.current;
  if (!canvas) return;
  if (!selectedElement) return;

  const { x: mouseX, y: mouseY } = getCanvasCoords(e, canvas);

  if (isResizing.current) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const MIN_SIZE = 20;

    const cx = resizePivot.current.x;
    const cy = resizePivot.current.y;

    const localMouse = toLocalSpace(
      mouseX,
      mouseY,
      cx,
      cy,
      selectedElement.rotation,
    );
    const localAnchor = resizeLocalAnchor.current;

    let localX = selectedElement.x;
    let localY = selectedElement.y;
    let newWidth = selectedElement.width;
    let newHeight = selectedElement.height;

    switch (resizeHandle.current) {
      case "top-left":
        localX = localMouse.x;
        localY = localMouse.y;
        newWidth = localAnchor.x - localMouse.x;
        newHeight = localAnchor.y - localMouse.y;
        break;
      case "top-right":
        localX = localAnchor.x;
        localY = localMouse.y;
        newWidth = localMouse.x - localAnchor.x;
        newHeight = localAnchor.y - localMouse.y;
        break;
      case "bottom-left":
        localX = localMouse.x;
        localY = localAnchor.y;
        newWidth = localAnchor.x - localMouse.x;
        newHeight = localMouse.y - localAnchor.y;
        break;
      case "bottom-right":
        localX = localAnchor.x;
        localY = localAnchor.y;
        newWidth = localMouse.x - localAnchor.x;
        newHeight = localMouse.y - localAnchor.y;
        break;
    }

    if (newWidth < MIN_SIZE) {
      newWidth = MIN_SIZE;
      if (
        resizeHandle.current === "top-left" ||
        resizeHandle.current === "bottom-left"
      ) {
        localX = localAnchor.x - MIN_SIZE;
      }
    }

    if (newHeight < MIN_SIZE) {
      newHeight = MIN_SIZE;
      if (
        resizeHandle.current === "top-left" ||
        resizeHandle.current === "top-right"
      ) {
        localY = localAnchor.y - MIN_SIZE;
      }
    }

    const newLocalCx = localX + newWidth / 2;
    const newLocalCy = localY + newHeight / 2;
    const newWorldCenter = toWorldSpace(
      newLocalCx,
      newLocalCy,
      cx,
      cy,
      selectedElement.rotation,
    );

    const nextFontSize = Math.max(20, newHeight * 0.6);
    ctx.font = `${nextFontSize}px Arial`;

    updateElement(selectedElement.id, {
      x: newWorldCenter.x - newWidth / 2,
      y: newWorldCenter.y - newHeight / 2,
      width: newWidth,
      height: newHeight,
      fontSize: Number(nextFontSize.toFixed()),
    });

    return;
  }

  if (!isDragging.current || !dragElementId.current) return;

  updateElement(dragElementId.current, {
    x: mouseX - dragOffset.current.x,
    y: mouseY - dragOffset.current.y,
  });
}
