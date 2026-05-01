import ToolBar from "./component/ToolBar/ToolBar";
import { useEditorStore } from "./store/useEditorStore";
import { Canvas } from "./component/Canvas/Canvas";
import { useState, useRef } from "react";
import { MenuBar } from "./component/MenuBar/MenuBar";
import Properties from "./component/Properties/Properties";
export default function App() {
  const { canvasConfig, selectedElementId, elements } = useEditorStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const selectedElement =
    elements.find((el) => el.id === selectedElementId) ?? null;
  const [moveStatus, setMoveStatus] = useState(false);
  const [textStatus, setTextStatus] = useState(false);

  return (
    <>
      <div className="h-screen w-screen overflow-hidden">
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
            </div>
            <div className="bg-[#002322] h-full text-white">
              <div className="px-3 pt-3 pb-2 border-b border-[#013836]">
                <span
                  className="text-[0.7rem] font-bold text-[#009b6a] 
                uppercase tracking-widest"
                >
                  Layers
                </span>
              </div>
            </div>
          </div>{" "}
        </div>
      </div>
    </>
  );
}
