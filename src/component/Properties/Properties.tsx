import { useEditorStore } from "../../store/useEditorStore";
import type { Element } from "../../types";

const Properties = ({ element }: { element: Element | null }) => {
  const { updateElement } = useEditorStore();
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
                  className="text-white bg-[#022e2c] p-2 rounded-md"
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
                  max={1}
                  step={0.0001}
                  value={element.saturate}
                  className="text-white bg-[#022e2c] p-2 rounded-md"
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
