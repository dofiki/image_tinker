import ToolBar from "./component/ToolBar/ToolBar";
import { useEditorStore } from "./store/useEditorStore";
import { Canvas } from "./component/Canvas";
import { useState, useRef } from "react";
import { MenuBar } from "./component/MenuBar";
import Properties from "./component/Properties";
import Layers from "./component/Layers";
import { MdWarning } from "react-icons/md";

export default function App() {
  const { canvasConfig, selectedElementId, elements } = useEditorStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const selectedElement =
    elements.find((el) => el.id === selectedElementId) ?? null;
  const [moveStatus, setMoveStatus] = useState(false);
  const [textStatus, setTextStatus] = useState(false);
  const [drawStatus, setDrawStatus] = useState(false);
  const [rectStatus, setRectStatus] = useState(false);
  const [ignoreStatus, setIgnoreStatus] = useState(false);

  return (
    <>
      <div
        className="flex flex-col relative h-auto
       md:h-screen w-screen md:overflow-hidden"
      >
        <MenuBar
          canvasRef={canvasRef}
          onMoveStatus={setMoveStatus}
          onTextStatus={setTextStatus}
        />
        <div
          className="flex flex-col md:flex-row gap-4
           justify-between pl-2 pr-2 pt-2 bg-[#004744]
            h-full md:h-screen"
        >
          <ToolBar
            moveStatus={moveStatus}
            onMoveStatus={setMoveStatus}
            textStatus={textStatus}
            onTextStatus={setTextStatus}
            drawStatus={drawStatus}
            onDrawStatus={setDrawStatus}
            rectStatus={rectStatus}
            onRectStatus={setRectStatus}
          />{" "}
          <div
            className=" max-h-[90vh] w-full md:w-[78vw]
             md:max-w-[80vw] flex justify-center 
             items-center "
          >
            {canvasConfig && (
              <Canvas
                canvasRef={canvasRef}
                moveStatus={moveStatus}
                textStatus={textStatus}
                drawStatus={drawStatus}
                rectStatus={rectStatus}
              />
            )}
          </div>
          <div
            className="flex flex-col w-full md:w-100 h-full 
             gap-4"
          >
            <Properties element={selectedElement} />

            <Layers
              elements={elements}
              selected={selectedElement}
              onMoveStatus={setMoveStatus}
              onTextStatus={setTextStatus}
              onDrawStatus={setDrawStatus}
              onRectStatus={setRectStatus}
            />
          </div>
          <div
            className={`absolute md:hidden h-40 w-80 left-1/2 top-1/2
              -translate-x-1/2 -translate-y-1/2 z-9999999 bg-red-300 p-2
              ${ignoreStatus ? "hidden" : "flex"} flex-col items-center 
              text-center rounded-sm`}
          >
            <MdWarning size={35} />
            For the best experience, use this photo editor on a desktop or
            laptop.
            <button
              className="bg-green-700 text-white p-2 mt-4 rounded-sm"
              onClick={() => setIgnoreStatus(true)}
            >
              Ignore
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
