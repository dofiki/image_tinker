import { getImageFromCache } from "../../MenuBar/utils/loadImage";
import type { renderElementsProps } from "../types";

export function renderElements({ elements, ctx }: renderElementsProps) {
  elements.forEach((element) => {
    if (!element.visibilityStatus) return;

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

        // move the canvas origin (originally at (0, 0)) to the center of the element
        ctx.translate(
          element.x + element.width / 2,
          element.y + element.height / 2,
        );
        // rotate the canvas
        ctx.rotate((element.rotation * Math.PI) / 180);

        /*
       At this point, the canvas origin is already positioned at the center of the element. 
       If we drew the image at (0, 0), the image’s top-left corner would align with the origin.
       Instead, we want the image itself to be centered around the origin. To achieve this,
       we offset the image upward and to the left by half of its width and height.
        */
        ctx.drawImage(
          imageObject,
          -element.width / 2,
          -element.height / 2,
          element.width,
          element.height,
        );
      }
    } else if (element.type === "text") {
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

      ctx.translate(
        element.x + element.width / 2,
        element.y + element.height / 2,
      );
      ctx.rotate((element.rotation * Math.PI) / 180);

      ctx.fillText(
        element.content ?? "",
        -element.width / 2,
        -element.height / 2 + fontSize,
      );
    }
    // this resets canvas rotation as well...
    ctx.restore();
  });
}
