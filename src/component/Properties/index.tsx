import type { Element } from "../../types";
import { useElementUpdate } from "./hooks/useElementUpdate";
import { DrawPanel } from "./components/DrawPanel";
import { ImagePanel } from "./components/ImagePanel";
import { PositionSizePanel } from "./components/PositionSizePanel";
import { TextPanel } from "./components/TextPanel";

const Properties = ({ element }: { element: Element | null }) => {
  const update = useElementUpdate(element);

  return (
    <div
      className="h-80 md:h-150 w-full bg-[#002322] border
      border-[#013836] rounded-[0.2rem] shadow-xl z-10 text-xs md:text-sm"
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
        className="flex flex-col gap-5 pt-5 h-60 md:h-auto 
      overflow-scroll md:overflow-hidden pb-5"
      >
        {element?.type === "draw" && (
          <DrawPanel element={element} update={update} />
        )}

        {element?.type && element.type !== "draw" && (
          <PositionSizePanel element={element} update={update} />
        )}

        {element?.type === "image" && (
          <ImagePanel element={element} update={update} />
        )}

        {element?.type === "text" && (
          <TextPanel element={element} update={update} />
        )}
      </div>
    </div>
  );
};

export default Properties;
