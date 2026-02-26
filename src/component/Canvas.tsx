import { useEffect, useRef } from "react";
import { useEditorStore } from "../store/useEditorStore";
import { getImageFromCache } from "../utils/loadImage";
import { drawSelection } from "../utils/drawSelection";
import { getHandleRect } from "../utils/getHandleRect";

export const Canvas = ({ moveStatus }: { moveStatus: boolean }) => {
  const {
    canvasConfig,
    elements,
    selectedElementId,
    setSelectedElementId,
    updateElement,
  } = useEditorStore();
  const selectedElement =
    elements.find((el) => el.id === selectedElementId) ?? null;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const dragElementId = useRef<string | null>(null);
  const isResizing = useRef(false);
  const resizeHandle = useRef("");
  const resizeOrigin = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!moveStatus) {
      setSelectedElementId(null);
    }
  }, [moveStatus, setSelectedElementId]);

  // drawing canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canvasConfig) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = canvasConfig.color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // drawing all images
    elements.forEach((element) => {
      if (element.type === "image") {
        const imageObject = getImageFromCache(element.src);
        if (imageObject) {
          ctx.drawImage(
            imageObject,
            element.x,
            element.y,
            element.width,
            element.height,
          );
        }
      }
    });

    // drawing selection
    if (selectedElement) {
      drawSelection(ctx, selectedElement);
    }
  }, [elements, canvasConfig, selectedElement]);

  if (!canvasConfig) return;

  function handleMouseDown(e: React.MouseEvent<HTMLCanvasElement>) {
    if (!moveStatus) return;

    const rect = canvasRef.current!.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

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
          "bottom-right": { x: selectedElement.x, y: selectedElement.y },
        };

        resizeOrigin.current = anchorMap[hitHandle.position];
        return;
      }
    }

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
        dragOffset.current = {
          x: mouseX - el.x,
          y: mouseY - el.y,
        };
        setSelectedElementId(el.id);
        break;
      }
    }
  }

  function handleMouseMove(e: React.MouseEvent<HTMLCanvasElement>) {
    const rect = canvasRef.current!.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // --- RESIZE ---
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

      // clamp — prevent collapsing
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

    // --- DRAG ---
    if (!isDragging.current || !dragElementId.current) return;

    const newX = mouseX - dragOffset.current.x;
    const newY = mouseY - dragOffset.current.y;
    updateElement(dragElementId.current, { x: newX, y: newY });
  }

  function handleMouseUp() {
    isDragging.current = false;
    isResizing.current = false;
    dragElementId.current = null;
  }

  return (
    <canvas
      ref={canvasRef}
      width={canvasConfig.width}
      height={canvasConfig.height}
      style={{ border: "1px solid black" }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    />
  );
};
