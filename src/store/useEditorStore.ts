import { create } from "zustand";

export interface EditorElement {
  id: string;
  type: "image";
  x: number;
  y: number;
  width: number;
  height: number;
  src: string;
}

export interface EditorCanvasConfig {
  width: number;
  height: number;
  color: string;
}

export interface ImageElement {
  id: string;
  type: "image";
  x: number;
  y: number;
  width: number;
  height: number;
  src: string;
}

export interface EditorStore {
  selectedElementId: string | null;
  setSelectedElementId: (id: string | null) => void;
  canvasConfig: EditorCanvasConfig | null;
  setCanvasConfig: (config: EditorCanvasConfig) => void;
  elements: EditorElement[];
  addElement: (element: EditorElement) => void;
  updateElement: (id: string, updates: Partial<EditorElement>) => void;
}
export const useEditorStore = create<EditorStore>((set) => ({
  canvasConfig: null,
  setCanvasConfig: (config) => set({ canvasConfig: config }),

  elements: [],
  addElement: (element) =>
    set((state) => ({ elements: [...state.elements, element] })),

  updateElement: (id, updates) =>
    set((state) => ({
      elements: state.elements.map((el) =>
        el.id === id ? { ...el, ...updates } : el,
      ),
    })),

  removeElement: (id: string) =>
    set((state) => ({
      elements: state.elements.filter((el) => el.id !== id),
    })),

  selectedElementId: null,
  setSelectedElementId: (id) => set({ selectedElementId: id }),
}));
