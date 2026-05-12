import { useEffect } from "react";
import type { CanvasRendererProps } from "../types";
import { getImageFromCache } from "../../../component/MenuBar/utils/loadImage";
import { drawSelection } from "../utils/drawSelection";
import { drawRulerMarks } from "../Ruler/drawRulerMarks";
import { drawRulerPointer } from "../Ruler/drawRulerPointer";

export function useCanvasRenderer({
  canvasRef,
  canvasConfig,
  elements,
  selectedElement,
}: CanvasRendererProps) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canvasConfig) return;
    const ctx = canvas.getContext("2d");

    const handlePointer = function (e: MouseEvent) {
      if (!ctx || !canvas) return;

      drawRulerPointer(e, ctx, canvas);
    };
    document.addEventListener("mousemove", handlePointer);
    return () => {
      document.removeEventListener("mousemove", handlePointer);
    };
  }, [canvasRef, canvasConfig]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canvasConfig) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // rendering background
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = canvasConfig.color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // rendering elements
    elements.forEach((element) => {
      if (element.visibilityStatus) {
        if (element.type === "image") {
          const imageObject = element.src
            ? getImageFromCache(element.src)
            : null;
          if (imageObject) {
            ctx.filter = `blur(${element.blur}px)`;
            ctx.drawImage(
              imageObject,
              element.x,
              element.y,
              element.width,
              element.height,
            );
            ctx.filter = "none";
          }
        } else if (element.type === "text") {
          ctx.font = `${element.fontSize ?? 20}px ${element.fontType ?? "Verdana"}`;
          ctx.fillStyle = element.textColor ?? "red";
          ctx.fillText(
            element.content ?? "",
            element.x,
            element.y + (element.fontSize ?? 20),
          );
        }
      }
    });

    // rendering ruler bg (initial)
    // vertical
    ctx.fillStyle = "gray";
    ctx.fillRect(0, 40, 40, canvas.height);
    // horizontal
    ctx.fillStyle = "gray";
    ctx.fillRect(40, 0, canvas.width, 40);
    // corner
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 40, 40);

    // ruler marks
    drawRulerMarks(ctx, canvas);

    if (selectedElement) drawSelection(ctx, selectedElement);
  }, [elements, canvasConfig, selectedElement]);
}
