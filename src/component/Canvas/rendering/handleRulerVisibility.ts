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
    ctx.fillStyle = "#172038";
    ctx.fillRect(0, 25, 25, canvas.height);
    // horizontal
    ctx.fillStyle = "#172038";
    ctx.fillRect(25, 0, canvas.width, 25);
    // corner
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 25, 25);
    // ruler marks
    drawRulerMarks(ctx, canvas);
  } else {
    ctx.fillStyle = "#172038";
    ctx.fillRect(0, 25, 25, canvas.height);
    ctx.fillStyle = "#172038";
    ctx.fillRect(25, 0, canvas.width, 25);
  }
}
