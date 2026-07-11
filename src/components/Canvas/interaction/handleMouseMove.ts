import { getCanvasCoords } from "../utils/getCanvasCoords";
import type { MouseMoveProps } from "../types";

import { rotate } from "../utils/rotate";

export function handleMouseMove({
  e,
  drawStatus,
  drawId,
  rectId,
  circleId,
  lineId,
  lineStatus,
  circleStatus,
  rectOrigin,
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

  // making rectangle
  if (rectId.current) {
    updateElement(rectId.current, {
      width: mouseX - rectOrigin.current.x,
      height: mouseY - rectOrigin.current.y,
    });
  }

  // drawing
  if (isDrawing.current && drawStatus) {
    if (!drawId.current) return;
    const el = elements.find((el) => el.id === drawId.current);
    if (!el || el.type !== "draw") return;

    updateElement(drawId.current, {
      drawingPoint: [...el.drawingPoint, mouseX, mouseY],
    });

    return;
  }

  // circle
  if (isDrawing.current && circleStatus) {
    if (!circleId.current) return;
    updateElement(circleId.current, {
      width: mouseX,
      height: mouseY,
      radius: mouseX,
    });
  }

  // line
  if (isDrawing.current && lineStatus) {
    if (!lineId.current) return;
    updateElement(lineId.current, {
      lineTo: [mouseX, mouseY],
      width: mouseX,
      height: mouseY,
    });
  }

  // if some elmenet is selected
  if (selectedElement) {
    // and resizing status is true
    if (isResizing.current) {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const MIN_SIZE = 20;

      const cx = resizePivot.current.x;
      const cy = resizePivot.current.y;

      const localMouse = rotate(
        mouseX,
        mouseY,
        cx,
        cy,
        -selectedElement.rotation,
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
      const newWorldCenter = rotate(
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

    // and draggin status is true
    if (isDragging.current && dragElementId.current) {
      const el = elements.find((el) => el.id === dragElementId.current);
      if (!el) return;
      // dragging draw element
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

      if (el.type === "line") {
        const newX = mouseX - dragOffset.current.x;
        const newY = mouseY - dragOffset.current.y;

        const dx = newX - el.x;
        const dy = newY - el.y;

        updateElement(dragElementId.current, {
          x: newX,
          y: newY,
          moveTo: [el.moveTo[0] + dx, el.moveTo[1] + dy],
          lineTo: [el.lineTo[0] + dx, el.lineTo[1] + dy],
        });

        return;
      }
      // draggin other elements
      updateElement(dragElementId.current, {
        x: mouseX - dragOffset.current.x,
        y: mouseY - dragOffset.current.y,
      });
    }
  }
}
