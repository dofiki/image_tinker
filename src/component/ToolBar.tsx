import { useState, useRef } from "react";
import LoadImage from "../utils/LoadImage";
import ScaleImageToCanvas from "../utils/ScaleImageToCanvas";
import { useEditorStore } from "../store/useEditorStore";
import { CreateCanvasModel } from "./CreateCanvasModel";
const ToolBar = () => {
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
    const imgObj = await LoadImage(src);

    // scale image to the canvas
    const { width, height, x, y } = ScaleImageToCanvas({
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
            <button className="bg-red-200 cursor-pointer">move</button>
          </div>
        </div>
        <div>
          {showCanvasModal && (
            <CreateCanvasModel setCanvasModel={setShowCanvasModal} />
          )}
        </div>
      </div>
    </>
  );
};

export default ToolBar;
