import { getCanvasCoords } from "../utils/getCanvasCoords";

export function renderRuler(
  e: React.MouseEvent<HTMLCanvasElement> | MouseEvent,
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
) {
  const { x, y } = getCanvasCoords(e, canvas);

  // Vertical ruler
  ctx.fillStyle = "#2d2d2d";
  ctx.fillRect(0, 25, 25, canvas.height);
  ctx.fillStyle = "#999999";
  ctx.fillRect(0, y, 25, 10);

  // Horizontal ruler
  ctx.fillStyle = "#2d2d2d";
  ctx.fillRect(25, 0, canvas.width, 25);
  ctx.fillStyle = "#999999";
  ctx.fillRect(x, 0, 10, 25);

  // Marks on top of gray background
  renderRulerMarks(ctx, canvas);
  // Corner
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 25, 25);
}

export function renderRulerMarks(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
) {
  ctx.fillStyle = "#999999";

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
