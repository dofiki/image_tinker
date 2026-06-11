import type {
  DrawElement,
  ImageElement,
  RectElement,
  TextElement,
} from "../../../types";
import { getImageFromCache } from "../../MenuBar/utils/loadImage";
import type { renderElementsProps } from "../types";

export function renderElements({ elements, ctx }: renderElementsProps) {
  elements.forEach((element) => {
    if (!element.visibilityStatus) return;

    ctx.save();
    ctx.globalCompositeOperation = element.blendMode ?? "source-over";
    dispatchRender(element, ctx);
    ctx.restore();
  });
}

function dispatchRender(
  element: DrawElement | ImageElement | RectElement | TextElement,
  ctx: CanvasRenderingContext2D,
) {
  switch (element.type) {
    case "image":
      return renderImage(element, ctx);
    case "text":
      return renderText(element, ctx);
    case "draw":
      return renderDraw(element, ctx);
    case "rect":
      return renderRect(element, ctx);
  }
}

function renderImage(element: ImageElement, ctx: CanvasRenderingContext2D) {
  const imageObject = element.src ? getImageFromCache(element.src) : null;

  if (!imageObject) return;

  ctx.filter = `
    blur(${element.blur ?? 0}px)
    saturate(${element.saturate ?? 1})
    brightness(${element.brightness ?? 1})
    contrast(${element.contrast ?? 1})
    invert(${element.invert ? 1 : 0})
    opacity(${element.opacity ?? 100}%)
  `;

  ctx.translate(element.x + element.width / 2, element.y + element.height / 2);

  // degree to radian
  ctx.rotate((element.rotation * Math.PI) / 180);

  const cX = element.crop?.sx;
  const cY = element.crop?.sy;
  const cW = element.crop?.width;
  const cH = element.crop?.height;

  if (
    element.cropStatus &&
    cX !== undefined &&
    cY !== undefined &&
    cW !== undefined &&
    cH !== undefined
  ) {
    ctx.drawImage(
      imageObject,
      cX,
      cY,
      cW,
      cH,
      -element.width / 2,
      -element.height / 2,
      element.width,
      element.height,
    );
  } else {
    ctx.drawImage(
      imageObject,
      -element.width / 2,
      -element.height / 2,
      element.width,
      element.height,
    );
  }
}

function renderText(element: TextElement, ctx: CanvasRenderingContext2D) {
  const fontSize = element.fontSize ?? 20;
  const fontType = element.fontType ?? "Verdana";

  const fontParts = [
    element.boldStatus ? "bold" : "",
    element.italicStatus ? "italic" : "",
    `${fontSize}px`,
    fontType,
  ].filter(Boolean);

  ctx.font = fontParts.join(" ");
  ctx.fillStyle = element.textColor ?? "red";

  ctx.translate(element.x + element.width / 2, element.y + element.height / 2);

  ctx.rotate((element.rotation * Math.PI) / 180);

  ctx.fillText(
    element.content ?? "",
    -element.width / 2,
    -element.height / 2 + fontSize,
  );
}

function renderDraw(element: DrawElement, ctx: CanvasRenderingContext2D) {
  const points = element.drawingPoint;

  if (!points || points.length < 2) return;

  ctx.beginPath();
  ctx.moveTo(element.startPoint[0], element.startPoint[1]);

  for (let i = 0; i < points.length; i += 2) {
    ctx.lineTo(points[i], points[i + 1]);
  }

  ctx.strokeStyle = element.strokeStyle ?? "black";
  ctx.lineWidth = Number(element.lineWidth) || 10;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.stroke();
}

function renderRect(element: RectElement, ctx: CanvasRenderingContext2D) {
  ctx.globalAlpha = (element.opacity ?? 100) / 100;

  ctx.translate(element.x + element.width / 2, element.y + element.height / 2);

  ctx.rotate((element.rotation * Math.PI) / 180);

  ctx.beginPath();

  ctx.rect(
    -element.width / 2,
    -element.height / 2,
    element.width,
    element.height,
  );

  ctx.fillStyle = element.fillStyle;
  ctx.strokeStyle = element.strokeStyle;

  ctx.fill();
  ctx.stroke();
}
