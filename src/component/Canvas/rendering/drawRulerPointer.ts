import { drawRulerMarks } from "./drawRulerMarks";
import { getCanvasCoords } from "../utils/getCanvasCoords";

export function drawRulerPointer(
  e: React.MouseEvent<HTMLCanvasElement> | MouseEvent,
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
) {
  const { x, y } = getCanvasCoords(e, canvas);

  // Vertical ruler
  ctx.fillStyle = "#172038";
  ctx.fillRect(0, 25, 25, canvas.height);
  ctx.fillStyle = "#aecee3";
  ctx.fillRect(0, y, 25, 10);

  // Horizontal ruler
  ctx.fillStyle = "#172038";
  ctx.fillRect(25, 0, canvas.width, 25);
  ctx.fillStyle = "#aecee3";
  ctx.fillRect(x, 0, 10, 25);

  // Marks on top of gray background
  drawRulerMarks(ctx, canvas);

  // Corner
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 25, 25);
}
