import type { handleRulerVisibilityProps } from "../types";
import { renderRulerMarks } from "./renderRuler";

export function handleRulerVisibility({
  canvas,
  ctx,
  rulerStatus,
}: handleRulerVisibilityProps) {
  if (rulerStatus) {
    // rendering ruler bg (initial)
    // vertical
    ctx.fillStyle = "#2d2d2d";
    ctx.fillRect(0, 25, 25, canvas.height);
    // horizontal
    ctx.fillStyle = "#2d2d2d";
    ctx.fillRect(25, 0, canvas.width, 25);
    // corner
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 25, 25);
    // ruler marks
    renderRulerMarks(ctx, canvas);
  } else {
    ctx.fillStyle = "#2d2d2d";
    ctx.fillRect(0, 25, 25, canvas.height);
    ctx.fillStyle = "#2d2d2d";
    ctx.fillRect(25, 0, canvas.width, 25);
  }
}
