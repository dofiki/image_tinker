import { getHandleRect } from "../utils/getHandleRect";
import type { Element } from "../../../types/index";

export function drawSelection(ctx: CanvasRenderingContext2D, el: Element) {
  const dashPadding = 4;
  const handles = getHandleRect(el);

  ctx.save();

  ctx.strokeStyle = "#0099ff";
  ctx.lineWidth = 2;
  ctx.setLineDash([6, 3]);
  ctx.strokeRect(
    el.x - dashPadding,
    el.y - dashPadding,
    el.width + dashPadding * 2,
    el.height + dashPadding * 2,
  );

  ctx.setLineDash([]);
  handles.forEach(({ x, y, width, height }) => {
    ctx.fillStyle = "white";
    ctx.fillRect(x, y, width, height);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.strokeRect(x, y, width, height);
  });

  ctx.restore();
}
