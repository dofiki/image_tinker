import { useEffect, useRef, useState } from "react";
import { useEditorStore } from "../../store/useEditorStore";
import { useCanvasRenderer } from "./hooks/useCanvasRenderer";
import { useKeyboardDelete } from "./hooks/useKeyboardDelete";
import { MAX_H, MAX_W } from "./constants";
import { getCanvasCoords } from "./utils/getCanvasCoords";
import { handleMouseMove } from "./utils/handleMouseMove";
import type { CanvasProps } from "./types/index";
import { handleMouseDown } from "./utils/handleMouseDown";

export const Canvas = ({ canvasRef, moveStatus, textStatus }: CanvasProps) => {
  const {
    canvasConfig,
    elements,
    selectedElementId,
    setSelectedElementId,
    updateElement,
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

  const scale = canvasConfig
    ? Math.min(1, MAX_W / canvasConfig.width, MAX_H / canvasConfig.height)
    : 1;

  useEffect(() => {
    if (!moveStatus) setSelectedElementId(null);
  }, [moveStatus, setSelectedElementId]);

  useCanvasRenderer({ canvasRef, canvasConfig, elements, selectedElement });
  useKeyboardDelete(selectedElement);
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
      const canvas = canvasRef.current;
      if (!canvas) return;
      const { x: mouseX, y: mouseY } = getCanvasCoords(e, canvas);
      const id = crypto.randomUUID();

      addElement({
        name: null,
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
        visibilityStatus: true,
        blur: undefined,
        saturate: undefined,
        saturationStatus: undefined,
      });

      setTextOverlay({ x: mouseX, y: mouseY, id });
      setTimeout(() => textareaRef.current?.focus(), 0);
    }
  }

  if (!canvasConfig) return null;

  return (
    <div className="flex gap-5">
      <div
        style={{
          width: canvasConfig.width * scale,
          height: canvasConfig.height * scale,
          position: "relative",
        }}
      >
        <canvas
          ref={canvasRef}
          width={canvasConfig.width + 40}
          height={canvasConfig.height + 40}
          style={{
            display: "block",
            transformOrigin: "top left",
            transform: `scale(${scale})`,
            border: "1px solid #013836",
            boxShadow: "0 0 0 1px #009b6a22",
            cursor: moveStatus ? "move" : "default",
          }}
          onMouseDown={(e) => {
            handleMouseDown({
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
            });
          }}
          onMouseMove={(e) => {
            handleMouseMove({
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
            });
          }}
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
    </div>
  );
};
