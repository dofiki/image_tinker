import { useState } from "react";
import { useEditorStore } from "../../../store/useEditorStore";

export const CreateCanvas = ({
  setCanvasModel,
}: {
  setCanvasModel: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { setCanvasConfig } = useEditorStore();

  const [canvasHeight, setCanvasHeight] = useState<number>(1080);
  const [canvasWidth, setCanvasWidth] = useState<number>(1080);
  const [canvasColor, setCanvasColor] = useState<string>("#ffffff");
  const [canvasName, setCanvasName] = useState<string>("example");

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
        <div className="flex flex-col md:flex-row ">
          <div
            className="w-100 h-100 bg-green-500 rounded-l-sm
           text-black/10  font-extrabold text-6xl flex items-end"
          >
            Image Tinker
          </div>
          <div className="pt-4 pl-5 pr-5 pb-5 w-70">
            <div className="h-10  flex items-center font-bold">
              Create Canvas
            </div>

            <div className="flex flex-col gap-1 pt-4">
              <label className="text-sm">Project Name :</label>
              <input
                type="text"
                value={canvasName}
                onChange={(e) => setCanvasName(e.target.value)}
                className="input-style"
              />
            </div>

            <div className="flex pt-4 gap-4">
              <div className="flex flex-col justify-around gap-1 relative">
                <label className="text-sm">Wdith : </label>
                <input
                  type="number"
                  min={5}
                  max={5000}
                  value={canvasWidth}
                  onChange={(e) => {
                    setCanvasWidth(Number(e.target.value));
                  }}
                  className="input-style"
                />
                <div className="absolute top-8.5 right-2 text-[0.8rem] font-bold text-white/50 z-999">
                  Px
                </div>
              </div>
              <div className="flex flex-col justify-around gap-1 relative">
                <label className="text-sm">Height :</label>
                <input
                  type="number"
                  min={5}
                  max={5000}
                  value={canvasHeight}
                  onChange={(e) => {
                    setCanvasHeight(Number(e.target.value));
                  }}
                  className="input-style"
                />
                <div className="absolute top-8.5 right-2 text-[0.8rem] font-bold text-white/50 z-999">
                  Px
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-col gap-2">
              <label className="text-sm">Background : </label>
              <input
                type="color"
                value={canvasColor}
                onChange={(e) => setCanvasColor(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="mt-4 px-4 py-1.5 rounded-md text-sm font-semibold cursor-pointer
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
