import { useEditorStore } from "../../../store/useEditorStore";
import type { Element } from "../../../types";

type EditOptionProps = {
  copiedElementRef: React.MutableRefObject<Element | null>;
};

const EditOption = ({ copiedElementRef }: EditOptionProps) => {
  const { undo, redo, selectedElementId, updateElement, elements } =
    useEditorStore();

  function initiateCrop() {
    if (!selectedElementId) return;
    updateElement(selectedElementId, {
      cropStatus: true,
      crop: { sx: 5, sy: 5, width: 500, height: 500 },
    });
  }
  function handleCopy() {
    if (!selectedElementId) return;

    const element = elements.find((el) => el.id === selectedElementId);

    copiedElementRef.current = element ? structuredClone(element) : null;
  }

  function handlePaste() {
    if (!copiedElementRef.current) return;

    const pastedElement = {
      ...structuredClone(copiedElementRef.current),
      id: crypto.randomUUID(),
    };

    elements.push(pastedElement);
  }

  return (
    <div className="absolute bg-[#e9e9e9] h-55 w-55 z-999 rounded-sm text-black cursor-default">
      <ul className="flex flex-col">
        <li onClick={undo} className="hover:bg-[#00beb560] p-2 cursor-pointer">
          Undo
        </li>

        <li onClick={redo} className="hover:bg-[#00beb560] p-2 cursor-pointer">
          Redo
        </li>
        <hr className="text-black/25"></hr>
        <li
          className="hover:bg-[#00beb560] p-2 cursor-pointer"
          onClick={handleCopy}
        >
          Copy
        </li>
        <li
          className="hover:bg-[#00beb560] p-2 cursor-pointer"
          onClick={handlePaste}
        >
          Paste
        </li>
        <hr className="text-black/25"></hr>
        <li
          className="hover:bg-[#00beb560] p-2 cursor-pointer"
          onClick={initiateCrop}
        >
          Crop
        </li>
      </ul>
    </div>
  );
};

export default EditOption;
