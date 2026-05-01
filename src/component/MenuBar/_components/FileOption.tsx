import type { FileProps } from "../types";
const FileOption = ({
  onCreateCanvas,
  onHandleImage,
  onHandleSave,
}: FileProps) => {
  return (
    <>
      <div
        className="absolute bg-[#e9e9e9] h-55 w-55 z-999 rounded-sm
       text-black cursor-default"
      >
        <ul className="flex flex-col">
          <li className="hover:bg-[#00beb560] p-2" onClick={onCreateCanvas}>
            New...
          </li>
          <li className="hover:bg-[#00beb560] p-2" onClick={onHandleImage}>
            Open
          </li>
          <li className="hover:bg-[#00beb560] p-2" onClick={onHandleSave}>
            Export as PNG
          </li>
        </ul>
      </div>
    </>
  );
};

export default FileOption;
