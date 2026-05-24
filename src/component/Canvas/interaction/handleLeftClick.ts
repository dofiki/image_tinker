import type { handleLeftClickProps } from "../types";
import { getCanvasCoords } from "../utils/getCanvasCoords";

export function handleLeftClick({
  e,
  textStatus,
  canvasRef,
  addElement,
  setTextOverlay,
  textareaRef,
}: handleLeftClickProps) {
  if (textStatus) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const { x: mouseX, y: mouseY } = getCanvasCoords(e, canvas);
    const id = crypto.randomUUID();

    addElement({
      name: null,
      id,
      type: "text",
      x: mouseX,
      y: mouseY,
      width: 200,
      height: 30,
      src: null,
      content: null,
      fontSize: 20,
      textColor: "black",
      fontType: "Verdana",
      visibilityStatus: true,
      blur: undefined,
      saturate: undefined,
      saturationStatus: undefined,
      brightness: undefined,
      brightnessStatus: undefined,
      contrast: undefined,
      contrastStatus: undefined,
      invert: undefined,
      invertStatus: undefined,
      opacity: 100,
      blendMode: "source-over",
    });

    setTextOverlay({ x: mouseX, y: mouseY, id });
    setTimeout(() => textareaRef.current?.focus(), 0);
  }
}
