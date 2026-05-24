import { LuMove } from "react-icons/lu";
import { RiTextSnippet } from "react-icons/ri";
import type { ToolBarProps } from "../../types/index";
import { CgColorPicker } from "react-icons/cg";
import { FaCropSimple } from "react-icons/fa6";
import { useState, type ChangeEvent } from "react";
import { useEditorStore } from "../../store/useEditorStore";

const ToolBar = ({
  moveStatus,
  onMoveStatus,
  textStatus,
  onTextStatus,
  colorPickerStatus,
  onPickerStatus,
}: ToolBarProps) => {
  const { globalColor, setGlobalColor } = useEditorStore();

  function handleMoveStatus() {
    onMoveStatus(!moveStatus);
    onPickerStatus(false);
    onTextStatus(false);
  }

  function handleTextStatus() {
    onTextStatus(!textStatus);
    onPickerStatus(false);
    onMoveStatus(false);
  }

  function handleColor(e: ChangeEvent<HTMLInputElement>) {
    setGlobalColor(e.target.value);
    onTextStatus(false);
    onMoveStatus(false);
    onPickerStatus(false);
  }

  function handlePickerStatus() {
    onPickerStatus(!colorPickerStatus);
    onTextStatus(false);
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
              <button
                className={`flex items-center justify-center cursor-pointer hover:bg-[#013836] 
                 h-full p-2
              ${colorPickerStatus ? "text-[#009b6a]" : "text-white"}`}
                onClick={handlePickerStatus}
              >
                <CgColorPicker size={25} />
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
              <div className="flex justify-center items-center p-2  hover:bg-[#013836] ">
                <input
                  type="color"
                  className="w-6 h-6 outline-0 border-0 cursor-pointer rounded-sm "
                  value={globalColor}
                  onChange={(e) => handleColor(e)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToolBar;
