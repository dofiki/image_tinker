import { getCanvasCoords } from "../utils/getCanvasCoords";
import type { MouseMoveProps } from "../types";
import { toLocalSpace } from "../utils/toLocalSpace";
import { toWorldSpace } from "../utils/toWorldSpace";

export function handleMouseMove({
  e,
  drawStatus,
  drawId,
  canvasRef,
  selectedElement,
  elements,
  updateElement,
  isDragging,
  dragOffset,
  dragElementId,
  isResizing,
  isDrawing,
  resizeHandle,
  resizePivot,
  resizeLocalAnchor,
}: MouseMoveProps) {
  const canvas = canvasRef.current;
  if (!canvas) return;
  const { x: mouseX, y: mouseY } = getCanvasCoords(e, canvas);

  if (isDrawing.current && drawStatus) {
    if (!drawId.current) return;
    const el = elements.find((el) => el.id === drawId.current);
    if (!el || el.type !== "draw") return;

    updateElement(drawId.current, {
      drawingPoint: [...el.drawingPoint, mouseX, mouseY],
    });

    return;
  }
  if (!selectedElement) return;

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
  const el = elements.find((el) => el.id === dragElementId.current);
  if (!el) return;

  if (el.type === "draw") {
    const newX = mouseX - dragOffset.current.x;
    const newY = mouseY - dragOffset.current.y;

    const dx = newX - el.x;
    const dy = newY - el.y;

    const movedPoints = el.drawingPoint.map((val, i) =>
      i % 2 === 0 ? val + dx : val + dy,
    );

    updateElement(dragElementId.current, {
      x: newX,
      y: newY,
      startPoint: [el.startPoint[0] + dx, el.startPoint[1] + dy],
      drawingPoint: movedPoints,
    });

    return;
  }

  updateElement(dragElementId.current, {
    x: mouseX - dragOffset.current.x,
    y: mouseY - dragOffset.current.y,
  });
}
