import type { handleGridVisibilityProps } from "../types";

export function handleGridVisibility({
  ctx,
  canvas,
  gridStatus,
}: handleGridVisibilityProps) {
  if (gridStatus) {
    ctx.fillStyle = "black";
    // Vertical line
    const oneThirdV = canvas.width / 3;
    ctx.fillRect(25 + oneThirdV, 25, 4, canvas.height);
    ctx.fillRect(25 + oneThirdV * 2, 25, 4, canvas.height);
    // hoizontal line
    const oneThirdH = canvas.height / 3;
    ctx.fillRect(25, 25 + oneThirdH, canvas.width, 4);
    ctx.fillRect(25, 25 + oneThirdH * 2, canvas.width, 4);
  }
}
