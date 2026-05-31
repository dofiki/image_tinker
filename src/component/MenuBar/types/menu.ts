import type { Element } from "../../../types";

export interface MenuBarProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  onMoveStatus: React.Dispatch<React.SetStateAction<boolean>>;
  onTextStatus: React.Dispatch<React.SetStateAction<boolean>>;
  copiedElementRef: React.MutableRefObject<Element | null>;
}
