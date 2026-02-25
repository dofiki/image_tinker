import { useEffect, useRef } from "react";
import { useEditorStore } from "../store/useEditorStore";
import { getImageFromCache } from "../utils/LoadImage";

export const Canvas = ({ moveStatus }: { moveStatus: boolean }) => {
  const {
    canvasConfig,
    elements,
    selectedElementId,
    setSelectedElementId,
    updateElement,
  } = useEditorStore();

  // Get the LIVE element from elements array, not a stale snapshot
  const selectedElement =
    elements.find((el) => el.id === selectedElementId) ?? null;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // These persist across mouse events without causing re-renders
  const isDragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const dragElementId = useRef<string | null>(null);

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

    if (selectedElement) {
      const el = selectedElement;
      const padding = 4; // gap between image edge and the border

      ctx.save();

      ctx.strokeStyle = "#0099ff"; // blue border
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 3]); // dashed line: 6px dash, 3px gap

      ctx.strokeRect(
        el.x - padding,
        el.y - padding,
        el.width + padding * 2,
        el.height + padding * 2,
      );

      ctx.restore(); // resets lineDash and other styles back to default
    }
  }, [elements, canvasConfig, selectedElement]);

  if (!canvasConfig) return;

  function handleMouseDown(e: React.MouseEvent<HTMLCanvasElement>) {
    if (!moveStatus) return;

    const rect = canvasRef.current!.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    for (let i = elements.length - 1; i >= 0; i--) {
      const el = elements[i];

      if (
        mouseX >= el.x &&
        mouseX <= el.x + el.width &&
        mouseY >= el.y &&
        mouseY <= el.y + el.height
      ) {
        // Save to refs — persists across mouse events
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
    if (!isDragging.current || !dragElementId.current) return;

    const rect = canvasRef.current!.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // New position = mouse position minus where we grabbed the element
    const newX = mouseX - dragOffset.current.x;
    const newY = mouseY - dragOffset.current.y;

    // Update element in store → triggers useEffect → redraws canvas
    updateElement(dragElementId.current, { x: newX, y: newY });
  }

  function handleMouseUp() {
    // Stop dragging
    isDragging.current = false;
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
