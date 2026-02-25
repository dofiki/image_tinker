import { useState } from "react";
import { useEditorStore } from "../store/useEditorStore";
export const CreateCanvasModel = ({
  setCanvasModel,
}: {
  setCanvasModel: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { setCanvasConfig } = useEditorStore();
  const [canvasHeight, setCanvasHeight] = useState<number>(0);
  const [canvasWidth, setCanvasWidth] = useState(0);
  const [canvasColor, setCanvasColor] = useState<string>("#ffffff");

  function handleConfirmCreation(e: React.SyntheticEvent) {
    e.preventDefault();
    console.log(canvasHeight, canvasWidth, canvasColor);

    setCanvasConfig({
      width: canvasWidth,
      height: canvasHeight,
      color: canvasColor,
    });

    setCanvasModel(false);
  }
  return (
    <>
      <div>
        <form
          className="bg-orange-300 w-50 flex flex-col"
          onSubmit={handleConfirmCreation}
        >
          <label htmlFor="height">Height:</label>
          <input
            placeholder="600px"
            type="number"
            min={5}
            max={2000}
            name="height"
            id="height"
            className="outline"
            value={canvasHeight}
            onChange={(e) => {
              setCanvasHeight(Number(e.target.value));
            }}
          />
          <label htmlFor="height">Width:</label>
          <input
            placeholder="900px"
            type="number"
            min={5}
            max={2000}
            name="height"
            id="height"
            className="outline"
            value={canvasWidth}
            onChange={(e) => {
              setCanvasWidth(Number(e.target.value));
            }}
          />

          <label htmlFor="height">background color:</label>
          <input
            placeholder="900px"
            type="color"
            min={5}
            max={2000}
            name="height"
            id="height"
            className="outline"
            value={canvasColor}
            onChange={(e) => {
              setCanvasColor(e.target.value);
            }}
          />

          <button className="bg-blue-300 cursor-pointer">
            confirm creation
          </button>
        </form>
      </div>
    </>
  );
};
