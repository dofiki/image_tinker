import { LuMove } from "react-icons/lu";
import { RiTextSnippet } from "react-icons/ri";
import { MdDraw } from "react-icons/md";

interface ToolBarProps {
  moveStatus: boolean;
  onMoveStatus: React.Dispatch<React.SetStateAction<boolean>>;
  textStatus: boolean;
  onTextStatus: React.Dispatch<React.SetStateAction<boolean>>;
  drawStatus: boolean;
  onDrawStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

const ToolBar = ({
  moveStatus,
  onMoveStatus,
  textStatus,
  onTextStatus,
  drawStatus,
  onDrawStatus,
}: ToolBarProps) => {
  function handleMoveStatus() {
    onMoveStatus(!moveStatus);
    onTextStatus(false);
    onDrawStatus(false);
  }

  function handleTextStatus() {
    onTextStatus(!textStatus);
    onMoveStatus(false);
    onDrawStatus(false);
  }

  function handleDrawStatus() {
    onDrawStatus(!drawStatus);
    onMoveStatus(false);
    onTextStatus(false);
  }

  return (
    <>
      <div className=" flex flex-row ">
        <div>
          <div
            className="flex flex-col  items-center bg-[#002322]
             text-white w-auto justify-center gap-2 rounded-[0.2rem]"
          >
            <div className="font-bold text-[0.8rem] text-green-500 mt-2">
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToolBar;
