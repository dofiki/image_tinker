export function drawRulerMarks(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
) {
  ctx.fillStyle = "black";
  // Vertical marks
  for (let i = 0; i < 3; i++) {
    const oneThird = canvas.height / 3;
    ctx.fillRect(0, 40 + i * oneThird, 40, 10);
    for (let j = 0; j < 9; j++) {
      ctx.fillRect(25, 40 + j * (oneThird / 3), 15, 5);
    }
  }
  // Horizontal marks
  for (let i = 0; i < 3; i++) {
    const oneThird = canvas.width / 3;
    ctx.fillRect(40 + i * oneThird, 0, 10, 40);
    for (let j = 0; j < 9; j++) {
      ctx.fillRect(40 + j * (oneThird / 3), 25, 5, 15);
    }
  }
}
