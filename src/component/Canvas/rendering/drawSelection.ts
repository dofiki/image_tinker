import { getHandleRect } from "../utils/getHandleRect";
import type { Element } from "../../../types/index";

export function drawSelection(ctx: CanvasRenderingContext2D, el: Element) {
  ctx.save();
  /* if (el.type === "draw") {
    ctx.restore();
    return;
  }*/

  const DASH_PADDING = 5;

  ctx.translate(el.x + el.width / 2, el.y + el.height / 2);
  ctx.rotate((el.rotation * Math.PI) / 180);
  ctx.strokeStyle = "blue";
  ctx.lineWidth = 4;
  ctx.setLineDash([16, 8]);

  ctx.strokeRect(
    -el.width / 2 - DASH_PADDING,
    -el.height / 2 - DASH_PADDING,
    el.width + DASH_PADDING * 2,
    el.height + DASH_PADDING * 2,
  );

  ctx.setLineDash([]);

  // origin is now at the rectangle center because of translate().
  // so the rectangle's top-left corner becomes (-width/2, -height/2).
  // this lets rotation happen naturally around the center.
  const handles = getHandleRect({
    ...el,
    x: -el.width / 2,
    y: -el.height / 2,
  });

  handles.forEach(({ x, y, width, height }) => {
    ctx.fillStyle = "white";
    ctx.fillRect(x, y, width, height);

    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.strokeRect(x, y, width, height);
  });

  ctx.restore();
}
