import type { Element } from "../../../types";

interface CirclePanelProps {
  element: Element;
  update: (patch: Partial<Element>) => void;
}

export const CirclePanel = ({ element, update }: CirclePanelProps) => {
  if (element.type !== "circle") return;
  return (
    <div className="flex flex-col gap-4 pt-4">
      <hr className="text-accent" />

      <div className="grid grid-cols-2 items-center px-4">
        <div className="text-sm text-normtex">Border</div>
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
      <div className="grid grid-cols-2 items-center px-4">
        <div className="text-sm text-normtex">Radius</div>
        <input
          type="number"
          value={element.radius}
          className="w-25 input-style"
          onChange={(e) => update({ radius: Number(e.target.value) })}
        />
      </div>

      <div className="grid grid-cols-2 items-center px-4">
        <div className="text-sm text-normtex">Start Angle</div>
        <input
          type="number"
          value={element.startAngle}
          className="w-25 input-style"
          onChange={(e) => update({ startAngle: Number(e.target.value) })}
        />
      </div>
      <div className="grid grid-cols-2 items-center px-4">
        <div className="text-sm text-normtex">End Angle</div>
        <input
          type="number"
          value={element.endAngle}
          className="w-25 input-style"
          onChange={(e) => update({ endAngle: Number(e.target.value) })}
        />
      </div>
    </div>
  );
};
