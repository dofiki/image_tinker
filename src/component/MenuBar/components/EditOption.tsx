import { useEditorStore } from "../../../store/useEditorStore";
import type { Element } from "../../../types";

type EditOptionProps = {
  copiedElementRef: React.MutableRefObject<Element | null>;
};

const EditOption = ({ copiedElementRef }: EditOptionProps) => {
  const {
    undo,
    redo,
    selectedElementId,
    updateElement,
    elements,
    handleCopy,
    handlePaste,
  } = useEditorStore();

  function initiateCrop() {
    if (!selectedElementId) return;
    updateElement(selectedElementId, {
      cropStatus: true,
      crop: { sx: 5, sy: 5, width: 500, height: 500 },
    });
  }

  return (
    <div
      className="absolute bg-[#e9e9e9] h-55 w-55 z-999 rounded-sm
     text-black cursor-default"
    >
      <ul className="flex flex-col">
        <li
          onClick={undo}
          className="hover:bg-normtex hover:rounded-sm 
          p-2 cursor-pointer relative"
        >
          Undo
          <span className="absolute right-2 text-black/50">CTRL + Z</span>
        </li>

        <li
          onClick={redo}
          className="hover:bg-normtex p-2 cursor-pointer relative"
        >
          Redo
          <span className="absolute right-2 text-black/50">CTRL + R</span>
        </li>
        <hr className="text-black/25"></hr>
        <li
          className="hover:bg-normtex p-2 cursor-pointer relative"
          onClick={() => {
            if (!selectedElementId) return;
            handleCopy(selectedElementId, elements, copiedElementRef);
          }}
        >
          Copy
          <span className="absolute right-2 text-black/50">CTRL + C</span>
        </li>
        <li
          className="hover:bg-normtex p-2 cursor-pointer relative"
          onClick={() => {
            handlePaste(elements, copiedElementRef);
          }}
        >
          Paste
          <span className="absolute right-2 text-black/50">CTRL + V</span>
        </li>
        <hr className="text-black/25"></hr>
        <li
          className="hover:bg-normtex p-2 cursor-pointer"
          onClick={initiateCrop}
        >
          Crop
        </li>
      </ul>
    </div>
  );
};

export default EditOption;
