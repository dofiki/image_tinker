import type { Element, ElementUpdate } from "./elements";
import type { CanvasConfig } from "./canvas";

export interface EditorStore {
  // canvas config
  canvasConfig: CanvasConfig | null;
  setCanvasConfig: (config: CanvasConfig) => void;

  // elements
  elements: Element[];
  addElement: (element: Element) => void;
  updateElement: (id: string, update: ElementUpdate) => void;
  removeElement: (id: string) => void;

  // selection
  selectedElementId: string | null;
  setSelectedElementId: (id: string | null) => void;
}
