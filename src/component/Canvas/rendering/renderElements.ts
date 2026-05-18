import { getImageFromCache } from "../../MenuBar/utils/loadImage";
import type { renderElementsProps } from "../types";

export function renderElements({ elements, ctx }: renderElementsProps) {
  elements.forEach((element) => {
    if (element.visibilityStatus) {
      if (element.type === "image") {
        const imageObject = element.src ? getImageFromCache(element.src) : null;
        if (imageObject) {
          ctx.save();
          ctx.filter = `blur(${element.blur ?? 0}px) saturate(${element.saturate ?? 1}) 
            brightness(${element.brightness ?? 1}) contrast(${element.contrast}) 
            invert(${element.invert ? "1" : "0"}) opacity(${element.opacity}%)`;
          ctx.drawImage(
            imageObject,
            element.x,
            element.y,
            element.width,
            element.height,
          );
          ctx.restore();
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
    }
  });
}
