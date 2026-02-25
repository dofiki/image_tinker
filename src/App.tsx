import ToolBar from "./component/ToolBar";
import { useEditorStore } from "./store/useEditorStore";
import { Canvas } from "./component/Canvas";
import { useState } from "react";

export default function App() {
  const { canvasConfig } = useEditorStore();
  const [moveStatus, setMoveStatus] = useState(false);

  return (
    <>
      <div className="flex">
        <ToolBar moveStatus={moveStatus} onMoveStatus={setMoveStatus} />{" "}
        {canvasConfig && <Canvas moveStatus={moveStatus} />}
      </div>
    </>
  );
}
