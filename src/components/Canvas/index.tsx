import { useEffect, useRef, useState, useMemo } from "react";
import { useEditorStore } from "../../store/useEditorStore";
import { useCanvasRenderer } from "./hooks/useCanvasRenderer";
import { useKeyboard } from "./hooks/useKeyboard";
import { MAX_H, MAX_W } from "./constants";
import { handleMouseMove } from "./interaction/handleMouseMove";
import type { CanvasProps } from "./types/index";
import { handleMouseDown } from "./interaction/handleMouseDown";
import { handleLeftClick } from "./interaction/handleLeftClick";

export const Canvas = ({
  canvasRef,
  moveStatus,
  textStatus,
  drawStatus,
  rectStatus,
  panStatus,
  copiedElementRef,
  tempPos,
  zoom,
}: CanvasProps) => {
  const {
    canvasConfig,
    elements,
    selectedElementId,
    setSelectedElementId,
    updateElement,
    addElement,
  } = useEditorStore();

  const selectedElement = useMemo(
    () => elements.find((el) => el.id === selectedElementId) ?? null,
    [elements, selectedElementId],
  );

  const isDragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const dragElementId = useRef<string | null>(null);
  const isResizing = useRef(false);
  const isDrawing = useRef(true);

  const resizeHandle = useRef("");
  const resizePivot = useRef({ x: 0, y: 0 });
  const resizeLocalAnchor = useRef({ x: 0, y: 0 });
  const drawId = useRef<string | null>(null);
  const rectId = useRef<string | null>(null);
  const rectOrigin = useRef({ x: 0, y: 0 });
  const [textOverlay, setTextOverlay] = useState<{
    x: number;
    y: number;
    id: string;
  } | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scale = canvasConfig
    ? Math.min(1, MAX_W / canvasConfig.width, MAX_H / canvasConfig.height)
    : 1;

  const totalScale = scale * zoom;

  useEffect(() => {
    if (!moveStatus) setSelectedElementId(null);
  }, [moveStatus, setSelectedElementId]);

  useCanvasRenderer({ canvasRef, canvasConfig, elements, selectedElement });
  useKeyboard(selectedElement, copiedElementRef);

  function handleMouseUp() {
    isDrawing.current = false;
    isDragging.current = false;
    isResizing.current = false;
    dragElementId.current = null;
    rectOrigin.current = { x: 0, y: 0 };
    rectId.current = null;
  }

  function handleTextCommit(value: string) {
    if (textOverlay) updateElement(textOverlay.id, { content: value });

    setTextOverlay(null);
  }

  function getCanvasCursor() {
    if (moveStatus) return "move";
    if (textStatus) return "text";
    if (rectStatus) return "crosshair";
    if (panStatus) return "grab";
    return "default";
  }

  if (!canvasConfig) return null;

  return (
    <div
      style={{
        position: "absolute",
        width: canvasConfig.width * totalScale,
        height: canvasConfig.height * totalScale,
        top: tempPos.top,
        left: tempPos.left,
      }}
    >
      <canvas
        ref={canvasRef}
        width={canvasConfig.width}
        height={canvasConfig.height}
        style={{
          display: "block",
          transformOrigin: "top left",
          transform: `scale(${totalScale})`,
          border: "1px solid #013836",
          boxShadow: "0 0 0 1px #009b6a22",
          cursor: getCanvasCursor(),
        }}
        onMouseDown={(e) =>
          handleMouseDown({
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
          })
        }
        onMouseMove={(e) =>
          handleMouseMove({
            e,
            drawStatus,
            drawId,
            rectId,
            rectOrigin,
            canvasRef,
            selectedElement,
            updateElement,
            elements,
            isDragging,
            dragOffset,
            dragElementId,
            isResizing,
            isDrawing,
            resizeHandle,
            resizePivot,
            resizeLocalAnchor,
          })
        }
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={(e) =>
          handleLeftClick({
            e,
            textStatus,
            canvasRef,
            addElement,
            setTextOverlay,
            textareaRef,
          })
        }
      />

      {textOverlay && (
        <textarea
          ref={textareaRef}
          rows={2}
          cols={15}
          style={{
            position: "absolute",
            left: textOverlay.x * totalScale,
            top: textOverlay.y * totalScale,
            fontSize: `${40 * totalScale}px`,
            fontFamily: "Verdana",
            background: "transparent",
            border: "1px dashed black",
            outline: "none",
            resize: "none",
            color: "black",
            lineHeight: 1,
            padding: 5,
          }}
          wrap="soft"
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
