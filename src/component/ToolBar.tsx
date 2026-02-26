import { useState, useRef } from "react";
import { useEditorStore } from "../store/useEditorStore";
import { CreateCanvas } from "./CreateCanvas";
import scaleImageToCanvas from "../utils/scaleImageToCanvas";
import loadImage from "../utils/loadImage";

interface ToolBarProps {
  moveStatus: boolean;
  onMoveStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

const ToolBar = ({ moveStatus, onMoveStatus }: ToolBarProps) => {
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
    });

    // resetting the input value
    e.target.value = "";
  }

  return (
    <>
      <div className="flex flex-col">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <div>
          <div className="flex flex-col items-center bg-amber-100 w-50 justify-center gap-5">
            <div className="font-bold">toolbar</div>
            <button
              className="bg-red-200 cursor-pointer"
              onClick={handleCreateCanvas}
            >
              create canvas
            </button>
            <button
              className="bg-red-200 cursor-pointer"
              onClick={handleAddImage}
            >
              add image
            </button>
            <button
              className={`cursor-pointer ${moveStatus ? "bg-green-200" : "bg-red-200"}`}
              onClick={() => onMoveStatus(!moveStatus)}
            >
              move
            </button>
          </div>
        </div>
        <div>
          {showCanvasModal && (
            <CreateCanvas setCanvasModel={setShowCanvasModal} />
          )}
        </div>
      </div>
    </>
  );
};

export default ToolBar;
