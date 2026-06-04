import { LuMove } from "react-icons/lu";
import { RiTextSnippet } from "react-icons/ri";
import { MdDraw } from "react-icons/md";
import { FaHand } from "react-icons/fa6";

import { RiRectangleFill } from "react-icons/ri";

interface ToolBarProps {
  moveStatus: boolean;
  onMoveStatus: React.Dispatch<React.SetStateAction<boolean>>;
  textStatus: boolean;
  onTextStatus: React.Dispatch<React.SetStateAction<boolean>>;
  drawStatus: boolean;
  onDrawStatus: React.Dispatch<React.SetStateAction<boolean>>;
  rectStatus: boolean;
  onRectStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

const ToolBar = ({
  moveStatus,
  onMoveStatus,
  textStatus,
  onTextStatus,
  drawStatus,
  onDrawStatus,
  rectStatus,
  onRectStatus,
}: ToolBarProps) => {
  function handleMoveStatus() {
    onMoveStatus(!moveStatus);
    onTextStatus(false);
    onDrawStatus(false);
    onRectStatus(false);
  }

  function handleTextStatus() {
    onTextStatus(!textStatus);
    onMoveStatus(false);
    onDrawStatus(false);
    onRectStatus(false);
  }

  function handleDrawStatus() {
    onDrawStatus(!drawStatus);
    onMoveStatus(false);
    onTextStatus(false);
    onRectStatus(false);
  }

  function handleRectStatus() {
    onRectStatus(!rectStatus);
    onDrawStatus(false);
    onMoveStatus(false);
    onTextStatus(false);
  }

  return (
    <>
      <div className=" flex flex-row ">
        <div>
          <div
            className="flex flex-col  items-center bg-primary
             text-white w-12 justify-center gap-2 rounded-[0.2rem]
             border border-accent"
          >
            <div className="font-bold text-[0.8rem] text-accent-text w-full
                flex justify-center items-center h-8 border-b border-accent">
              Tools
            </div>

            <div className="flex md:flex-col flex-wrap">
              <button
                className={` toolbar-btn
                  ${moveStatus ? "text-green-500" : "text-white"}`}
                onClick={handleMoveStatus}
              >
                <LuMove size={22} />
              </button>
              <button
                className={`toolbar-btn
              ${drawStatus ? "text-green-500" : "text-white"}`}
                onClick={handleDrawStatus}
              >
                <MdDraw size={25} />
              </button>
              <button
                className={`toolbar-btn
              ${textStatus ? "text-green-500" : "text-white"}`}
                onClick={handleTextStatus}
              >
                <RiTextSnippet size={25} />
              </button>

              <button
                className={`toolbar-btn
                  ${rectStatus ? "text-green-500" : "text-white"}`}
                onClick={handleRectStatus}
              >
                <RiRectangleFill size={25} />
              </button>

              <button
                className={`toolbar-btn
                  ${rectStatus ? "text-green-500" : "text-white"}`}
                onClick={handleRectStatus}
              >
               <FaHand size={22}/>

              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToolBar;
