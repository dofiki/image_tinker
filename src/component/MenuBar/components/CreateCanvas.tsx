import { useState } from "react";
import { useEditorStore } from "../../../store/useEditorStore";
import { PresetIcon, PRESETS } from "./Preset";

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
      width: canvasWidth + 25,
      height: canvasHeight + 25,
      color: canvasColor,
    });
    setCanvasModel(false);
  }

  return (
    <div
      className="absolute top-0 left-0 bg-black/70 w-screen h-screen
     text-white m-0 p-0 z-9999 flex justify-center items-center"
    >
      <form
        onSubmit={handleConfirmCreation}
        className="bg-primary text-normtex rounded-sm"
      >
        <div className="h-10 pl-5 flex items-center font-bold">
          Create Canvas
        </div>
        <hr className="text-accent w-full" />
        <div className="flex">
          <div className="pt-4 pl-5 pr-5 pb-5">
            <span>Presets</span>
            <div className="flex flex-row flex-wrap w-95 gap-1 pt-4 text-sm">
              {PRESETS.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => applyPreset(preset)}
                  className={`w-30 h-32 bg-accent/18 rounded-sm flex items-center
                    flex-col justify-around p-2 gap-2 transition-colors
                    ${
                      activePreset === preset.label
                        ? "text-green-600"
                        : "text-white hover:text-green-600"
                    }`}
                >
                  <div>{preset.label}</div>
                  <div className="flex justify-center w-full">
                    <PresetIcon width={preset.width} height={preset.height} />
                  </div>
                  <div className="text-[0.8rem] opacity-60">
                    {preset.width} × {preset.height}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 pl-5 pr-5 pb-5 border-l border-accent">
            <span>Custom Size</span>

            <div className="flex flex-col gap-1 pt-4">
              <label className="text-sm">Project Name :</label>
              <input
                type="text"
                value={canvasName}
                onChange={(e) => setCanvasName(e.target.value)}
                className="input-style"
              />
            </div>

            <div className="flex justify-around pt-4 gap-2">
              <div className="flex justify-around gap-2">
                <label className="text-sm">W : </label>
                <input
                  type="number"
                  min={5}
                  max={5000}
                  value={canvasWidth}
                  onChange={(e) => {
                    setCanvasWidth(Number(e.target.value));
                    setActivePreset(null);
                  }}
                  className="input-style"
                />
              </div>
              <div className="flex justify-around gap-2">
                <label className="text-sm">H :</label>
                <input
                  type="number"
                  min={5}
                  max={5000}
                  value={canvasHeight}
                  onChange={(e) => {
                    setCanvasHeight(Number(e.target.value));
                    setActivePreset(null);
                  }}
                  className="input-style"
                />
              </div>
            </div>

            <div className="pt-4 flex gap-2">
              <label className="text-sm">bg-color: </label>
              <input
                type="color"
                value={canvasColor}
                onChange={(e) => setCanvasColor(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="mt-4 px-4 py-1.5 rounded-md text-sm font-semibold
                bg-green-800 hover:bg-green-900 transition-all ease-in text-white"
            >
              Create Canvas
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
