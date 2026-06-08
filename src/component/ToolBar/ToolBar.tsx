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
  panStatus: boolean;
  onPanStatus: (val: boolean) => void;
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
  panStatus,
  onPanStatus,
}: ToolBarProps) => {
  function handleMoveStatus() {
    onMoveStatus(!moveStatus);
    onTextStatus(false);
    onDrawStatus(false);
    onRectStatus(false);
    onPanStatus(false);
  }

  function handleTextStatus() {
    onTextStatus(!textStatus);
    onMoveStatus(false);
    onDrawStatus(false);
    onRectStatus(false);
    onPanStatus(false);
  }

  function handleDrawStatus() {
    onDrawStatus(!drawStatus);
    onMoveStatus(false);
    onTextStatus(false);
    onRectStatus(false);
    onPanStatus(false);
  }

  function handleRectStatus() {
    onRectStatus(!rectStatus);
    onDrawStatus(false);
    onMoveStatus(false);
    onTextStatus(false);
    onPanStatus(false);
  }

  function handlePanStatus() {
    onPanStatus(!panStatus);
    onRectStatus(false);
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
             text-white w-auto md:w-12 justify-center gap-2 rounded-[0.2rem]
             border border-accent"
          >
            <div
              className="font-bold text-[0.8rem] text-accent-text w-full
                flex justify-center items-center h-8 border-b border-accent"
            >
              Tools
            </div>

            <div className="flex  md:flex-col ">
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
                  ${panStatus ? "text-green-500" : "text-white"}`}
                onClick={handlePanStatus}
              >
                <FaHand size={22} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToolBar;
