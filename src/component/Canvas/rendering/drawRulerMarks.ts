export function drawRulerMarks(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
) {
  ctx.fillStyle = "#aecee3";

  // Vertical marks
  for (let i = 0; i < 3; i++) {
    const oneThird = canvas.height / 3;
    ctx.fillRect(0, 25 + i * oneThird, 25, 4);
    for (let j = 0; j < 9; j++) {
      ctx.fillRect(10, 25 + j * (oneThird / 3), 15, 2);
    }
  }
  // Horizontal marks
  for (let i = 0; i < 3; i++) {
    const oneThird = canvas.width / 3;
    ctx.fillRect(25 + i * oneThird, 0, 4, 25);
    for (let j = 0; j < 9; j++) {
      ctx.fillRect(25 + j * (oneThird / 3), 10, 2, 15);
    }
  }
}
