import type { handleRulerVisibilityProps } from "../types";
import { drawRulerMarks } from "./drawRulerMarks";

export function handleRulerVisibility({
  canvas,
  ctx,
  rulerStatus,
}: handleRulerVisibilityProps) {
  if (rulerStatus) {
    // rendering ruler bg (initial)
    // vertical
    ctx.fillStyle = "#007054";
    ctx.fillRect(0, 40, 40, canvas.height);
    // horizontal
    ctx.fillStyle = "#007054";
    ctx.fillRect(40, 0, canvas.width, 40);
    // corner
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 40, 40);
    // ruler marks
    drawRulerMarks(ctx, canvas);
  } else {
    ctx.fillStyle = "#007054";
    ctx.fillRect(0, 40, 40, canvas.height);
    ctx.fillStyle = "#004744";
    ctx.fillRect(40, 0, canvas.width, 40);
  }
}
