import { useState } from "react";
import { useEditorStore } from "../../store/useEditorStore";
import type { Element } from "../../types";

const Properties = ({ element }: { element: Element | null }) => {
  const { updateElement } = useEditorStore();
  const [invertToggle, setInvertToggle] = useState(true);

  if (!element) return null;
  return (
    <div
      className="h-full w-full bg-[#002322] border 
     border-[#013836] rounded-[0.2rem] shadow-xl z-10"
    >
      <div className="px-3 pt-3 pb-2 border-b border-[#013836]">
        <span
          className="text-[0.7rem] font-bold text-[#009b6a] uppercase 
        tracking-widest"
        >
          {element.type}
        </span>
      </div>

      <div className="flex flex-col gap-2 mt-5 ">
        <div className="text-white flex items-center justify-between pl-4 pr-2">
          <label>X :</label>
          <input
            type="number"
            className="text-white bg-[#022e2c] p-2 rounded-md "
            value={element.x.toFixed()}
            onChange={(e) =>
              updateElement(element.id, { x: Number(e.currentTarget.value) })
            }
          />
        </div>

        <div className="text-white flex items-center justify-between pl-4 pr-2">
          <label>Y :</label>
          <input
            type="number"
            value={element.y.toFixed()}
            className="text-white bg-[#022e2c] p-2 rounded-md"
            onChange={(e) =>
              updateElement(element.id, { y: Number(e.currentTarget.value) })
            }
          />
        </div>
        <div className="text-white flex items-center justify-between pl-4 pr-2">
          <label>Height :</label>
          <input
            type="number"
            value={element.height.toFixed()}
            className="text-white bg-[#022e2c] p-2 rounded-md"
            onChange={(e) =>
              updateElement(element.id, {
                height: Number(e.currentTarget.value),
              })
            }
          />
        </div>
        <div className="text-white flex items-center justify-between pl-4 pr-2">
          <label>Width :</label>
          <input
            type="number"
            value={element.width.toFixed()}
            className="text-white bg-[#022e2c] p-2 rounded-md"
            onChange={(e) =>
              updateElement(element.id, {
                width: Number(e.currentTarget.value),
              })
            }
          />
        </div>
        {element.type === "image" ? (
          <>
            {" "}
            {element.blur ? (
              <div className="text-white flex items-center justify-between pl-4 pr-2">
                <label>Blur :</label>
                <input
                  type="range"
                  min={1}
                  max={100}
                  value={element.blur}
                  className="slider"
                  onChange={(e) =>
                    updateElement(element.id, {
                      blur: Number(e.currentTarget.value),
                    })
                  }
                />
              </div>
            ) : (
              ""
            )}
            {element.saturationStatus ? (
              <div className="text-white flex items-center justify-between pl-4 pr-2">
                <label>Saturation :</label>
                <input
                  type="range"
                  min={0.0001}
                  max={3}
                  step={0.00001}
                  value={element.saturate}
                  className="slider"
                  onChange={(e) =>
                    updateElement(element.id, {
                      saturate: Number(e.currentTarget.value),
                    })
                  }
                />
              </div>
            ) : (
              ""
            )}
            {element.brightnessStatus ? (
              <div className="text-white flex items-center justify-between pl-4 pr-2">
                <label>Brightness :</label>
                <input
                  type="range"
                  min={0.0001}
                  max={3}
                  step={0.0001}
                  value={element.brightness}
                  className="slider"
                  onChange={(e) =>
                    updateElement(element.id, {
                      brightness: Number(e.currentTarget.value),
                    })
                  }
                />
              </div>
            ) : (
              ""
            )}
            {element.contrastStatus ? (
              <div className="text-white flex items-center justify-between pl-4 pr-2">
                <label>Contrast :</label>
                <input
                  type="range"
                  min={0.0001}
                  max={3}
                  step={0.0001}
                  value={element.contrast}
                  className="slider"
                  onChange={(e) =>
                    updateElement(element.id, {
                      contrast: Number(e.currentTarget.value),
                    })
                  }
                />
              </div>
            ) : (
              ""
            )}
            {element.invertStatus ? (
              <div className="text-white flex items-center justify-between pl-4 pr-2">
                <label>Invert :</label>
                <div
                  className={`w-12 h-6  ${
                    invertToggle ? "bg-green-800" : " bg-[#536755]"
                  } rounded-xl flex items-center p-1 `}
                >
                  <button
                    className={`w-5 h-5 rounded-full transition-transform duration-200
                       bg-green-500 ${invertToggle ? "translate-x-5" : "translate-x-0 "} cursor-pointer`}
                    onClick={() => {
                      const next = !invertToggle;
                      setInvertToggle(next);
                      updateElement(element.id, {
                        invert: Boolean(next),
                      });
                    }}
                  ></button>
                </div>
              </div>
            ) : (
              ""
            )}
          </>
        ) : (
          ""
        )}

        {element.type === "text" ? (
          <>
            {" "}
            <div className="text-white flex items-center justify-between pl-4 pr-2">
              <label>Content :</label>
              <input
                type="string"
                value={element.content || ""}
                className="text-white bg-[#022e2c] p-2 rounded-md "
                onChange={(e) =>
                  updateElement(element.id, { content: e.currentTarget.value })
                }
              />
            </div>
            <div className="text-white flex items-center justify-between pl-4 pr-2">
              <label>Font Size :</label>
              <input
                type="number"
                value={element.fontSize}
                className="text-white bg-[#022e2c] p-2 rounded-md "
                onChange={(e) =>
                  updateElement(element.id, {
                    fontSize: Number(e.currentTarget.value),
                  })
                }
              />
            </div>
            <div className="text-white flex items-center justify-between pl-4 pr-2">
              <label>Font :</label>
              <input
                type="string"
                value={element.fontType}
                className="text-white bg-[#022e2c] p-2 rounded-md cursor-not-allowed"
              />
            </div>
            <div className="text-white flex items-center justify-between pl-4 pr-2">
              <label>Color :</label>
              <input
                type="string"
                value={element.textColor}
                className="text-white bg-[#022e2c] p-2 rounded-md"
                onChange={(e) =>
                  updateElement(element.id, {
                    textColor: e.currentTarget.value,
                  })
                }
              />
            </div>
          </>
        ) : (
          " "
        )}
      </div>
    </div>
  );
};

export default Properties;
