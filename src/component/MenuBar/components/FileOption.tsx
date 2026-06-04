import type { FileProps } from "../types";
const FileOption = ({
  onCreateCanvas,
  onHandleImage,
  onHandleSave,
  onHandleElement,
}: FileProps) => {
  return (
    <>
      <div
        className="absolute bg-[#e9e9e9] h-55 w-55 z-999 rounded-sm
       text-black cursor-default"
      >
        <ul className="flex flex-col">
          <li className="hover:bg-normtex p-2" onClick={onCreateCanvas}>
            New...
          </li>
          <li className="hover:bg-normtex p-2" onClick={onHandleImage}>
            Open
          </li>
          <hr className="text-black/25"></hr>

          <li className="hover:bg-normtex p-2" onClick={onHandleSave}>
            Export as PNG
          </li>
          <li className="hover:bg-normtex p-2" onClick={onHandleElement}>
            Export Element JSON
          </li>
        </ul>
      </div>
    </>
  );
};

export default FileOption;
