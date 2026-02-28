import type React from "react";
import type { CanvasConfig, Element } from "../../../types/index";

export interface CanvasRendererProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  canvasConfig: CanvasConfig | null;
  elements: Element[];
  selectedElement: Element | null;
}

export interface UseMouseDownProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  moveStatus: boolean;
  elements: Element[];
  selectedElement: Element | null;
  setSelectedElementId: (id: string | null) => void;
  isDragging: React.MutableRefObject<boolean>;
  dragOffset: React.MutableRefObject<{ x: number; y: number }>;
  dragElementId: React.MutableRefObject<string | null>;
  isResizing: React.MutableRefObject<boolean>;
  resizeHandle: React.MutableRefObject<string>;
  resizeOrigin: React.MutableRefObject<{ x: number; y: number }>;
}

export interface UseMouseMoveProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  selectedElement: Element | null;
  updateElement: (id: string, updates: Partial<Element>) => void;

  isDragging: React.MutableRefObject<boolean>;
  dragOffset: React.MutableRefObject<{ x: number; y: number }>;
  dragElementId: React.MutableRefObject<string | null>;

  isResizing: React.MutableRefObject<boolean>;
  resizeHandle: React.MutableRefObject<string>;
  resizeOrigin: React.MutableRefObject<{ x: number; y: number }>;
}
