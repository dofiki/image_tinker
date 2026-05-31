export function drawRulerMarks(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
) {
  ctx.fillStyle = "black";

  // Vertical marks
  for (let i = 0; i < 3; i++) {
    const oneThird = canvas.height / 3;
    ctx.fillRect(0, 40 + i * oneThird, 40, 4);
    for (let j = 0; j < 9; j++) {
      ctx.fillRect(25, 40 + j * (oneThird / 3), 15, 2);
    }
  }
  // Horizontal marks
  for (let i = 0; i < 3; i++) {
    const oneThird = canvas.width / 3;
    ctx.fillRect(40 + i * oneThird, 0, 4, 40);
    for (let j = 0; j < 9; j++) {
      ctx.fillRect(40 + j * (oneThird / 3), 25, 2, 15);
    }
  }
}
