import { ImBold } from "react-icons/im";
import { FaItalic } from "react-icons/fa";
import { useEditorStore } from "../../../store/useEditorStore";
import { FONTS } from "../constants";
import type { Element } from "../../../types";

interface TextPanelProps {
  element: Element;
  update: (patch: Partial<Element>) => void;
}

export const TextPanel = ({ element, update }: TextPanelProps) => {
  const { updateElement } = useEditorStore();
  if (element.type !== "text") return;
  return (
    <div className="flex flex-col gap-4 pt-4">
      <hr className="text-white/10" />

      <div className="grid grid-cols-2 items-center px-4">
        <div className="text-sm text-green-500">Style</div>
        <div className="flex justify-around w-full">
          <button
            className={`w-8 flex justify-center items-center
                 rounded-sm cursor-pointer transition-colors ${
                   element.boldStatus
                     ? "text-green-500"
                     : "text-green-900 hover:text-green-500"
                 }`}
            onClick={() =>
              updateElement(element.id, { boldStatus: !element.boldStatus })
            }
          >
            <ImBold size={20} />
          </button>

          <button
            className={`w-8 flex justify-center items-center rounded-sm 
                cursor-pointer transition-colors ${
                  element.italicStatus
                    ? "text-green-500"
                    : "text-green-900 hover:text-green-500"
                }`}
            onClick={() =>
              updateElement(element.id, { italicStatus: !element.italicStatus })
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

      <div className="grid grid-cols-5 items-center pl-4 gap-5">
        <div className="text-sm text-green-500">Size</div>
        <div className="relative">
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
              updateElement(element.id, { fontType: e.target.value })
            }
            defaultValue={element.fontType}
          >
            {FONTS.map((font) => (
              <option key={font} value={font} style={{ fontFamily: font }}>
                {font}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 items-start px-4">
        <div className="text-sm text-green-500">Content</div>
        <textarea
          className="text-white bg-[#022e2c] p-2 rounded-md focus:outline-1
           focus:outline-lime-400 hover:outline-lime-400 
           hover:outline-1 min-h-20 w-full resize-none"
          value={element.content || ""}
          onChange={(e) => update({ content: e.target.value })}
        />
      </div>
    </div>
  );
};
