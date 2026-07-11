import type { Element } from "../../../types";

interface LinePanelProps {
  element: Element;
  update: (patch: Partial<Element>) => void;
}

export const LinePanel = ({ element, update }: LinePanelProps) => {
  if (element.type !== "line") return;
  return (
    <div className="flex flex-col gap-4 pt-4">
      <hr className="text-accent" />

      <div className="grid grid-cols-2 items-center px-4">
        <div className="text-sm text-normtex">Color</div>
        <input
          type="color"
          value={element.strokeStyle}
          className="cursor-pointer"
          onChange={(e) => update({ strokeStyle: e.target.value })}
        />
      </div>
      <div className="grid grid-cols-2 items-center px-4">
        <div className="text-sm text-normtex">Line Width</div>
        <input
          type="number"
          value={element.lineWidth}
          className="w-25 input-style"
          onChange={(e) => update({ lineWidth: e.target.value })}
        />
      </div>
    </div>
  );
};
