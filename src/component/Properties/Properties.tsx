import { useState } from "react";
import { useEditorStore } from "../../store/useEditorStore";
import type { Element } from "../../types";
import { ImBold } from "react-icons/im";
import { FaItalic } from "react-icons/fa";

const fonts = [
  "Arial",
  "Verdana",
  "Courier New",
  "Ubuntu",
  "Noto Sans",
  "sans-serif",
  "monospace",
  "system-ui",
];

const Properties = ({ element }: { element: Element | null }) => {
  const { updateElement } = useEditorStore();
  const [invertToggle, setInvertToggle] = useState(true);

  const update = (patch: Partial<Element>) => updateElement(element?.id, patch);

  return (
    <div
      className="h-80 md:h-150 w-full bg-[#002322] border
     border-[#013836] rounded-[0.2rem] shadow-xl z-10 text-xs md:text-sm "
    >
      <div className="px-3 pt-3 pb-2 border-b border-[#013836]">
        <span
          className="text-[0.7rem] font-bold text-green-500
         uppercase tracking-widest"
        >
          {element?.type ?? "Properties"}
        </span>
      </div>

      <div
        className="flex flex-col gap-5 pt-5 h-60 md:h-auto overflow-scroll
       md:overflow-hidden pb-5"
      >
        {/* position and size : )  */}
        {element?.type && (
          <>
            {" "}
            <div className="grid grid-cols-3 items-center px-4 ">
              <div className="text-sm text-green-500">Position</div>
              <div className="relative">
                <input
                  type="number"
                  className="w-25 ml-5 input-style "
                  value={element?.x.toFixed()}
                  onChange={(e) => update({ x: +e.target.value })}
                />
                <div className="absolute top-2 right-2 font-bold text-white/50">
                  X
                </div>
              </div>
              <div className="relative">
                <input
                  type="number"
                  className="w-25 ml-5 input-style"
                  value={element?.y.toFixed()}
                  onChange={(e) => update({ y: +e.target.value })}
                />
                <div className="absolute top-2 right-2 font-bold text-white/50">
                  Y
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 items-center px-4 ">
              <div className="text-sm text-green-500">Size</div>

              <div className="relative">
                {" "}
                <input
                  type="number"
                  className="w-25 ml-5 input-style"
                  value={element?.height.toFixed()}
                  onChange={(e) => update({ height: +e.target.value })}
                />
                <div className="absolute top-2 right-2 font-bold text-white/50">
                  H
                </div>
              </div>
              <div className="relative">
                <input
                  type="number"
                  className="w-25 ml-5 input-style"
                  value={element?.width.toFixed()}
                  onChange={(e) => update({ width: +e.target.value })}
                />

                <div className="absolute top-2 right-2 font-bold text-white/50">
                  W
                </div>
              </div>
            </div>
          </>
        )}
        {/* image : )  */}
        {element?.type === "image" && (
          <div className="flex flex-col gap-4 pt-2">
            <hr className="text-white/10"></hr>

            {element.blur != null && element.blur > 0 && (
              <div className="grid grid-cols-2 items-center px-4 ">
                {" "}
                <div className="text-sm text-green-500">Blur</div>
                <input
                  type="range"
                  min={1}
                  max={100}
                  value={element.blur}
                  className="slider"
                  onChange={(e) => update({ blur: +e.target.value })}
                />
              </div>
            )}
            {element.saturationStatus && (
              <div className="grid grid-cols-2 items-center px-4 ">
                {" "}
                <div className="text-sm text-green-500">Saturation</div>
                <input
                  type="range"
                  min={0.0001}
                  max={3}
                  step={0.00001}
                  value={element.saturate}
                  className="slider"
                  onChange={(e) => update({ saturate: +e.target.value })}
                />
              </div>
            )}
            {element.brightnessStatus && (
              <div className="grid grid-cols-2 items-center px-4 ">
                <div className="text-sm text-green-500">Brightness</div>
                <input
                  type="range"
                  min={0.0001}
                  max={3}
                  step={0.0001}
                  value={element.brightness}
                  className="slider"
                  onChange={(e) => update({ brightness: +e.target.value })}
                />
              </div>
            )}
            {element.opacity && (
              <div className="grid grid-cols-2 items-center px-4 ">
                <div className="text-sm text-green-500">Opacity</div>
                <input
                  type="range"
                  min={1}
                  max={100}
                  value={element.opacity}
                  className="slider"
                  onChange={(e) => update({ opacity: +e.target.value })}
                />
              </div>
            )}
            {element.contrastStatus && (
              <div className="grid grid-cols-2 items-center px-4 ">
                <div className="text-sm text-green-500">Contrast</div>
                <input
                  type="range"
                  min={0.0001}
                  max={3}
                  step={0.0001}
                  value={element.contrast}
                  className="slider"
                  onChange={(e) => update({ contrast: +e.target.value })}
                />
              </div>
            )}
            {element.invertStatus && (
              <div className="grid grid-cols-2 items-center px-4 ">
                <div className="text-sm text-green-500">Invert</div>

                <div
                  className={`w-12 h-6 
                    ${
                      invertToggle ? "bg-green-800" : "bg-[#536755]"
                    } rounded-xl flex items-center p-1`}
                >
                  <button
                    className={`w-5 h-5 rounded-full bg-green-500 
                      transition-transform duration-200 cursor-pointer
                       ${invertToggle ? "translate-x-5" : "translate-x-0"}`}
                    onClick={() => {
                      const next = !invertToggle;
                      setInvertToggle(next);
                      update({ invert: next });
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        )}
        {/* text : )  */}
        {element?.type === "text" && (
          <div className="flex flex-col gap-4 pt-4">
            <hr className="text-white/10"></hr>
            {/* text styles : )  */}
            <div className="grid grid-cols-2 items-center px-4">
              <div className="text-sm text-green-500">Style</div>
              <div className="flex justify-around w-full">
                <button
                  className={`
                      w-8  flex justify-center items-center rounded-sm cursor-pointer
                      transition-colors
                      ${
                        element.boldStatus
                          ? "text-green-500 "
                          : "text-green-900 hover:text-green-500"
                      }
                    `}
                  onClick={() =>
                    updateElement(element.id, {
                      boldStatus: !element.boldStatus,
                    })
                  }
                >
                  <ImBold size={20} />
                </button>

                <button
                  className={`
                        w-8 flex justify-center items-center rounded-sm cursor-pointer
                        transition-colors
                        ${
                          element.italicStatus
                            ? "text-green-500 "
                            : "text-green-900 hover:text-green-500"
                        }
                      `}
                  onClick={() =>
                    updateElement(element.id, {
                      italicStatus: !element.italicStatus,
                    })
                  }
                >
                  <FaItalic size={20} />
                </button>

                <input
                  type="color"
                  value={element.textColor}
                  className="cursor-pointer"
                  onChange={(e) => update({ textColor: e.target.value })}
                />
              </div>
            </div>
            {/* text size and position : )  */}
            <div className="grid grid-cols-5 items-center pl-4 gap-5">
              <div className="text-sm text-green-500">Size</div>
              <div className="relative">
                {" "}
                <input
                  type="number"
                  className="input-style w-15"
                  value={element.fontSize}
                  onChange={(e) => update({ fontSize: +e.target.value })}
                />
                <div className="absolute top-2 right-1 font-bold text-white/50 z-999">
                  Pt
                </div>
              </div>

              <div className="text-sm text-green-500">Font</div>
              <div>
                <select
                  id="fontSelect"
                  className="select w-30"
                  onChange={(e) =>
                    updateElement(element.id, {
                      fontType: e.target.value,
                    })
                  }
                  defaultValue={element.fontType}
                >
                  {fonts.map((font) => (
                    <option
                      key={font}
                      value={font}
                      style={{ fontFamily: font }}
                    >
                      {font}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* text content : )  */}
            <div className="grid grid-cols-2 items-start px-4 ">
              {" "}
              <div className="text-sm text-green-500">Content</div>
              <textarea
                className="text-white bg-[#022e2c] p-2 rounded-md 
                focus:outline-1 focus:outline-lime-400
              hover:outline-lime-400 hover:outline-1
                min-h-20 w-full resize-none "
                value={element.content || ""}
                onChange={(e) => update({ content: e.target.value })}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Properties;
