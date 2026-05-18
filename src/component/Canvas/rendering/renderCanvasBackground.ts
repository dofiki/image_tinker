import type { renderCanvasBackgroundProps } from "../types";

export function renderCanvasBackground({
  ctx,
  canvas,
  canvasConfig,
}: renderCanvasBackgroundProps) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = canvasConfig.color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
