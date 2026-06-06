import type { Element } from "../../../types";

interface RectPanelProps {
  element: Element;
  update: (patch: Partial<Element>) => void;
}

export const RectPanel = ({ element, update }: RectPanelProps) => {
  if (element.type !== "rect") return;
  return (
    <div className="flex flex-col gap-4 pt-4">
      <hr className="text-accent" />
s
      <div className="grid grid-cols-2 items-center px-4">
        <div className="text-sm text-normtex">Fill</div>
        <input
          type="color"
          value={element.fillStyle}
          className="cursor-pointer"
          onChange={(e) => update({ fillStyle: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-2 items-center px-4">
        <div className="text-sm text-normtex">Border</div>
        <input
          type="color"
          value={element.strokeStyle}
          className="cursor-pointer"
          onChange={(e) => update({ strokeStyle: e.target.value })}
        />
      </div>
    </div>
  );
};
