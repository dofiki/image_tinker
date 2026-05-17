import type { Element } from "../../types/elements";
import { FaEye } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaEyeSlash } from "react-icons/fa6";
import { useEditorStore } from "../../store/useEditorStore";

const Layers = ({
  elements,
  selected,
}: {
  elements: Element[];
  selected: Element | null;
}) => {
  const { updateElement, setSelectedElementId, removeElement } =
    useEditorStore();

  return (
    <div className="bg-[#002322] h-60 text-white ">
      <div className="px-3 pt-3 pb-2 border-b border-[#013836] w-full h-10">
        <span
          className="text-[0.7rem] font-bold text-[#009b6a] 
                uppercase tracking-widest "
        >
          Layers
        </span>
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
                 ${el.id === selected?.id ? "" : "pointer-events-none cursor-not-allowed opacity-35"} `}
                  onClick={() =>
                    updateElement(el.id, { visibilityStatus: false })
                  }
                />
              ) : (
                <FaEyeSlash
                  className={`cursor-pointer hover:text-blue-500 transition-all ease-in
                 ${el.id === selected?.id ? "" : "pointer-events-none cursor-not-allowed opacity-35"} `}
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
                 ${el.id === selected?.id ? "" : "pointer-events-none cursor-not-allowed opacity-35"} `}
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
