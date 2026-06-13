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
  resizeOrigin,
  resizePivot,
  resizeLocalAnchor,
  addElement,
}: MouseDownProps) {
  const canvas = canvasRef.current;
  if (!canvas) return;
  const { x: mouseX, y: mouseY } = getCanvasCoords(e, canvas);

  // rectangle starts
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

  // start drawing
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

  if (!moveStatus) return;

  //  hit detection
  if (selectedElement) {
    // find local x and local y
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

    const hitHandle = handles.find(
      (h) =>
        localX >= h.x &&
        localX <= h.x + h.width &&
        localY >= h.y &&
        localY <= h.y + h.height,
    );

    if (hitHandle) {
      isResizing.current = true;
      // "top-left" " top-right" "bottom-left" "bottom-right"
      resizeHandle.current = hitHandle.position;

      const hw = selectedElement.width / 2;
      const hh = selectedElement.height / 2;

      const corners = {
        "top-left": rotate(cx - hw, cy - hh, cx, cy, selectedElement.rotation),

        "top-right": rotate(cx + hw, cy - hh, cx, cy, selectedElement.rotation),

        "bottom-left": rotate(
          cx - hw,
          cy + hh,
          cx,
          cy,
          selectedElement.rotation,
        ),

        "bottom-right": rotate(
          cx + hw,
          cy + hh,
          cx,
          cy,
          selectedElement.rotation,
        ),
      };

      const oppositeMap: Record<string, { x: number; y: number }> = {
        "top-left": corners["bottom-right"],
        "top-right": corners["bottom-left"],
        "bottom-left": corners["top-right"],
        "bottom-right": corners["top-left"],
      };

      const worldAnchor = oppositeMap[resizeHandle.current];
      resizeOrigin.current = worldAnchor;
      resizePivot.current = { x: cx, y: cy };
      resizeLocalAnchor.current = rotate(
        worldAnchor.x,
        worldAnchor.y,
        cx,
        cy,
        -selectedElement.rotation,
      );
      console.log(resizeOrigin.current);
      console.log(resizeLocalAnchor.current);
      return;
    }
  }

  // selecting for ...
  for (let i = elements.length - 1; i >= 0; i--) {
    const el = elements[i];
    // center
    const cx = el.x + el.width / 2;
    const cy = el.y + el.height / 2;

    const { x: localX, y: localY } = rotate(
      mouseX,
      mouseY,
      cx,
      cy,
      -el.rotation,
    );

    if (
      localX >= el.x &&
      localX <= el.x + el.width &&
      localY >= el.y &&
      localY <= el.y + el.height
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
