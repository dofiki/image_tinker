import type { handleGridVisibilityProps } from "../types";

export function handleGridVisibility({
  ctx,
  canvas,
  gridStatus,
}: handleGridVisibilityProps) {
  if (gridStatus) {
    ctx.fillStyle = "green";
    // Vertical line
    const oneThirdV = canvas.width / 3;
    ctx.fillRect(40 + oneThirdV, 40, 10, canvas.height);
    ctx.fillRect(40 + oneThirdV * 2, 40, 10, canvas.height);
    // hoizontal line
    const oneThirdH = canvas.height / 3;
    ctx.fillRect(40, 40 + oneThirdH, canvas.width, 10);
    ctx.fillRect(40, 40 + oneThirdH * 2, canvas.width, 10);
  }
}
