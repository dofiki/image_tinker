import type { Element } from "../../../types/index";

type HandlePosition = "top-left" | "top-right" | "bottom-left" | "bottom-right";

export interface HandleRect {
  x: number;
  y: number;
  width: number;
  height: number;
  position: HandlePosition;
}

const HANDLE_PADDING = 8;
const HANDLE_SIZE = 20;

export function getHandleRect(el: Element): HandleRect[] {
  return [
    {
      x: el.x - HANDLE_PADDING,
      y: el.y - HANDLE_PADDING,
      width: HANDLE_SIZE,
      height: HANDLE_SIZE,
      position: "top-left",
    },
    {
      x: el.x - HANDLE_PADDING + el.width,
      y: el.y - HANDLE_PADDING,
      width: HANDLE_SIZE,
      height: HANDLE_SIZE,
      position: "top-right",
    },
    {
      x: el.x - HANDLE_PADDING,
      y: el.y - HANDLE_PADDING + el.height,
      width: HANDLE_SIZE,
      height: HANDLE_SIZE,
      position: "bottom-left",
    },
    {
      x: el.x - HANDLE_PADDING + el.width,
      y: el.y - HANDLE_PADDING + el.height,
      width: HANDLE_SIZE,
      height: HANDLE_SIZE,
      position: "bottom-right",
    },
  ];
}
