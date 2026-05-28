import type { Element } from "../../../types";

interface PositionSizePanelProps {
  element: Element;
  update: (patch: Partial<Element>) => void;
}

export const PositionSizePanel = ({
  element,
  update,
}: PositionSizePanelProps) => {
  return (
    <>
      <div className="grid grid-cols-3 items-center px-4">
        <div className="text-sm text-green-500">Position</div>
        <div className="relative">
          <input
            type="number"
            className="w-25 ml-5 input-style"
            value={element.x.toFixed()}
            onChange={(e) => update({ x: +e.target.value })}
          />
          <div className="properties-btn-label ">X</div>
        </div>
        <div className="relative">
          <input
            type="number"
            className="w-25 ml-5 input-style"
            value={element.y.toFixed()}
            onChange={(e) => update({ y: +e.target.value })}
          />
          <div className="properties-btn-label ">Y</div>
        </div>
      </div>

      <div className="grid grid-cols-3 items-center px-4">
        <div className="text-sm text-green-500">Size</div>
        <div className="relative">
          <input
            type="number"
            className="w-25 ml-5 input-style"
            value={element.height.toFixed()}
            onChange={(e) => update({ height: +e.target.value })}
          />
          <div className="properties-btn-label ">H</div>
        </div>
        <div className="relative">
          <input
            type="number"
            className="w-25 ml-5 input-style"
            value={element.width.toFixed()}
            onChange={(e) => update({ width: +e.target.value })}
          />
          <div className="properties-btn-label">W</div>
        </div>
      </div>

      <div className="grid grid-cols-2 items-center px-4">
        <div className="text-sm text-green-500 relative">Rotation</div>
        <div className="text-white/50 absolute right-53 text-sm">
          {element.rotation}&deg;
        </div>
        <input
          type="range"
          min={0}
          max={360}
          value={element.rotation}
          className="slider"
          onChange={(e) => update({ rotation: +e.target.value })}
        />
      </div>
    </>
  );
};
