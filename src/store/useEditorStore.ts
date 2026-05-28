import { create } from "zustand";
import type {
  EditorStore,
  Element,
  Commands,
  CanvasConfig,
} from "../types/index";

function dispatch(commands: Commands, elements: Element[], past: Commands[]) {
  const MAX_HISTORY = 30;

  return {
    elements: commands.execute(elements),
    past: [...past, commands].slice(-MAX_HISTORY),
    future: [],
  };
}

export const useEditorStore = create<EditorStore>((set, get) => ({
  past: [],
  future: [],

  canvasConfig: null,
  setCanvasConfig: (config) =>
    set((state) => ({
      canvasConfig: state.canvasConfig
        ? ({ ...state.canvasConfig, ...config } as CanvasConfig)
        : (config as CanvasConfig),
    })),
  elements: [],
  setElements: (newElements) => {
    const { elements, past } = get();
    const temp = [...elements];

    const commands: Commands = {
      execute: (_elements: Element[]) => [...newElements],
      reverse: (_elements: Element[]) => [...temp],
    };

    set(dispatch(commands, elements, past));
  },
  addElement: (newElement) => {
    const { elements, past } = get();

    const commands: Commands = {
      execute: (els) => [...els, newElement],
      reverse: (els) => els.filter((el) => el.id !== newElement.id),
    };

    set(dispatch(commands, elements, past));
  },

  updateElement: (id, updates) => {
    const { elements, past } = get();

    const original = elements.find((el) => el.id === id);
    if (!original) return;

    const commands: Commands = {
      execute: (els) =>
        els.map((el) =>
          el.id === id ? ({ ...el, ...updates } as Element) : el,
        ),

      reverse: (els) => els.map((el) => (el.id === id ? original : el)),
    };

    set(dispatch(commands, elements, past));
  },

  removeElement: (id) => {
    const { elements, past } = get();

    const target = elements.find((el) => el.id === id);
    const targetIndex = elements.findIndex((el) => el.id === id);
    if (!target) return;

    const command: Commands = {
      execute: (els) => els.filter((el) => el.id !== id),
      reverse: (els) => {
        const result = [...els];
        result.splice(targetIndex, 0, target);
        return result;
      },
    };

    set(dispatch(command, elements, past));
  },

  undo: () => {
    const { past, elements, future } = get();
    if (past.length === 0) return;

    const command = past[past.length - 1];

    set({
      past: past.slice(0, -1),
      elements: command.reverse(elements),
      future: [command, ...future],
    });
  },

  redo: () => {
    const { past, elements, future } = get();
    if (future.length === 0) return;

    const command = future[0];

    set({
      past: [...past, command],
      elements: command.execute(elements),
      future: future.slice(1),
    });
  },

  selectedElementId: null,
  setSelectedElementId: (id) => set({ selectedElementId: id }),

  rulerStatus: true,
  setRulerStatus: (rulerStatus: boolean) => set({ rulerStatus: rulerStatus }),

  gridStatus: false,
  setGridStatus: (gridStatus: boolean) => set({ gridStatus: gridStatus }),
}));
