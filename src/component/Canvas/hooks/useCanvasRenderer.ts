import { useEffect } from "react";
import type { CanvasRendererProps } from "../types";
import { getImageFromCache } from "../../../component/MenuBar/utils/loadImage";
import { drawSelection } from "../utils/drawSelection";

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

    if (selectedElement) drawSelection(ctx, selectedElement);
  }, [elements, canvasConfig, selectedElement]);
}
