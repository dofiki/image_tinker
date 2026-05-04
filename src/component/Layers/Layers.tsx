import type { Element } from "../../types/elements";
import { FaEye } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";

const Layers = ({
  elements,
  selected,
}: {
  elements: Element[];
  selected: Element | null;
}) => {
  return (
    <div className="bg-[#002322] h-100 text-white ">
      <div className="px-3 pt-3 pb-2 border-b border-[#013836] fixed w-full h-10">
        <span
          className="text-[0.7rem] font-bold text-[#009b6a] 
                uppercase tracking-widest "
        >
          Layers
        </span>
      </div>
      <div className="mt-10 overflow-scroll h-full">
        {[...elements].reverse().map((el) => (
          <div
            key={el.id}
            className="bg-black/50 flex pl-5 pr-5 pt-2 pb-2 items-center 
            justify-between cursor-pointer"
          >
            <div>
              <FaEye
                className={`cursor-pointer hover:text-red-500 transition-all ease-in
                 ${el.id === selected?.id ? "" : "pointer-events-none cursor-not-allowed opacity-35"} `}
              />
            </div>
            <div
              className={`${el.id === selected?.id ? "text-green-500" : "opacity-35"} transition-all ease-in`}
            >
              {el.content?.slice(0, 5) + "..."}
            </div>{" "}
            <div>
              <RiDeleteBin6Line
                className={`cursor-pointer hover:text-red-500 transition-all ease-in
                 ${el.id === selected?.id ? "" : "pointer-events-none cursor-not-allowed opacity-35"} `}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Layers;
