import type { Element } from "../../types/elements";
import { FaEye } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaEyeSlash } from "react-icons/fa6";
import { useEditorStore } from "../../store/useEditorStore";
import type { ChangeEvent } from "react";

const Layers = ({
  elements,
  selected,
}: {
  elements: Element[];
  selected: Element | null;
}) => {
  const {
    updateElement,
    setSelectedElementId,
    removeElement,
    selectedElementId,
  } = useEditorStore();

  function handleSelect(e: ChangeEvent<HTMLSelectElement>) {
    if (!selectedElementId) return;
    updateElement(selectedElementId, {
      blendMode: e.target.value as GlobalCompositeOperation,
    });
  }

  return (
    <div className="bg-[#002322] h-60 text-white ">
      <div className="flex justify-between items-center px-3 border-b border-[#013836] w-full h-10">
        <div>
          {" "}
          <span
            className="text-[0.7rem] font-bold text-[#009b6a] 
                uppercase tracking-widest "
          >
            Layers
          </span>
        </div>
        <div>
          <select
            className="select"
            id="blend-modes"
            defaultValue={"source-out"}
            onChange={(e) => handleSelect(e)}
          >
            <option value="source-over">normal</option>
            <option value="screen">screen</option>
            <option value="multiply">multiply</option>
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
        </div>
      </div>
      <div
        className="h-50 overflow-scroll md:overflow-scroll md:overflow-x-hidden "
        id="layers"
      >
        {[...elements].reverse().map((el) => (
          <div
            key={el.id}
            className="bg-black/50 flex pl-5 pr-5 pt-2 pb-2 items-center 
            justify-between cursor-pointer"
            onClick={() => setSelectedElementId(el.id)}
          >
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
              className={`${el.id === selected?.id ? "text-green-500" : "opacity-35"}
               transition-all ease-in`}
            >
              {el.type === "text" ? el.content?.slice(0, 5) + "..." : el.type}
            </div>{" "}
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
