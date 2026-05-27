import type { Element, ElementUpdate } from "./elements";
import type { CanvasConfig } from "./canvas";
import type { Commands } from "./commands";

export interface EditorStore {
  // undo redo stack
  past: Commands[];
  future: Commands[];

  // canvas config
  canvasConfig: CanvasConfig | null;
  setCanvasConfig: (config: Partial<CanvasConfig> | CanvasConfig) => void;

  // elements
  elements: Element[];
  setElements: (element: Element[]) => void;

  addElement: (element: Element) => void;
  updateElement: (id: string | undefined, update: ElementUpdate) => void;
  removeElement: (id: string) => void;

  // undo redo
  undo: () => void;
  redo: () => void;

  // selection
  selectedElementId: string | null;
  setSelectedElementId: (id: string | null) => void;

  // view
  rulerStatus: boolean;
  setRulerStatus: (rulerStatus: boolean) => void;
  gridStatus: boolean;
  setGridStatus: (rulerStatus: boolean) => void;

  // draw default value
  strokeStyle: string;
  lineWidth: number;
  setStrokeStyle: (strokeStyle: string) => void;
  setLineWidth: (lineWidth: number) => void;
}
