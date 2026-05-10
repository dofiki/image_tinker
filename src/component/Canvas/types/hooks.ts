import type React from "react";
import type { CanvasConfig, Element } from "../../../types/index";

export interface CanvasRendererProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  canvasConfig: CanvasConfig | null;
  elements: Element[];
  selectedElement: Element | null;
}
