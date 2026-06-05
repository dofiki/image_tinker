import type React from "react";
import type { Element } from "../../../types/index";
import type { Dispatch } from "react";

export interface MouseDownProps {
  e: React.MouseEvent<HTMLCanvasElement>;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  drawId: React.MutableRefObject<string | null>;
  rectId: React.MutableRefObject<string | null>;
  rectOrigin: React.MutableRefObject<{ x: number; y: number }>;
  moveStatus: boolean;
  drawStatus: boolean;
  rectStatus: boolean;
  panStatus: boolean;
  elements: Element[];
  selectedElement: Element | null;
  setSelectedElementId: (id: string | null) => void;
  isDragging: React.MutableRefObject<boolean>;
  isDrawing: React.MutableRefObject<boolean>;
  dragOffset: React.MutableRefObject<{ x: number; y: number }>;
  dragElementId: React.MutableRefObject<string | null>;
  isResizing: React.MutableRefObject<boolean>;
  isPanning :React.MutableRefObject<boolean>;
  initialPanPosition: React.MutableRefObject<{x: number; y:number}>
  resizeHandle: React.MutableRefObject<string>;
  resizeOrigin: React.MutableRefObject<{ x: number; y: number }>;
  resizePivot: React.MutableRefObject<{ x: number; y: number }>;
  resizeLocalAnchor: React.MutableRefObject<{ x: number; y: number }>;
  addElement: (element: Element) => void;
}

export interface MouseMoveProps {
  e: React.MouseEvent<HTMLCanvasElement>;
  drawStatus: boolean;
  drawId: React.MutableRefObject<string | null>;
  rectId: React.MutableRefObject<string | null>;
  rectOrigin: React.MutableRefObject<{ x: number; y: number }>;
  isPanning: React.MutableRefObject<boolean>;
  setTempPos: Dispatch<{top:number, left:number}>;
  initialPanPosition: React.MutableRefObject<{x: number; y:number}>
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  selectedElement: Element | null;
  updateElement: (id: string, updates: Partial<Element>) => void;
  elements: Element[];

  isDragging: React.MutableRefObject<boolean>;
  dragOffset: React.MutableRefObject<{ x: number; y: number }>;
  dragElementId: React.MutableRefObject<string | null>;
  isResizing: React.MutableRefObject<boolean>;
  isDrawing: React.MutableRefObject<boolean>;
  resizeHandle: React.MutableRefObject<string>;
  resizeOrigin: React.MutableRefObject<{ x: number; y: number }>;
  resizePivot: React.MutableRefObject<{ x: number; y: number }>;
  resizeLocalAnchor: React.MutableRefObject<{ x: number; y: number }>;
}
