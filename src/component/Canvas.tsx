import { useEffect, useRef } from "react";
import { useEditorStore } from "../store/useEditorStore";
import { getImageFromCache } from "../utils/LoadImage";
const Canvas = () => {
  const { canvasConfig, elements } = useEditorStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canvasConfig) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // background
    ctx.fillStyle = canvasConfig.color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // drawing all elements
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
  }, [elements, canvasConfig]);

  if (!canvasConfig) return;

  return (
    <canvas
      ref={canvasRef}
      width={canvasConfig.width}
      height={canvasConfig.height}
      style={{ border: "1px solid black" }}
    />
  );
};

export default Canvas;
