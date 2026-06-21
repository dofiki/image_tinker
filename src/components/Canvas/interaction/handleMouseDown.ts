import type { MouseDownProps } from "../types/mouse";
import { getCanvasCoords } from "../utils/getCanvasCoords";
import { getHandleRect } from "../utils/getHandleRect";
import { rotate } from "../utils/rotate";
export function handleMouseDown({
  e,
  canvasRef,
  drawId,
  rectId,
  rectOrigin,
  moveStatus,
  drawStatus,
  rectStatus,
  elements,
  selectedElement,
  setSelectedElementId,
  isDragging,
  dragOffset,
  dragElementId,
  isResizing,
  isDrawing,
  resizeHandle,
  resizePivot,
  resizeLocalAnchor,
  addElement,
}: MouseDownProps) {
  const canvas = canvasRef.current;
  if (!canvas) return;
  const { x: mouseX, y: mouseY } = getCanvasCoords(e, canvas);

  // Starting Rectangle
  if (rectStatus) {
    const id = crypto.randomUUID();
    rectId.current = id;
    rectOrigin.current.x = mouseX;
    rectOrigin.current.y = mouseY;
    addElement({
      name: null,
      id,
      type: "rect",
      x: mouseX,
      y: mouseY,
      width: 0,
      height: 0,
      rotation: 0,
      opacity: 100,
      visibilityStatus: true,
      blendMode: "source-over",
      fillStyle: "red",
      strokeStyle: "red",
    });
  }

  // Starting Drawing
  if (drawStatus) {
    isDrawing.current = true;
    const id = crypto.randomUUID();
    drawId.current = id;
    addElement({
      name: null,
      id,
      type: "draw",
      x: mouseX,
      y: mouseY,
      width: 100,
      height: 100,
      visibilityStatus: true,
      opacity: 100,
      blendMode: "source-over",
      rotation: 0,
      strokeStyle: "black",
      lineWidth: "10",
      startPoint: [mouseX, mouseY],
      drawingPoint: [],
    });
  }

  // if move tool is selected
  if (moveStatus) {
    //  and some element is clicked/selected
    if (selectedElement) {
      // we find the local x and local y of the mouse pos
      const cx = selectedElement.x + selectedElement.width / 2;
      const cy = selectedElement.y + selectedElement.height / 2;

      const { x: localX, y: localY } = rotate(
        mouseX,
        mouseY,
        cx,
        cy,
        -selectedElement.rotation,
      );

      const handles = getHandleRect(selectedElement);
      // check if that mouse click falls inside some handle or not
      const hitHandle = handles.find(
        (h) =>
          localX >= h.x &&
          localX <= h.x + h.width &&
          localY >= h.y &&
          localY <= h.y + h.height,
      );

      // if it does we find the x and y (local)
      // of the diagonally opposite handle
      if (hitHandle) {
        isResizing.current = true;
        resizeHandle.current = hitHandle.position;

        const hw = selectedElement.width / 2;
        const hh = selectedElement.height / 2;

        const oppositeMap: Record<string, { x: number; y: number }> = {
          "top-left": { x: cx + hw, y: cy + hh },
          "top-right": { x: cx - hw, y: cy + hh },
          "bottom-left": { x: cx + hw, y: cy - hh },
          "bottom-right": { x: cx - hw, y: cy - hh },
        };

        resizePivot.current = { x: cx, y: cy };
        resizeLocalAnchor.current = oppositeMap[resizeHandle.current];
        return;
      }
    }

    // click/select handling
    for (let i = elements.length - 1; i >= 0; i--) {
      const el = elements[i];

      const cx = el.x + el.width / 2;
      const cy = el.y + el.height / 2;
      // need unrotated x,y for AABB hit test
      const { x: localX, y: localY } = rotate(
        mouseX,
        mouseY,
        cx,
        cy,
        -el.rotation,
      );

      // AABB hit test
      if (
        localX >= el.x &&
        localX <= el.x + el.width &&
        localY >= el.y &&
        localY <= el.y + el.height
      ) {
        isDragging.current = true;
        dragElementId.current = el.id;
        dragOffset.current = { x: mouseX - el.x, y: mouseY - el.y };
        // got em
        setSelectedElementId(el.id);
        return;
      }
    }

    setSelectedElementId(null);
  }
}
