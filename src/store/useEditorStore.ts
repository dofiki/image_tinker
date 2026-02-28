import { create } from "zustand";
import type { EditorStore, Element } from "../types/index";

export const useEditorStore = create<EditorStore>((set) => ({
  canvasConfig: null,
  setCanvasConfig: (config) => set({ canvasConfig: config }),

  elements: [],
  addElement: (element) =>
    set((state) => ({ elements: [...state.elements, element] })),

  updateElement: (id, updates) =>
    set((state) => ({
      elements: state.elements.map((el) =>
        el.id === id ? ({ ...el, ...updates } as Element) : el,
      ),
    })),

  removeElement: (id) =>
    set((state) => ({
      elements: state.elements.filter((el) => el.id !== id),
    })),

  selectedElementId: null,
  setSelectedElementId: (id) => set({ selectedElementId: id }),
}));
