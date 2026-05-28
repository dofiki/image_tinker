import type { Element } from "../../../types";
export interface LayerRowProps {
  el: Element;
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (patch: Partial<Element>) => void;
  onRemove: () => void;
  onDragStart: () => void;
  onDragEnter: () => void;
  onDragEnd: () => void;
}
