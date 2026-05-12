import ToolBar from "./component/ToolBar/ToolBar";
import { useEditorStore } from "./store/useEditorStore";
import { Canvas } from "./component/Canvas/Canvas";
import { useState, useRef } from "react";
import { MenuBar } from "./component/MenuBar/MenuBar";
import Properties from "./component/Properties/Properties";
import Layers from "./component/Layers/Layers";
import { MdWarning } from "react-icons/md";

export default function App() {
  const { canvasConfig, selectedElementId, elements } = useEditorStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const selectedElement =
    elements.find((el) => el.id === selectedElementId) ?? null;
  const [moveStatus, setMoveStatus] = useState(false);
  const [textStatus, setTextStatus] = useState(false);
  const [ignoreStatus, setIgnoreStatus] = useState(false);

  return (
    <>
      <div className="flex flex-col relative h-screen w-screen overflow-hidden">
        <MenuBar
          canvasRef={canvasRef}
          onMoveStatus={setMoveStatus}
          onTextStatus={setTextStatus}
        />
        <div className="flex pl-2 pr-2 pt-2 bg-[#004744] h-screen">
          <ToolBar
            moveStatus={moveStatus}
            onMoveStatus={setMoveStatus}
            textStatus={textStatus}
            onTextStatus={setTextStatus}
          />{" "}
          <div
            className=" h-[90vh] w-[80vw] flex justify-center 
          items-center"
          >
            {canvasConfig && (
              <Canvas
                canvasRef={canvasRef}
                moveStatus={moveStatus}
                textStatus={textStatus}
              />
            )}
          </div>
          <div className="flex flex-col w-100 h-full overflow-hidden">
            <div className="h-220 bg-[#002322]">
              {selectedElementId ? (
                <Properties element={selectedElement} />
              ) : (
                <span className="text-gray-400">Nothing Selected.</span>
              )}
            </div>{" "}
            <Layers elements={elements} selected={selectedElement} />
          </div>{" "}
          <div
            className={`absolute md:hidden h-40 z-9999999 bg-red-300 p-2
           ${ignoreStatus ? "hidden" : "flex"} flex-col items-center text-center rounded-sm`}
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
