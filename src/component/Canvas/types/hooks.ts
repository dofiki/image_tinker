import type React from "react";
import type { CanvasConfig, Element } from "../../../types/index";

export interface CanvasRendererProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  canvasConfig: CanvasConfig | null;
  elements: Element[];
  selectedElement: Element | null;
}

export interface rulerProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  canvasConfig: CanvasConfig | null;
  rulerStatus: boolean;
}

export interface handleRulerVisibilityProps {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  rulerStatus: boolean;
}

export interface handleGridVisibilityProps {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  gridStatus: boolean;
}

export interface renderCanvasBackgroundProps {
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  canvasConfig: CanvasConfig;
}

export interface renderElementsProps {
  ctx: CanvasRenderingContext2D;
  elements: Element[];
  strokeStyle: string;
  lineWidth: number;
}
