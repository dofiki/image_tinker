import type { handleLeftClickProps } from "../types";
import { getCanvasCoords } from "../utils/getCanvasCoords";

export function handleLeftClick({
  e,
  textStatus,
  canvasRef,
  addElement,
  setTextOverlay,
  textareaRef,
  colorPickerStatus,
  globalColor,
  setGlobalColor,
}: handleLeftClickProps) {
  if (colorPickerStatus) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    const { x: mouseX, y: mouseY } = getCanvasCoords(e, canvas);

    const pixel = ctx?.getImageData(mouseX, mouseY, 1, 1);
    const data = pixel?.data;
    if (!data) return;

    const toHex = (n: number): string => {
      // 255 -> "ff", 10 -> "a", 0 -> "0"
      const hex = n.toString(16);
      // "a" -> "0a", "ff" -> "ff"
      return hex.padStart(2, "0");
    };

    const [r, g, b] = [data[0], data[1], data[2]];
    const hexColor = `#${toHex(r)}${toHex(g)}${toHex(b)}`;

    setGlobalColor(hexColor);
  }

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
