import { useEffect, useRef, useState } from "react";
import FileOption from "./_components/FileOption";
import EditOption from "./_components/EditOption";
import FilterOption from "./_components/FilterOption";
import ViewOption from "./_components/ViewOption";
import { CreateCanvas } from "../MenuBar/_components/CreateCanvas";
import scaleImageToCanvas from "./utils/scaleImageToCanvas";
import loadImage from "./utils/loadImage";
import { useEditorStore } from "../../store/useEditorStore";
import type { MenuBarProps } from "./types";
export const MenuBar = ({
  canvasRef,
  onMoveStatus,
  onTextStatus,
}: MenuBarProps) => {
  const [activeOption, setActiveOption] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [showCanvasModal, setShowCanvasModal] = useState(true);
  const { elements, canvasConfig, addElement, selectedElementId } =
    useEditorStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // outside click
  useEffect(() => {
    function handleClickOutside(event: Event) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveOption(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // adding image
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

    // push image to the store
    addElement({
      name: null,
      id: crypto.randomUUID(),
      type: "image",
      x,
      y,
      width,
      height,
      rotation: 0,
      src,
      content: null,
      fontSize: undefined,
      textColor: undefined,
      fontType: undefined,
      visibilityStatus: true,
      blur: 0,
      saturate: 1,
      saturationStatus: undefined,
      brightness: 1,
      brightnessStatus: undefined,
      contrast: 1,
      contrastStatus: undefined,
      invert: false,
      invertStatus: undefined,
      opacity: 100,
      blendMode: "source-over",
    });

    // resetting the input value
    e.target.value = "";
  }

  // saving image
  function handleSaveCanvas() {
    onMoveStatus(false);
    onTextStatus(false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");

    const a = document.createElement("a");
    a.href = url;
    a.download = `${canvasConfig?.name}.png`;
    a.click();
    a.remove();
  }

  // exporting Element context
  function handleElementContext() {
    const data = JSON.stringify(elements, null, 2);
    const blob = new Blob([data], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ElementContextJSON.json";
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    // Cleanup
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <>
      {" "}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      <div ref={menuRef} className="h-10 flex bg-[#00302d] text-white">
        <ul className="flex gap-2 p-2 items-center text-sm cursor-pointer">
          <li
            onClick={() =>
              setActiveOption(activeOption === "file" ? null : "file")
            }
            className="hover:bg-[#001b19] pl-2 pr-2 pt-0.5 pb-0.5 rounded-sm"
          >
            File
            {activeOption === "file" && (
              <FileOption
                onCreateCanvas={() => setShowCanvasModal(true)}
                onHandleImage={handleAddImage}
                onHandleSave={handleSaveCanvas}
                onHandleElement={handleElementContext}
              />
            )}
          </li>
          <li
            onClick={() =>
              setActiveOption(activeOption === "edit" ? null : "edit")
            }
            className="hover:bg-[#001b19] pl-2 pr-2 pt-0.5 pb-0.5 rounded-sm"
          >
            Edit
            {activeOption === "edit" && <EditOption />}
          </li>
          <li
            onClick={() =>
              setActiveOption(activeOption === "filter" ? null : "filter")
            }
            className={`hover:bg-[#001b19] ${selectedElementId ? "text-white" : "text-gray-600"}
             pl-2 pr-2 pt-0.5 pb-0.5 rounded-sm`}
          >
            Filter
            {activeOption === "filter" && <FilterOption />}
          </li>
          <li
            onClick={() =>
              setActiveOption(activeOption === "view" ? null : "view")
            }
            className="hover:bg-[#001b19] pl-2 pr-2 pt-0.5 pb-0.5 rounded-sm"
          >
            View
            {activeOption === "view" && <ViewOption />}
          </li>
        </ul>
      </div>
      <div className="pl-4">
        {showCanvasModal && (
          <CreateCanvas setCanvasModel={setShowCanvasModal} />
        )}
      </div>
    </>
  );
};
