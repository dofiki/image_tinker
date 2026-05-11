import { useState } from "react";
import { useEditorStore } from "../../../store/useEditorStore";

const PRESETS = [
  { label: "Instagram Post", width: 1080, height: 1080 },
  { label: "Instagram Story", width: 1080, height: 1920 },
  { label: "Instagram Reel", width: 1080, height: 1920 },
  { label: "A4 Portrait", width: 794, height: 1123 },
  { label: "A4 Landscape", width: 1123, height: 794 },
  { label: "Twitter Post", width: 1200, height: 675 },
  { label: "YouTube Thumb", width: 1280, height: 720 },
  { label: "YouTube Banner", width: 2560, height: 1440 },
  { label: "Facebook Post", width: 1200, height: 630 },
  { label: "Facebook Cover", width: 820, height: 312 },
  { label: "LinkedIn Post", width: 1200, height: 627 },
  { label: "LinkedIn Banner", width: 1584, height: 396 },
  { label: "Presentation HD", width: 1920, height: 1080 },
  { label: "Presentation 4:3", width: 1024, height: 768 },
  { label: "Mobile Screen", width: 390, height: 844 },
  { label: "Desktop Full HD", width: 1920, height: 1080 },
  { label: "Poster Large", width: 2480, height: 3508 },
];

export const CreateCanvas = ({
  setCanvasModel,
}: {
  setCanvasModel: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { setCanvasConfig } = useEditorStore();

  const [canvasHeight, setCanvasHeight] = useState<number>(1080);
  const [canvasWidth, setCanvasWidth] = useState<number>(1080);
  const [canvasColor, setCanvasColor] = useState<string>("#ffffff");
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [canvasName, setCanvasName] = useState<string>("example");

  function applyPreset(preset: (typeof PRESETS)[0]) {
    setCanvasWidth(preset.width);
    setCanvasHeight(preset.height);
    setActivePreset(preset.label);
  }

  function handleConfirmCreation(e: React.SyntheticEvent) {
    e.preventDefault();
    setCanvasConfig({
      name: canvasName,
      width: canvasWidth,
      height: canvasHeight,
      color: canvasColor,
    });
    setCanvasModel(false);
  }

  return (
    <div className="absolute top-0 left-0 z-9999 bg-black/85  w-screen h-screen">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-9999
     w-full flex justify-center px-4"
      >
        <form
          onSubmit={handleConfirmCreation}
          className="bg-[#002322] text-white rounded-md w-[60vw] max-w-5xl min-w-[320px]
           shadow-xl border border-[#013836]"
        >
          {/* Header */}
          <div className="px-5 pt-4 pb-3 border-b border-[#013836]">
            <span className="text-xs font-bold text-[#009b6a] uppercase tracking-widest">
              Create Canvas
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* LEFT: PRESETS */}
            <div className="p-4 border-b md:border-b-0 md:border-r border-[#013836]">
              <span className="text-xs text-[#009b6a] uppercase tracking-wider mb-3 block">
                Presets
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-100 overflow-y-auto pr-1">
                {PRESETS.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => applyPreset(preset)}
                    className={`text-left px-3 py-2 rounded text-xs leading-tight transition-colors ${
                      activePreset === preset.label
                        ? "bg-[#009b6a] text-white"
                        : "bg-[#013836] hover:bg-[#024a43] text-gray-300"
                    }`}
                  >
                    <div className="font-medium">{preset.label}</div>
                    <div
                      className={`text-[10px] mt-1 ${
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

            {/* RIGHT: CUSTOM SETTINGS */}
            <div className="p-5 flex flex-col gap-4">
              <span className="text-xs text-[#009b6a] uppercase tracking-wider">
                Custom Size
              </span>

              <div className="flex gap-3 flex-col">
                <div className="flex-1 flex flex-col gap-1">
                  <label className="text-xs text-gray-400">Project Name</label>
                  <input
                    type="text"
                    min={5}
                    max={20}
                    value={canvasName}
                    onChange={(e) => {
                      setCanvasName(e.target.value);
                    }}
                    className="bg-[#013836] text-white text-sm px-3 py-2 rounded outline-none 
                    border border-transparent focus:border-[#009b6a]"
                  />
                </div>
                <div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-gray-400">Width</label>
                    <input
                      type="number"
                      min={5}
                      max={5000}
                      value={canvasWidth}
                      onChange={(e) => {
                        setCanvasWidth(Number(e.target.value));
                        setActivePreset(null);
                      }}
                      className="bg-[#013836] text-white text-sm px-3 py-2 rounded outline-none 
                    border border-transparent focus:border-[#009b6a]"
                    />
                  </div>

                  <div className="flex-1 flex flex-col gap-1">
                    <label className="text-xs text-gray-400">Height</label>
                    <input
                      type="number"
                      min={5}
                      max={5000}
                      value={canvasHeight}
                      onChange={(e) => {
                        setCanvasHeight(Number(e.target.value));
                        setActivePreset(null);
                      }}
                      className="bg-[#013836] text-white text-sm px-3 py-2 rounded outline-none border 
                    border-transparent focus:border-[#009b6a]"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs text-gray-400">Background</label>
                <div className="flex items-center gap-3 bg-[#013836] px-3 py-2 rounded">
                  <input
                    type="color"
                    value={canvasColor}
                    onChange={(e) => setCanvasColor(e.target.value)}
                    className="w-6 h-6 rounded cursor-pointer bg-transparent border-none outline-none"
                  />
                  <span className="text-sm text-gray-300 font-mono">
                    {canvasColor.toUpperCase()}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="mt-2 w-full bg-[#009b6a] hover:bg-[#00b87d] text-white 
                text-sm font-semibold py-2 rounded cursor-pointer transition-colors uppercase 
                tracking-wider"
              >
                Create Canvas
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
