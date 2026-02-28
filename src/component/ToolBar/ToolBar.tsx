import { useState, useRef } from "react";
import { useEditorStore } from "../../store/useEditorStore";
import { CreateCanvas } from "../ToolBar/_component/CreateCanvas";
import scaleImageToCanvas from "./utils/scaleImageToCanvas";
import loadImage from "./utils/loadImage";
import { MdOutlineScreenshotMonitor } from "react-icons/md";
import { FaImage } from "react-icons/fa";
import { LuMove } from "react-icons/lu";
import { RiTextSnippet } from "react-icons/ri";
import { FaRegSave } from "react-icons/fa";
import type { ToolBarProps } from "../../types/index";

const ToolBar = ({
  canvasRef,
  moveStatus,
  onMoveStatus,
  textStatus,
  onTextStatus,
}: ToolBarProps) => {
  const [showCanvasModal, setShowCanvasModal] = useState(false);
  const { canvasConfig, addElement } = useEditorStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleCreateCanvas() {
    setShowCanvasModal(!showCanvasModal);
  }

  function handleAddImage() {
    if (!canvasConfig) {
      alert("Please create a canvas first!");
      return;
    }
    fileInputRef.current?.click();
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    // image (raw) is stored in files
    const file = e.target.files?.[0];
    if (!file || !canvasConfig) return;

    // file to object URL
    const src = URL.createObjectURL(file);

    // load image
    const imgObj = await loadImage(src);

    // scale image to the canvas
    const { width, height, x, y } = scaleImageToCanvas({
      imgWidth: imgObj.naturalWidth,
      imgHeight: imgObj.naturalHeight,
      canvasWidth: canvasConfig.width,
      canvasHeight: canvasConfig.height,
    });

    console.log(width, height, x, y);

    // push image to the store
    addElement({
      id: crypto.randomUUID(),
      type: "image",
      x,
      y,
      width,
      height,
      src,
      content: null,
      fontSize: undefined,
      textColor: undefined,
      fontType: undefined,
    });

    // resetting the input value
    e.target.value = "";
  }

  function handleMoveStatus() {
    onMoveStatus(!moveStatus);
    onTextStatus(false);
  }

  function handleTextStatus() {
    onTextStatus(!textStatus);
    onMoveStatus(false);
  }

  function handleSaveCanvas() {
    onMoveStatus(false);
    onTextStatus(false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");

    const a = document.createElement("a");
    a.href = url;
    a.download = "my-drawing.png";
    a.click();
    a.remove();
  }

  return (
    <>
      <div className="flex flex-row">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <div>
          <div
            className="flex flex-col items-center bg-[#002322] text-white w-12
          justify-center gap-2 rounded-[0.2rem] pb-2"
          >
            <div className="font-bold text-[0.8rem] text-[#009b6a] mt-2">
              Tools
            </div>
            <button
              className="flex items-center justify-center cursor-pointer hover:bg-[#013836] w-full h-full p-2"
              onClick={handleCreateCanvas}
            >
              <MdOutlineScreenshotMonitor size={25} />
            </button>
            <button
              className="flex items-center justify-center cursor-pointer hover:bg-[#013836] w-full h-full p-2"
              onClick={handleAddImage}
            >
              <FaImage size={20} />
            </button>
            <button
              className={` flex items-center justify-center  hover:bg-[#013836] 
                w-full h-full p-2 cursor-pointer ${moveStatus ? "text-[#009b6a]" : "text-white"}`}
              onClick={handleMoveStatus}
            >
              <LuMove size={22} />
            </button>

            <button
              className={`flex items-center justify-center cursor-pointer hover:bg-[#013836] w-full h-full p-2
              ${textStatus ? "text-[#009b6a]" : "text-white"}`}
              onClick={handleTextStatus}
            >
              <RiTextSnippet size={25} />
            </button>

            <button
              className={`flex items-center justify-center cursor-pointer hover:bg-[#013836] w-full h-full p-2`}
              onClick={handleSaveCanvas}
            >
              <FaRegSave size={22} />
            </button>
          </div>
        </div>
        <div className="pl-4">
          {showCanvasModal && (
            <CreateCanvas setCanvasModel={setShowCanvasModal} />
          )}
        </div>
      </div>
    </>
  );
};

export default ToolBar;
