import { create } from "zustand";

export interface ImageElement {
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

export interface EditorStore {
  canvasConfig: EditorCanvasConfig | null;
  setCanvasConfig: (config: EditorCanvasConfig) => void;

  elements: ImageElement[];
  addElement: (element: ImageElement) => void;
  updateElement: (id: string, updates: Partial<ImageElement>) => void;
  removeElement: (id: string) => void;

  selectedElementId: string | null;
  setSelectedElementId: (id: string | null) => void;
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
  removeElement: (id) =>
    set((state) => ({
      elements: state.elements.filter((el) => el.id !== id),
    })),

  selectedElementId: null,
  setSelectedElementId: (id) => set({ selectedElementId: id }),
}));
