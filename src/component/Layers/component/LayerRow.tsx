import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { BlendMode } from "../component/BlendMode";
import type { LayerRowProps } from "../types/index";

export const LayerRow = ({
  el,
  isSelected,
  onSelect,
  onUpdate,
  onRemove,
  onDragStart,
  onDragEnter,
  onDragEnd,
}: LayerRowProps) => {
  return (
    <div
      className="bg-black/50 flex items-center justify-between cursor-pointer
        w-full pr-2 h-10 border-b border-white/30"
      onClick={onSelect}
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      onDragEnd={onDragEnd}
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
              ${isSelected ? "" : "dont-point"}`}
            onClick={() => onUpdate({ visibilityStatus: false })}
          />
        ) : (
          <FaEyeSlash
            className={`cursor-pointer hover:text-blue-500 transition-all ease-in
              ${isSelected ? "" : "dont-point"}`}
            onClick={() => onUpdate({ visibilityStatus: true })}
          />
        )}
      </div>

      <div
        className={`select-none transition-all ease-in
          ${isSelected ? "text-green-500" : "opacity-35"}`}
      >
        {el.type === "text" ? el.content?.slice(0, 5) : el.type}
      </div>

      <BlendMode
        value={el.blendMode}
        onChange={(blendMode) => onUpdate({ blendMode })}
        disabled={!isSelected}
      />

      <div>
        <RiDeleteBin6Line
          className={`cursor-pointer hover:text-red-500 transition-all ease-in
            ${isSelected ? "" : "dont-point"}`}
          onClick={onRemove}
        />
      </div>
    </div>
  );
};
