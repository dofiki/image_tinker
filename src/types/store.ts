import type { Element } from "./elements";

export interface CanvasConfig {
  name: string;
  width: number;
  height: number;
  color: string;
}

export interface Commands {
  execute: (elements: Element[]) => Element[];
  reverse: (elements: Element[]) => Element[];
}

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
  updateElement: (id: string | undefined, update: Partial<Element>) => void;
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
}
