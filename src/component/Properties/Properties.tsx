import { useState } from "react";
import { useEditorStore } from "../../store/useEditorStore";
import type { Element } from "../../types";
import { Field } from "./_component/Field";

const Properties = ({ element }: { element: Element | null }) => {
  const { updateElement } = useEditorStore();
  const [invertToggle, setInvertToggle] = useState(true);

  if (!element) return null;

  const update = (patch: Partial<Element>) => updateElement(element.id, patch);

  return (
    <div
      className="h-80 md:h-150 w-full bg-[#002322] border
     border-[#013836] rounded-[0.2rem] shadow-xl z-10 text-xs md:text-sm"
    >
      <div className="px-3 pt-3 pb-2 border-b border-[#013836]">
        <span className="text-[0.7rem] font-bold text-[#009b6a] uppercase tracking-widest">
          {element.type}
        </span>
      </div>

      <div className="flex flex-col gap-5 pt-5 h-60 md:h-135 overflow-scroll md:overflow-hidden pb-5">
        <div className="flex justify-between ">
          <Field label="X :">
            <input
              type="number"
              className="w-25 ml-5 input-style"
              value={element.x.toFixed()}
              onChange={(e) => update({ x: +e.target.value })}
            />
          </Field>
          <Field label="Y :">
            <input
              type="number"
              className="w-25 ml-5 input-style"
              value={element.y.toFixed()}
              onChange={(e) => update({ y: +e.target.value })}
            />
          </Field>
        </div>
        <div className="flex justify-between ">
          <Field label="Height :">
            <input
              type="number"
              className="w-25 ml-5 input-style"
              value={element.height.toFixed()}
              onChange={(e) => update({ height: +e.target.value })}
            />
          </Field>
          <Field label="Width :">
            <input
              type="number"
              className="w-25 ml-5 input-style"
              value={element.width.toFixed()}
              onChange={(e) => update({ width: +e.target.value })}
            />
          </Field>
        </div>

        {element.type === "image" && (
          <div className="flex flex-col gap-4 pt-2">
            {element.blur != null && element.blur > 0 && (
              <Field label="Blur :">
                <input
                  type="range"
                  min={1}
                  max={100}
                  value={element.blur}
                  className="slider"
                  onChange={(e) => update({ blur: +e.target.value })}
                />
              </Field>
            )}
            {element.saturationStatus && (
              <Field label="Saturation :">
                <input
                  type="range"
                  min={0.0001}
                  max={3}
                  step={0.00001}
                  value={element.saturate}
                  className="slider"
                  onChange={(e) => update({ saturate: +e.target.value })}
                />
              </Field>
            )}
            {element.brightnessStatus && (
              <Field label="Brightness :">
                <input
                  type="range"
                  min={0.0001}
                  max={3}
                  step={0.0001}
                  value={element.brightness}
                  className="slider"
                  onChange={(e) => update({ brightness: +e.target.value })}
                />
              </Field>
            )}
            {element.opacity && (
              <Field label="Opacity :">
                <input
                  type="range"
                  min={1}
                  max={100}
                  value={element.opacity}
                  className="slider"
                  onChange={(e) => update({ opacity: +e.target.value })}
                />
              </Field>
            )}
            {element.contrastStatus && (
              <Field label="Contrast :">
                <input
                  type="range"
                  min={0.0001}
                  max={3}
                  step={0.0001}
                  value={element.contrast}
                  className="slider"
                  onChange={(e) => update({ contrast: +e.target.value })}
                />
              </Field>
            )}
            {element.invertStatus && (
              <Field label="Invert :">
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
              </Field>
            )}
          </div>
        )}

        {element.type === "text" && (
          <div className="flex flex-col gap-4 pt-4">
            <Field label="Content :">
              <input
                type="text"
                className="input-style"
                value={element.content || ""}
                onChange={(e) => update({ content: e.target.value })}
              />
            </Field>
            <Field label="Font Size :">
              <input
                type="number"
                className="input-style"
                value={element.fontSize}
                onChange={(e) => update({ fontSize: +e.target.value })}
              />
            </Field>
            <Field label="Font :">
              <input
                type="text"
                className={`$""input-style cursor-not-allowed`}
                value={element.fontType}
                readOnly
              />
            </Field>
            <Field label="Color :">
              <input
                type="text"
                className="input-style"
                value={element.textColor}
                onChange={(e) => update({ textColor: e.target.value })}
              />
            </Field>
          </div>
        )}
      </div>
    </div>
  );
};

export default Properties;
