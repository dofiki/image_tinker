import ToolBar from "./component/ToolBar/ToolBar";
import { useEditorStore } from "./store/useEditorStore";
import { Canvas } from "./component/Canvas";
import { useState, useRef, useEffect } from "react";
import { MenuBar } from "./component/MenuBar";
import Properties from "./component/Properties";
import Layers from "./component/Layers";
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
  const [ignoreStatus, setIgnoreStatus] = useState(false);
  const [zoom, setZoom] = useState(1);
  const zoomRef = useRef(1);

  const isPanning = useRef(false);
  const initialPanPosition = useRef({ x: 0, y: 0 });
  const [tempPos, setTempPos] = useState({ top: 0, left: 0 });
  const canvasContainer = useRef<HTMLDivElement | null>(null);
  const copiedElementRef = useRef<Element | null>(null);
  const MAX_W = 800;
  const MAX_H = 800;

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
    if (!canvasContainer.current || !isPanning.current || !canvasConfig) return;

    const rect = canvasContainer.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const dx = mouseX - initialPanPosition.current.x;
    const dy = mouseY - initialPanPosition.current.y;

    const scale = Math.min(1, MAX_W / canvasConfig.width, MAX_H / canvasConfig.height);
    const canvasW = canvasConfig.width * scale * zoomRef.current;
    const canvasH = canvasConfig.height * scale * zoomRef.current;

    const containerW = rect.width;
    const containerH = rect.height;

    const initLeft = (containerW - canvasW) / 2;
    const initTop = (containerH - canvasH) / 2;

    const padH = canvasH * 0.8;
    const padW = canvasW * 1.2;

    setTempPos(prev => ({
      top: Math.max(initTop - padH, Math.min(prev.top + dy, initTop + padH)),
      left: Math.max(initLeft - padW, Math.min(prev.left + dx, initLeft + padW)),
    }));

    initialPanPosition.current = { x: mouseX, y: mouseY };
  }

  function handleMouseUp() {
    isPanning.current = false;
  }

  function handlePanStatus(val: boolean) {
    setPanStatus(val);
    
  }

  useEffect(() => {
    if (!canvasContainer.current || !canvasConfig) return;

    const observer = new ResizeObserver(() => {
      if (!canvasContainer.current) return;
      const rect = canvasContainer.current.getBoundingClientRect();
      const scale = Math.min(1, MAX_W / canvasConfig.width, MAX_H / canvasConfig.height);
      setTempPos({
        top: (rect.height - canvasConfig.height * scale * zoomRef.current) / 2,
        left: (rect.width - canvasConfig.width * scale * zoomRef.current) / 2,
      });
    });

    observer.observe(canvasContainer.current);
    return () => observer.disconnect();
  }, [canvasConfig]);

  return (
    <>
      <div className="flex flex-col relative h-auto md:h-screen 
      w-screen md:overflow-hidden">
        <MenuBar
          canvasRef={canvasRef}
          onMoveStatus={setMoveStatus}
          onTextStatus={setTextStatus}
          copiedElementRef={copiedElementRef}
        />
        <div className="flex flex-col md:flex-row gap-4 justify-between
         pl-2 pr-2 pt-5 bg-background h-full md:h-screen">
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
            />
          </div>
          <div
            className={`absolute md:hidden h-30 w-80 left-1/2 top-1/2
              -translate-x-1/2 -translate-y-1/2 z-9999999 bg-red-300 p-2
              ${ignoreStatus ? "hidden" : "flex"} flex-col items-center
              text-center rounded-sm`}
          >
            <MdWarning size={45} />
            For the best experience, use this photo editor on a desktop or laptop.
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