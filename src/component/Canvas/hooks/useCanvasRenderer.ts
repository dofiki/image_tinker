import { useEffect } from "react";
import type { CanvasRendererProps } from "../types";
import { getImageFromCache } from "../../../component/MenuBar/utils/loadImage";
import { drawSelection } from "../utils/drawSelection";
import { drawRulerMarks } from "../utils/drawRulerMarks";
import { drawRulerPointer } from "../utils/drawRulerPointer";

export function useCanvasRenderer({
  canvasRef,
  canvasConfig,
  elements,
  selectedElement,
}: CanvasRendererProps) {
  // since while moving something changes selectedElement which
  // triggers canvas re-render and ruler overrides the pointer
  // we again ovride that using this.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canvasConfig) return;
    const ctx = canvas.getContext("2d");

    function handlePointer(
      e: React.MouseEvent<HTMLCanvasElement> | MouseEvent,
    ) {
      if (!ctx || !canvas) return;

      drawRulerPointer(e, ctx, canvas);
    }
    document.addEventListener("mousemove", (e) => handlePointer(e));
    return () =>
      document.removeEventListener("mousemove", (e) => handlePointer(e));
  });

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

    // ruler background
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
