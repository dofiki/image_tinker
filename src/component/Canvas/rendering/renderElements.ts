import { getImageFromCache } from "../../MenuBar/utils/loadImage";
import type { renderElementsProps } from "../types";

export function renderElements({ elements, ctx }: renderElementsProps) {
  elements.forEach((element) => {
    if (!element.visibilityStatus) return;
    // isolate canvas state so filters and blendmodes
    //  don't leak into other elements
    ctx.save();
    ctx.globalCompositeOperation = element.blendMode ?? "source-over";

    if (element.type === "image") {
      const imageObject = element.src ? getImageFromCache(element.src) : null;

      if (imageObject) {
        ctx.filter = `
          blur(${element.blur ?? 0}px)
          saturate(${element.saturate ?? 1})
          brightness(${element.brightness ?? 1})
          contrast(${element.contrast ?? 1})
          invert(${element.invert ? 1 : 0})
          opacity(${element.opacity ?? 100}%)
        `;

        ctx.drawImage(
          imageObject,
          element.x,
          element.y,
          element.width,
          element.height,
        );
      }
    } else if (element.type === "text") {
      ctx.font = `${element.fontSize ?? 20}px ${element.fontType ?? "Verdana"}`;

      ctx.fillStyle = element.textColor ?? "red";

      ctx.fillText(
        element.content ?? "",
        element.x,
        element.y + (element.fontSize ?? 20),
      );
    }

    ctx.restore();
  });
}
