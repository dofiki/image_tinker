import type { MouseDownProps } from "../types/mouse";
import { getCanvasCoords } from "../utils/getCanvasCoords";
import { getHandleRect } from "../utils/getHandleRect";
import { toLocalSpace } from "../utils/toLocalSpace";

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
  resizePivot,
  resizeLocalAnchor,
}: MouseDownProps) {
  if (!moveStatus) return;

  const canvas = canvasRef.current;
  if (!canvas) return;

  const { x: mouseX, y: mouseY } = getCanvasCoords(e, canvas);

  // handle hit detection
  if (selectedElement) {
    const cx = selectedElement.x + selectedElement.width / 2;
    const cy = selectedElement.y + selectedElement.height / 2;
    const { x: localX, y: localY } = toLocalSpace(
      mouseX,
      mouseY,
      cx,
      cy,
      selectedElement.rotation,
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

      const rad = (selectedElement.rotation * Math.PI) / 180;
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);
      const hw = selectedElement.width / 2;
      const hh = selectedElement.height / 2;

      // 3rd
      function rotateCorner(ox: number, oy: number) {
        return {
          x: cx + ox * cos - oy * sin,
          y: cy + ox * sin + oy * cos,
        };
      }

      // second
      const corners = {
        "top-left": rotateCorner(-hw, -hh),
        "top-right": rotateCorner(hw, -hh),
        "bottom-left": rotateCorner(-hw, hh),
        "bottom-right": rotateCorner(hw, hh),
      };

      // first
      const oppositeMap: Record<string, { x: number; y: number }> = {
        "top-left": corners["bottom-right"],
        "top-right": corners["bottom-left"],
        "bottom-left": corners["top-right"],
        "bottom-right": corners["top-left"],
      };

      // zero
      const worldAnchor = oppositeMap[resizeHandle.current];
      resizeOrigin.current = worldAnchor;
      resizePivot.current = { x: cx, y: cy };
      resizeLocalAnchor.current = toLocalSpace(
        worldAnchor.x,
        worldAnchor.y,
        cx,
        cy,
        selectedElement.rotation,
      );

      return;
    }
  }

  // image selection
  for (let i = elements.length - 1; i >= 0; i--) {
    const el = elements[i];
    const cx = el.x + el.width / 2;
    const cy = el.y + el.height / 2;
    const { x: localX, y: localY } = toLocalSpace(
      mouseX,
      mouseY,
      cx,
      cy,
      el.rotation,
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
