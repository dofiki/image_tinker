import { LuMove } from "react-icons/lu";
import { RiTextSnippet } from "react-icons/ri";
import type { ToolBarProps } from "../../types/index";

const ToolBar = ({
  moveStatus,
  onMoveStatus,
  textStatus,
  onTextStatus,
}: ToolBarProps) => {
  function handleMoveStatus() {
    onMoveStatus(!moveStatus);
    onTextStatus(false);
  }

  function handleTextStatus() {
    onTextStatus(!textStatus);
    onMoveStatus(false);
  }

  return (
    <>
      <div className=" flex flex-row ">
        <div>
          <div
            className="flex flex-col  items-center bg-[#002322] text-white w-auto
          justify-center gap-2 rounded-[0.2rem]"
          >
            <div className="font-bold text-[0.8rem] text-[#009b6a] mt-2">
              Tools
            </div>

            <div className="flex md:flex-col flex-wrap">
              <button
                className={` flex items-center justify-center  hover:bg-[#013836] 
                 h-full p-2 cursor-pointer ${moveStatus ? "text-[#009b6a]" : "text-white"}`}
                onClick={handleMoveStatus}
              >
                <LuMove size={22} />
              </button>
              <button
                className={`flex items-center justify-center cursor-pointer hover:bg-[#013836] 
                 h-full p-2
              ${textStatus ? "text-[#009b6a]" : "text-white"}`}
                onClick={handleTextStatus}
              >
                <RiTextSnippet size={25} />
              </button>

              {/*
              <button
                className={`flex items-center justify-center cursor-pointer hover:bg-[#013836] 
                 h-full p-2
              ${textStatus ? "text-[#009b6a]" : "text-white"}`}
                onClick={handleTextStatus}
              >
                <FaCropSimple size={22} />
              </button>
               */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToolBar;
