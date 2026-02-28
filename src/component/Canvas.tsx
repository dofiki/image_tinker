import { useEffect, useRef, useState } from "react";
import { useEditorStore } from "../store/useEditorStore";
import { getImageFromCache } from "../utils/loadImage";
import { drawSelection } from "../utils/drawSelection";
import { getHandleRect } from "../utils/getHandleRect";

const MAX_W = window.innerWidth * 0.75;
const MAX_H = window.innerHeight * 0.85;

export const Canvas = ({
  canvasRef,
  moveStatus,
  textStatus,
}: {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  moveStatus: boolean;
  textStatus: boolean;
}) => {
  const {
    canvasConfig,
    elements,
    selectedElementId,
    setSelectedElementId,
    updateElement,
    removeElement,
    addElement,
  } = useEditorStore();

  const selectedElement =
    elements.find((el) => el.id === selectedElementId) ?? null;
  const isDragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const dragElementId = useRef<string | null>(null);
  const isResizing = useRef(false);
  const resizeHandle = useRef("");
  const resizeOrigin = useRef({ x: 0, y: 0 });
  const [textOverlay, setTextOverlay] = useState<{
    x: number;
    y: number;
    id: string;
  } | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Scale so canvas fits inside available workspace
  const scale = canvasConfig
    ? Math.min(1, MAX_W / canvasConfig.width, MAX_H / canvasConfig.height)
    : 1;

  // Converts display-space mouse coords to canvas-space coords
  function getCanvasCoords(e: React.MouseEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  }

  function handleKeyPress(e: KeyboardEvent) {
    if (e.key === "Delete" && selectedElement) {
      removeElement(selectedElement.id);
    }
  }

  // delete button
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  });

  // deselect on move mode off
  useEffect(() => {
    if (!moveStatus) setSelectedElementId(null);
  }, [moveStatus, setSelectedElementId]);

  // rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canvasConfig) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = canvasConfig.color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // draw images
    elements.forEach((element) => {
      if (element.type === "image") {
        const imageObject = element.src ? getImageFromCache(element.src) : null;
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

    // draw text
    elements.forEach((element) => {
      if (element.type === "text") {
        ctx.font = `${element.fontSize ?? 20}px ${element.fontType ?? "Verdana"}`;
        ctx.fillStyle = element.textColor ?? "red";
        ctx.fillText(
          element.content ?? "",
          element.x,
          element.y + (element.fontSize ?? 20),
        );
      }
    });

    if (selectedElement) drawSelection(ctx, selectedElement);
  }, [elements, canvasConfig, selectedElement]);

  if (!canvasConfig) return null;

  function handleMouseDown(e: React.MouseEvent<HTMLCanvasElement>) {
    if (!moveStatus) return;
    const { x: mouseX, y: mouseY } = getCanvasCoords(e);

    // resize
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

    // check : which image intersects with our mouse
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

  function handleMouseMove(e: React.MouseEvent<HTMLCanvasElement>) {
    const { x: mouseX, y: mouseY } = getCanvasCoords(e);

    if (isResizing.current && selectedElement) {
      const anchor = resizeOrigin.current;
      const MIN_SIZE = 20;
      let newX = selectedElement.x,
        newY = selectedElement.y;
      let newWidth = selectedElement.width,
        newHeight = selectedElement.height;

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
        )
          newX = anchor.x - MIN_SIZE;
      }
      if (newHeight < MIN_SIZE) {
        newHeight = MIN_SIZE;
        if (
          resizeHandle.current === "top-left" ||
          resizeHandle.current === "top-right"
        )
          newY = anchor.y - MIN_SIZE;
      }

      updateElement(selectedElement.id, {
        x: newX,
        y: newY,
        width: newWidth,
        height: newHeight,
      });
      return;
    }

    if (!isDragging.current || !dragElementId.current) return;
    updateElement(dragElementId.current, {
      x: mouseX - dragOffset.current.x,
      y: mouseY - dragOffset.current.y,
    });
  }

  function handleMouseUp() {
    isDragging.current = false;
    isResizing.current = false;
    dragElementId.current = null;
  }

  function handleTextCommit(value: string) {
    if (textOverlay) {
      updateElement(textOverlay.id, { content: value });
    }
    setTextOverlay(null);
  }

  function handleLeftClick(e: React.MouseEvent<HTMLCanvasElement>) {
    if (textStatus) {
      const { x: mouseX, y: mouseY } = getCanvasCoords(e);
      const id = crypto.randomUUID();

      addElement({
        id,
        type: "text",
        x: mouseX,
        y: mouseY,
        width: 200,
        height: 30,
        src: null,
        content: null,
        fontSize: 20,
        textColor: "red",
        fontType: "Verdana",
      });

      setTextOverlay({ x: mouseX, y: mouseY, id });
      setTimeout(() => textareaRef.current?.focus(), 0);
    }
  }

  return (
    <div
      style={{
        width: canvasConfig.width * scale,
        height: canvasConfig.height * scale,
        flexShrink: 0,
        position: "relative",
      }}
    >
      <canvas
        ref={canvasRef}
        width={canvasConfig.width}
        height={canvasConfig.height}
        style={{
          display: "block",
          transformOrigin: "top left",
          transform: `scale(${scale})`,
          border: "1px solid #013836",
          boxShadow: "0 0 0 1px #009b6a22",
          cursor: moveStatus ? "move" : "default",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={handleLeftClick}
      />

      {textOverlay && (
        <textarea
          ref={textareaRef}
          rows={2}
          cols={15}
          style={{
            position: "absolute",
            left: textOverlay.x * scale,
            top: textOverlay.y * scale,
            fontSize: `${20 * scale}px`,
            fontFamily: "Verdana",
            background: "transparent",
            border: "1px dashed black",
            outline: "none",
            resize: "none",
            color: "black",
            lineHeight: 1,
            padding: 5,
          }}
          onBlur={(e) => handleTextCommit(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleTextCommit(e.currentTarget.value);
            }
            if (e.key === "Escape") setTextOverlay(null);
          }}
        />
      )}
    </div>
  );
};
