import type { Element } from "../../types/elements";
import { FaEye } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaEyeSlash } from "react-icons/fa6";
import { useEditorStore } from "../../store/useEditorStore";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { useRef } from "react";

const Layers = ({
  elements,
  selected,
  onTextStatus,
  onMoveStatus,
  onDrawStatus,
}: {
  elements: Element[];
  selected: Element | null;
  onMoveStatus: (arg0: boolean) => void;
  onTextStatus: (arg0: boolean) => void;
  onDrawStatus: (arg0: boolean) => void;
}) => {
  const { updateElement, setSelectedElementId, removeElement, setElements } =
    useEditorStore();

  const draggingItem = useRef<null | number>(null);
  const draggingOverItem = useRef<null | number>(null);

  function handleMoveStatus() {
    onTextStatus(false);
    onMoveStatus(true);
    onDrawStatus(false);
  }

  function handleDragStart(index: number) {
    draggingItem.current = index;
  }

  function handleDragEnter(index: number) {
    draggingOverItem.current = index;
    console.log("end:" + index);
  }

  function handleDragEnd() {
    if (draggingItem.current === null || draggingOverItem.current === null)
      return;
    const canvasContext = [...elements].reverse();

    const draggingItemContent = canvasContext[draggingItem.current];
    canvasContext.splice(draggingItem.current, 1);
    canvasContext.splice(draggingOverItem.current, 0, draggingItemContent);

    draggingItem.current = null;
    draggingOverItem.current = null;

    setElements(canvasContext.reverse());
  }

  return (
    <div className="bg-[#002322] h-60 text-white rounded-sm">
      <div className="flex justify-between items-center px-3 border-b border-[#013836] w-full h-10">
        <div>
          {" "}
          <span
            className="text-[0.7rem] font-bold text-green-500 
                uppercase tracking-widest "
          >
            Layers
          </span>
        </div>
      </div>
      <div
        className="h-50 overflow-scroll md:overflow-scroll md:overflow-x-hidden "
        id="layers"
      >
        {[...elements].reverse().map((el, index) => (
          <div
            key={el.id}
            className="bg-black/50 flex items-center  
            justify-between cursor-pointer w-full pr-2 h-10 border-b border-white/30"
            onClick={() => {
              setSelectedElementId(el.id);
              handleMoveStatus();
            }}
            onDragStart={() => handleDragStart(index)}
            onDragEnter={() => handleDragEnter(index)}
            onDragEnd={handleDragEnd}
            draggable
          >
            <div
              className="bg-black/30 py-1 w-8 h-full flex justify-center 
            items-center text-white/80 hover:text-green-500 cursor-grab"
            >
              <PiDotsThreeVerticalBold size={20} />
            </div>
            <div>
              {el.visibilityStatus ? (
                <FaEye
                  className={`cursor-pointer hover:text-blue-500 transition-all ease-in
                 ${el.id === selected?.id ? "" : "dont-point"} `}
                  onClick={() =>
                    updateElement(el.id, { visibilityStatus: false })
                  }
                />
              ) : (
                <FaEyeSlash
                  className={`cursor-pointer hover:text-blue-500 transition-all ease-in
                 ${el.id === selected?.id ? "" : "dont-point"} `}
                  onClick={() =>
                    updateElement(el.id, { visibilityStatus: true })
                  }
                />
              )}
            </div>
            <div
              className={`select-none ${el.id === selected?.id ? "text-green-500" : "opacity-35"}
               transition-all ease-in`}
            >
              {el.type === "text" ? el.content?.slice(0, 5) : el.type}
            </div>{" "}
            <select
              value={el.blendMode ?? "source-over"}
              onChange={(e) =>
                updateElement(el.id, {
                  blendMode: e.target.value as GlobalCompositeOperation,
                })
              }
              className={`select-none ${el.id === selected?.id ? "select" : "select dont-point"}`}
            >
              <option value="source-over">normal</option>
              <option value="multiply">multiply</option>
              <option value="screen">screen</option>
              <option value="overlay">overlay</option>
              <option value="darken">darken</option>
              <option value="lighten">lighten</option>
              <option value="color-dodge">color-dodge</option>
              <option value="color-burn">color-burn</option>
              <option value="hard-light">hard-light</option>
              <option value="soft-light">soft-light</option>
              <option value="difference">difference</option>
              <option value="exclusion">exclusion</option>
              <option value="hue">hue</option>
              <option value="saturation">saturation</option>
              <option value="color">color</option>
              <option value="luminosity">luminosity</option>
            </select>
            <div>
              <RiDeleteBin6Line
                className={`cursor-pointer hover:text-red-500 transition-all ease-in
                 ${el.id === selected?.id ? "" : "dont-point"} `}
                onClick={() => removeElement(el.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Layers;
