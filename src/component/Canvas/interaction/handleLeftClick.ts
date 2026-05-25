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
      width: 400,
      height: 50,
      src: null,
      content: null,
      fontSize: 40,
      textColor: "#000000",
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
      boldStatus: false,
      italicStatus: false,
    });

    setTextOverlay({ x: mouseX, y: mouseY, id });
    setTimeout(() => textareaRef.current?.focus(), 0);
  }
}
