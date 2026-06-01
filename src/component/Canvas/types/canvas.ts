import type { TextElement } from "../../../types";
import type { Element } from "../../../types";
interface setTextOverlayPops {
  x: number;
  y: number;
  id: string;
}

export interface CanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  moveStatus: boolean;
  textStatus: boolean;
  drawStatus: boolean;
  rectStatus: boolean;
  copiedElementRef: React.MutableRefObject<Element | null>;
}

export interface handleLeftClickProps {
  e: React.MouseEvent<HTMLCanvasElement, MouseEvent>;
  textStatus: boolean;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  addElement: (element: TextElement) => void;
  setTextOverlay: (arg: setTextOverlayPops) => void;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
}
