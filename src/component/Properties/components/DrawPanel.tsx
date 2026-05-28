import type { Element } from "../../../types";

interface DrawPanelProps {
  element: Element;
  update: (patch: Partial<Element>) => void;
}

export const DrawPanel = ({ element, update }: DrawPanelProps) => {
  if (element.type !== "draw") return;
  return (
    <div className="flex flex-col gap-4 pt-2">
      <div className="grid grid-cols-3 items-center px-4">
        <div className="text-sm text-green-500">Position</div>
        <div className="relative">
          <input
            type="number"
            className="w-25 ml-5 input-style"
            value={element.x.toFixed()}
            onChange={(e) => update({ x: +e.target.value })}
          />
          <div
            className="absolute top-2 right-2 font-bold
           text-white/50"
          >
            X
          </div>
        </div>
        <div className="relative">
          <input
            type="number"
            className="w-25 ml-5 input-style"
            value={element.y.toFixed()}
            onChange={(e) => update({ y: +e.target.value })}
          />
          <div
            className="absolute top-2 right-2 font-bold
           text-white/50"
          >
            Y
          </div>
        </div>
      </div>

      <hr className="text-white/10" />

      <div className="grid grid-cols-2 items-center px-4">
        <div className="text-sm text-green-500">Color</div>
        <input
          type="color"
          value={element.strokeStyle}
          className="cursor-pointer"
          onChange={(e) => update({ strokeStyle: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-2 items-center px-4">
        <div className="text-sm text-green-500">Line Width</div>
        <div className="relative">
          <input
            type="number"
            className="w-25 input-style"
            value={element.lineWidth}
            onChange={(e) => update({ lineWidth: e.target.value })}
          />
          <div
            className="absolute top-2 right-21 font-bold
           text-white/50"
          >
            px
          </div>
        </div>
      </div>
    </div>
  );
};
