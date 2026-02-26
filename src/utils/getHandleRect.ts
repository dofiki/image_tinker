import type { ImageElement } from "../store/useEditorStore";

type HandlePosition = "top-left" | "top-right" | "bottom-left" | "bottom-right";

export interface HandleRect {
  x: number;
  y: number;
  width: number;
  height: number;
  position: HandlePosition;
}

export function getHandleRect(el: ImageElement): HandleRect[] {
  const handlePadding = 8;
  const handleSize = 15;

  return [
    {
      x: el.x - handlePadding,
      y: el.y - handlePadding,
      width: handleSize,
      height: handleSize,
      position: "top-left",
    },
    {
      x: el.x - handlePadding + el.width,
      y: el.y - handlePadding,
      width: handleSize,
      height: handleSize,
      position: "top-right",
    },
    {
      x: el.x - handlePadding,
      y: el.y - handlePadding + el.height,
      width: handleSize,
      height: handleSize,
      position: "bottom-left",
    },
    {
      x: el.x - handlePadding + el.width,
      y: el.y - handlePadding + el.height,
      width: handleSize,
      height: handleSize,
      position: "bottom-right",
    },
  ];
}
