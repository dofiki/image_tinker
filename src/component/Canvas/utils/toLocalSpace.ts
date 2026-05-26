export function toLocalSpace(
  px: number,
  py: number,
  cx: number,
  cy: number,
  rotationDeg: number,
): { x: number; y: number } {
  const angle = -(rotationDeg * Math.PI) / 180;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const dx = px - cx;
  const dy = py - cy;
  return {
    x: cx + dx * cos - dy * sin,
    y: cy + dx * sin + dy * cos,
  };
}
