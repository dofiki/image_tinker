import { LuMove } from "react-icons/lu";
import { RiTextSnippet } from "react-icons/ri";
import { MdDraw } from "react-icons/md";
import { FaHand } from "react-icons/fa6";
import { RiCheckboxBlankCircleLine } from "react-icons/ri";
import { TbBackslash } from "react-icons/tb";

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
  circleStatus: boolean;
  onCircleStatus: React.Dispatch<React.SetStateAction<boolean>>;
  lineStatus: boolean;
  onLineStatus: React.Dispatch<React.SetStateAction<boolean>>;
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
  circleStatus,
  onCircleStatus,
  lineStatus,
  onLineStatus,
}: ToolBarProps) => {
  function handleMoveStatus() {
    onMoveStatus(!moveStatus);
    onTextStatus(false);
    onDrawStatus(false);
    onRectStatus(false);
    onPanStatus(false);
    onCircleStatus(false);
    onLineStatus(false);
  }

  function handleTextStatus() {
    onTextStatus(!textStatus);
    onMoveStatus(false);
    onDrawStatus(false);
    onRectStatus(false);
    onPanStatus(false);
    onCircleStatus(false);
    onLineStatus(false);
  }

  function handleDrawStatus() {
    onDrawStatus(!drawStatus);
    onMoveStatus(false);
    onTextStatus(false);
    onRectStatus(false);
    onPanStatus(false);
    onCircleStatus(false);
    onLineStatus(false);
  }

  function handleRectStatus() {
    onRectStatus(!rectStatus);
    onDrawStatus(false);
    onMoveStatus(false);
    onTextStatus(false);
    onPanStatus(false);
    onCircleStatus(false);
    onLineStatus(false);
  }

  function handlePanStatus() {
    onPanStatus(!panStatus);
    onRectStatus(false);
    onDrawStatus(false);
    onMoveStatus(false);
    onTextStatus(false);
    onCircleStatus(false);
    onLineStatus(false);
  }

  function handleCircleStatus() {
    onCircleStatus(!circleStatus);
    onPanStatus(false);
    onRectStatus(false);
    onDrawStatus(false);
    onMoveStatus(false);
    onTextStatus(false);
    onLineStatus(false);
  }

  function handleLineStatus() {
    onLineStatus(!lineStatus);
    onCircleStatus(false);
    onPanStatus(false);
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
                  ${circleStatus ? "text-green-500" : "text-white"}`}
                onClick={handleCircleStatus}
              >
                <RiCheckboxBlankCircleLine size={25} />
              </button>
              <button
                className={`toolbar-btn
                  ${lineStatus ? "text-green-500" : "text-white"}`}
                onClick={handleLineStatus}
              >
                <TbBackslash size={25} />
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
