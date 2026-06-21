export function getCanvasCoords(
  e: React.MouseEvent<HTMLCanvasElement> | MouseEvent,
  canvas: HTMLCanvasElement,
) {
  // get the canvas position and size as rendered on screen (css pixels)
  const rect = canvas.getBoundingClientRect();

  // lets say that canvas has 1000 units but is squished into 500 screen pixels,
  // so every screen pixel represents 2 canvas units. scale captures that ratio.
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  return {
    // subtract rect.left/top to get position relative to canvas edge,
    // then multiply by scale to convert from css pixels to canvas units
    x: (e.clientX - rect.left) * scaleX,
    y: (e.clientY - rect.top) * scaleY,
  };
}
