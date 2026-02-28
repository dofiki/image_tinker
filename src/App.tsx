import ToolBar from "./component/ToolBar";
import { useEditorStore } from "./store/useEditorStore";
import { Canvas } from "./component/Canvas";
import { useState, useRef } from "react";

export default function App() {
  const { canvasConfig } = useEditorStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [moveStatus, setMoveStatus] = useState(false);
  const [textStatus, setTextStatus] = useState(false);

  return (
    <>
      <div className="flex pt-5 pl-4 bg-[#004744] h-screen">
        <ToolBar
          canvasRef={canvasRef}
          moveStatus={moveStatus}
          onMoveStatus={setMoveStatus}
          textStatus={textStatus}
          onTextStatus={setTextStatus}
        />{" "}
        {canvasConfig && (
          <Canvas
            canvasRef={canvasRef}
            moveStatus={moveStatus}
            textStatus={textStatus}
          />
        )}
      </div>
    </>
  );
}
