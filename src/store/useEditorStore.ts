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

export interface EditorStore {
  canvasConfig: EditorCanvasConfig | null;
  setCanvasConfig: (config: EditorCanvasConfig) => void;
  elements: EditorElement[];
  addElement: (element: EditorElement) => void;
}

export const useEditorStore = create<EditorStore>((set) => ({
  canvasConfig: null,
  setCanvasConfig: (config: EditorCanvasConfig) =>
    set({ canvasConfig: config }),

  elements: [],
  addElement: (element: EditorElement) =>
    set((state) => ({ elements: [...state.elements, element] })),
}));
