import ToolBar from "./component/ToolBar";
import { useEditorStore } from "./store/useEditorStore";
import Canvas from "./component/Canvas";

export default function App() {
  const { canvasConfig } = useEditorStore();
  return (
    <>
      <div className="flex">
        <ToolBar />
        {canvasConfig && <Canvas />}
      </div>
    </>
  );
}
