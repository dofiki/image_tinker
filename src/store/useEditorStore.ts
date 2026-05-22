import { create } from "zustand";
import type { EditorStore, Element } from "../types/index";
import type { Commands } from "../types/commands";

function dispatch(commands: Commands, elements: Element[], past: Commands[]) {
  return {
    elements: commands.execute(elements),
    past: [...past, commands],
    future: [],
  };
}

export const useEditorStore = create<EditorStore>((set, get) => ({
  past: [],
  future: [],

  canvasConfig: null,
  setCanvasConfig: (config) => set({ canvasConfig: config }),

  elements: [],

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
