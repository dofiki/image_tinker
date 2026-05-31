import { drawRulerMarks } from "./drawRulerMarks";
import { getCanvasCoords } from "../utils/getCanvasCoords";

export function drawRulerPointer(
  e: React.MouseEvent<HTMLCanvasElement> | MouseEvent,
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
) {
  const { x, y } = getCanvasCoords(e, canvas);

  // Vertical ruler
  ctx.fillStyle = "#007054";
  ctx.fillRect(0, 40, 40, canvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(0, y, 40, 10);

  // Horizontal ruler
  ctx.fillStyle = "#007054";
  ctx.fillRect(40, 0, canvas.width, 40);
  ctx.fillStyle = "black  ";
  ctx.fillRect(x, 0, 10, 40);

  // Marks on top of gray background
  drawRulerMarks(ctx, canvas);

  // Corner
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 40, 40);
}
