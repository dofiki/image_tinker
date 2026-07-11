import ToolBar from "./components/ToolBar/ToolBar";
import { useEditorStore } from "./store/useEditorStore";
import { Canvas } from "./components/Canvas";
import { useState, useRef, useEffect } from "react";
import { MenuBar } from "./components/MenuBar";
import Properties from "./components/Properties";
import Layers from "./components/Layers";
import { MdWarning } from "react-icons/md";
import type { Element } from "./types";
import { IoMdAdd } from "react-icons/io";
import { GrFormSubtract } from "react-icons/gr";

export default function App() {
  const { canvasConfig, selectedElementId, elements } = useEditorStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const selectedElement =
    elements.find((el) => el.id === selectedElementId) ?? null;
  const [moveStatus, setMoveStatus] = useState(false);
  const [textStatus, setTextStatus] = useState(false);
  const [drawStatus, setDrawStatus] = useState(false);
  const [rectStatus, setRectStatus] = useState(false);
  const [panStatus, setPanStatus] = useState(false);
  const [circleStatus, setCircleStatus] = useState(false);
  const [lineStatus, setLineStatus] = useState(false);

  const [zoom, setZoom] = useState(1);
  const zoomRef = useRef(1);

  const isPanning = useRef(false);
  const initialPanPosition = useRef({ x: 0, y: 0 });
  const [tempPos, setTempPos] = useState({ top: 0, left: 0 });
  const canvasContainer = useRef<HTMLDivElement | null>(null);
  const copiedElementRef = useRef<Element | null>(null);

  function handleZoomIn() {
    const next = Math.min(zoomRef.current + 0.1, 1.6);
    zoomRef.current = next;
    setZoom(next);
  }

  function handleZoomOut() {
    const next = Math.max(zoomRef.current - 0.1, 0.9);
    zoomRef.current = next;
    setZoom(next);
  }

  function handleMouseDown(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (!canvasContainer.current || !panStatus) return;
    const rect = canvasContainer.current.getBoundingClientRect();
    isPanning.current = true;
    initialPanPosition.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (
      !canvasContainer.current ||
      !isPanning.current ||
      !canvasConfig ||
      !canvasRef.current
    )
      return;

    const rect = canvasContainer.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // actual distance the mouse moved since the last event
    const dx = mouseX - initialPanPosition.current.x;
    const dy = mouseY - initialPanPosition.current.y;

    const canvas = canvasRef.current;

    // scale factor that fits the canvas inside the container
    const scale = Math.min(
      1,
      rect.height / canvas.height,
      rect.width / canvas.width,
    );

    // actual rendered dimensions of the canvas
    const scaledW = canvas.width * scale * zoomRef.current;
    const scaledH = canvas.height * scale * zoomRef.current;

    const MARGIN = 100; // minimum pixels of canvas that must remain visible

    const MIN_POSITION_Y = -(scaledH - MARGIN); // how far up the canvas can slide
    const MAX_POSITION_Y = rect.height - MARGIN; // how far down the canvas can slide
    const MIN_POSITION_X = -(scaledW - MARGIN); // how far left the canvas can slide
    const MAX_POSITION_X = rect.width - MARGIN; // how far right the canvas can slide

    setTempPos((prev) => {
      const newTop = prev.top + dy;
      const clampedTop = Math.min(newTop, MAX_POSITION_Y); // downward clamp
      const finalTop = Math.max(MIN_POSITION_Y, clampedTop); // upward clamp

      const newLeft = prev.left + dx;
      const clampedLeft = Math.min(newLeft, MAX_POSITION_X); // rightward clamp
      const finalLeft = Math.max(MIN_POSITION_X, clampedLeft); // leftward clamp

      return {
        top: finalTop,
        left: finalLeft,
      };
    });

    // update the reference point so the next event measures delta from here
    initialPanPosition.current = { x: mouseX, y: mouseY };
  }

  function handleMouseUp() {
    isPanning.current = false;
  }

  function handlePanStatus(val: boolean) {
    setPanStatus(val);
  }

  // to center canvas at initial render
  useEffect(() => {
    const container = canvasContainer.current;
    const canvas = canvasRef.current;
    if (!container || !canvas || !canvas.width || !canvas.height) return;

    const rect = container.getBoundingClientRect();
    const scale = Math.min(
      1,
      rect.height / canvas.height,
      rect.width / canvas.width,
    );
    setTempPos({
      top: (rect.height - canvas.height * scale) / 2 + 20,
      left: (rect.width - canvas.width * scale) / 2,
    });
  }, [canvasConfig]);

  return (
    <>
      <div
        className="flex flex-col relative h-auto md:h-screen 
      w-screen md:overflow-hidden"
      >
        <MenuBar
          canvasRef={canvasRef}
          onMoveStatus={setMoveStatus}
          onTextStatus={setTextStatus}
          copiedElementRef={copiedElementRef}
        />
        <div
          className="flex flex-col md:flex-row gap-4 justify-between
         pl-2 pr-2 pt-5 bg-background h-full md:h-screen"
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
            panStatus={panStatus}
            onPanStatus={handlePanStatus}
            circleStatus={circleStatus}
            onCircleStatus={setCircleStatus}
            lineStatus={lineStatus}
            onLineStatus={setLineStatus}
          />
          <div
            ref={canvasContainer}
            className={`max-h-[90vh] w-full md:w-[78vw] relative
              md:max-w-[80vw] flex justify-center rounded-sm
              items-center bg-background outline-black/10 bg-size-[24px_24px]
              bg-[radial-gradient(circle,#6e6e6e_1px,transparent_0)]
              overflow-hidden
              ${panStatus ? "cursor-grab" : "cursor-pointer"}`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {canvasConfig && (
              <Canvas
                canvasRef={canvasRef}
                moveStatus={moveStatus}
                textStatus={textStatus}
                drawStatus={drawStatus}
                rectStatus={rectStatus}
                circleStatus={circleStatus}
                lineStatus={lineStatus}
                panStatus={panStatus}
                copiedElementRef={copiedElementRef}
                tempPos={tempPos}
                zoom={zoom}
              />
            )}
            <div className="absolute bottom-5 right-5 flex flex-col gap-2 z-50">
              <button
                className="bg-white/60 p-2 rounded-sm hover:bg-white transition-all ease-in"
                onClick={handleZoomIn}
              >
                <IoMdAdd />
              </button>
              <button
                className="bg-white/60 p-2 rounded-sm hover:bg-white transition-all ease-in"
                onClick={handleZoomOut}
              >
                <GrFormSubtract />
              </button>
            </div>
          </div>
          <div className="flex flex-col w-full md:w-100 h-full gap-8">
            <Properties element={selectedElement} />
            <Layers
              elements={elements}
              selected={selectedElement}
              onMoveStatus={setMoveStatus}
              onTextStatus={setTextStatus}
              onDrawStatus={setDrawStatus}
              onRectStatus={setRectStatus}
              onCircleStatus={setCircleStatus}
              onLineStatus={setLineStatus}
            />
          </div>
          <div
            className={`absolute md:hidden h-30 w-80 left-1/2 top-1/2
              -translate-x-1/2 -translate-y-1/2 z-9999999 bg-red-300 p-2
              flex flex-col items-center
              text-center rounded-sm`}
          >
            <MdWarning size={45} />
            For the best experience, use this photo editor on a desktop or
            laptop.
            {/* <button
              className="bg-green-700 text-white p-2 mt-4 rounded-sm"
              onClick={() => setIgnoreStatus(true)}
            >
              Ignore
            </button> */}
          </div>
        </div>
      </div>
    </>
  );
}
