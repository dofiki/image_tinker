import { useState } from "react";
import type { Element, ImageElement } from "../../../types";

interface ImagePanelProps {
  element: Element;
  update: (patch: Partial<ImageElement>) => void;
}

export const ImagePanel = ({ element, update }: ImagePanelProps) => {
  const [invertToggle, setInvertToggle] = useState(true);
  if (element.type != "image") return;

  return (
    <div className="flex flex-col gap-4 pt-2">
      <hr className="text-accent" />

      {/* crop */}
      {element.cropStatus && element.crop && (
        <>
          <div className="grid grid-cols-3 items-center px-4">
            <div className="text-sm text-normtex">Crop Position</div>
            <div className="relative">
              <input
                type="number"
                className="w-25 ml-5 input-style"
                min={"0"}
                value={element.crop.sx}
                onChange={(e) =>
                  update({
                    crop: {
                      ...element.crop,
                      sx: +e.target.value,
                    },
                  })
                }
              />
              <div className="properties-btn-label ">X</div>
            </div>
            <div className="relative">
              <input
                type="number"
                className="w-25 ml-5 input-style"
                min={"0"}
                value={element.crop.sy}
                onChange={(e) =>
                  update({
                    crop: {
                      ...element.crop,
                      sy: +e.target.value,
                    },
                  })
                }
              />
              <div className="properties-btn-label ">Y</div>
            </div>
          </div>

          <div className="grid grid-cols-3 items-center px-4">
            <div className="text-sm text-normtex">CropSize</div>
            <div className="relative">
              <input
                type="number"
                className="w-25 ml-5 input-style"
                min={"5"}
                value={element.crop.height}
                onChange={(e) =>
                  update({
                    crop: {
                      ...element.crop,
                      height: +e.target.value,
                    },
                  })
                }
              />
              <div className="properties-btn-label ">H</div>
            </div>
            <div className="relative">
              <input
                type="number"
                className="w-25 ml-5 input-style"
                min={"5"}
                value={element.crop.width}
                onChange={(e) =>
                  update({
                    crop: {
                      ...element.crop,
                      width: +e.target.value,
                    },
                  })
                }
              />
              <div className="properties-btn-label">W</div>
            </div>
          </div>
          <div className="flex justify-end pr-3">
            <button
              className="rounded-sm bg-green-800 text-white w-25 h-8
                        cursor-pointer hover:bg-green-700 transition-all 
                        ease-in"
              onClick={() =>
                update({
                  cropStatus: false,
                })
              }
            >
              Cancel Crop
            </button>
          </div>
        </>
      )}

      {/* filters */}
      {element.blur != null && element.blur > 0 && (
        <div className="grid grid-cols-2 items-center px-4">
          <div className="text-sm text-normtex">Blur</div>
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
        <div className="grid grid-cols-2 items-center px-4">
          <div className="text-sm text-normtex">Saturation</div>
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
        <div className="grid grid-cols-2 items-center px-4">
          <div className="text-sm text-normtex">Brightness</div>
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
        <div className="grid grid-cols-2 items-center px-4">
          <div className="text-sm text-normtex">Opacity</div>
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
        <div className="grid grid-cols-2 items-center px-4">
          <div className="text-sm text-normtex">Contrast</div>
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
        <div className="grid grid-cols-2 items-center px-4">
          <div className="text-sm text-normtex">Invert</div>
          <div
            className={`w-12 h-6 ${
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
  );
};
