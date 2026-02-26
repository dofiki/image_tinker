import { useState } from "react";
import { useEditorStore } from "../store/useEditorStore";

const PRESETS = [
  { label: "Instagram Post", width: 1080, height: 1080 },
  { label: "Instagram Story", width: 1080, height: 1920 },
  { label: "A4 Portrait", width: 794, height: 1123 },
  { label: "A4 Landscape", width: 1123, height: 794 },
  { label: "Twitter Post", width: 1200, height: 675 },
  { label: "YouTube Thumb", width: 1280, height: 720 },
  { label: "Facebook Cover", width: 820, height: 312 },
  { label: "Presentation", width: 1920, height: 1080 },
];

export const CreateCanvas = ({
  setCanvasModel,
}: {
  setCanvasModel: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { setCanvasConfig } = useEditorStore();
  const [canvasHeight, setCanvasHeight] = useState<number>(500);
  const [canvasWidth, setCanvasWidth] = useState<number>(500);
  const [canvasColor, setCanvasColor] = useState<string>("#ffffff");
  const [activePreset, setActivePreset] = useState<string | null>(null);

  function applyPreset(preset: (typeof PRESETS)[0]) {
    setCanvasWidth(preset.width);
    setCanvasHeight(preset.height);
    setActivePreset(preset.label);
  }

  function handleConfirmCreation(e: React.SyntheticEvent) {
    e.preventDefault();
    setCanvasConfig({
      width: canvasWidth,
      height: canvasHeight,
      color: canvasColor,
    });
    setCanvasModel(false);
  }

  return (
    <div className="absolute z-50">
      <form
        onSubmit={handleConfirmCreation}
        className="bg-[#002322] text-white rounded-[0.2rem] w-56 shadow-xl border border-[#013836]"
      >
        <div className="px-3 pt-3 pb-2 border-b border-[#013836]">
          <span className="text-[0.7rem] font-bold text-[#009b6a] uppercase tracking-widest">
            Canvas Size
          </span>
        </div>

        <div className="p-2 border-b border-[#013836]">
          <span className="text-[0.65rem] text-[#009b6a] uppercase tracking-wider px-1 mb-1.5 block">
            Presets
          </span>
          <div className="grid grid-cols-2 gap-1">
            {PRESETS.map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => applyPreset(preset)}
                className={`text-left px-2 py-1.5 rounded-[0.15rem] text-[0.65rem] leading-tight
                   transition-colors cursor-pointer ${
                     activePreset === preset.label
                       ? "bg-[#009b6a] text-white"
                       : "bg-[#013836] hover:bg-[#024a43] text-gray-300"
                   }`}
              >
                <div className="font-medium">{preset.label}</div>
                <div
                  className={`text-[0.58rem] mt-0.5 ${
                    activePreset === preset.label
                      ? "text-[#b2ffe3]"
                      : "text-[#009b6a]"
                  }`}
                >
                  {preset.width} × {preset.height}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="p-3 flex flex-col gap-2">
          <span className="text-[0.65rem] text-[#009b6a] uppercase tracking-wider -mb-1">
            Custom
          </span>

          <div className="flex gap-2">
            <div className="flex-1 flex flex-col gap-1">
              <label className="text-[0.65rem] text-gray-400">Width</label>
              <input
                type="number"
                min={5}
                max={5000}
                value={canvasWidth}
                onChange={(e) => {
                  setCanvasWidth(Number(e.target.value));
                  setActivePreset(null);
                }}
                className="bg-[#013836] text-white text-[0.75rem] px-2 py-1 rounded-[0.15rem] 
                outline-none border border-transparent focus:border-[#009b6a] w-full"
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <label className="text-[0.65rem] text-gray-400">Height</label>
              <input
                type="number"
                min={5}
                max={5000}
                value={canvasHeight}
                onChange={(e) => {
                  setCanvasHeight(Number(e.target.value));
                  setActivePreset(null);
                }}
                className="bg-[#013836] text-white text-[0.75rem] px-2 py-1 rounded-[0.15rem] 
                outline-none border border-transparent focus:border-[#009b6a] w-full"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[0.65rem] text-gray-400">Background</label>
            <div className="flex items-center gap-2 bg-[#013836] px-2 py-1 rounded-[0.15rem]">
              <input
                type="color"
                value={canvasColor}
                onChange={(e) => setCanvasColor(e.target.value)}
                className="w-5 h-5 rounded cursor-pointer bg-transparent border-none outline-none"
              />
              <span className="text-[0.7rem] text-gray-300 font-mono">
                {canvasColor.toUpperCase()}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="mt-1 w-full bg-[#009b6a] hover:bg-[#00b87d] text-white text-[0.75rem] 
            font-semibold py-1.5 rounded-[0.15rem] cursor-pointer transition-colors uppercase tracking-wider"
          >
            Create Canvas
          </button>
        </div>
      </form>
    </div>
  );
};
