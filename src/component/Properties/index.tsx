import type { Element } from "../../types";
import { useElementUpdate } from "./hooks/useElementUpdate";
import { DrawPanel } from "./components/DrawPanel";
import { ImagePanel } from "./components/ImagePanel";
import { PositionSizePanel } from "./components/PositionSizePanel";
import { TextPanel } from "./components/TextPanel";
import { RectPanel } from "./components/RectPanel";

const Properties = ({ element }: { element: Element | null }) => {
  const update = useElementUpdate(element);

  return (
    <div
      className="h-80 md:h-auto w-full bg-primary outline pb-2
      outline-accent rounded-[0.2rem] shadow-xl z-10 text-xs md:text-sm"
    >
      <div className="px-3 pt-3 pb-2 outline outline-hr">
        <span
          className="text-[0.7rem] font-bold text-accent-text
        uppercase tracking-widest"
        >
          {element?.type ?? "Properties"}
        </span>
      </div>

      <div
        className="flex flex-col gap-5 pt-5 h-60 md:h-100 
          overflow-scroll overflow-x-hidden pb-2"
        id="properties"
      >
        {element?.type === "draw" && (
          <DrawPanel element={element} update={update} />
        )}

        {element?.type && element.type !== "draw" && (
          <PositionSizePanel element={element} update={update} />
        )}

        {element?.type === "rect" && (
          <RectPanel element={element} update={update} />
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
