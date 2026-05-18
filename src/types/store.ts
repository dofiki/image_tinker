import type { Element, ElementUpdate } from "./elements";
import type { CanvasConfig } from "./canvas";
import type { Commands } from "./commands";

export interface EditorStore {
  // undo redo stack
  past: Commands[];
  future: Commands[];

  // canvas config
  canvasConfig: CanvasConfig | null;
  setCanvasConfig: (config: CanvasConfig) => void;

  // elements
  elements: Element[];
  addElement: (element: Element) => void;
  updateElement: (id: string, update: ElementUpdate) => void;
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
}
