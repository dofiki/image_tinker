import ToolBar from "./component/ToolBar";
import { useEditorStore } from "./store/useEditorStore";
import { Canvas } from "./component/Canvas";
import { useState } from "react";

export default function App() {
  const { canvasConfig } = useEditorStore();
  const [moveStatus, setMoveStatus] = useState(false);
  const [textStatus, setTextStatus] = useState(false);

  return (
    <>
      <div className="flex pt-5 pl-4 bg-[#004744] h-screen">
        <ToolBar
          moveStatus={moveStatus}
          onMoveStatus={setMoveStatus}
          textStatus={textStatus}
          onTextStatus={setTextStatus}
        />{" "}
        {canvasConfig && (
          <Canvas moveStatus={moveStatus} textStatus={textStatus} />
        )}
      </div>
    </>
  );
}
