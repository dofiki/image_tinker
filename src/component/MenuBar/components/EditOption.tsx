import { useEditorStore } from "../../../store/useEditorStore";

const EditOption = () => {
  const { undo, redo, selectedElementId, updateElement } = useEditorStore();

  function initiateCrop() {
    if (!selectedElementId) return;
    updateElement(selectedElementId, {
      cropStatus: true,
      crop: { sx: 5, sy: 5, width: 500, height: 500 },
    });
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
        <li className="hover:bg-[#00beb560] p-2 cursor-pointer">Copy</li>
        <li className="hover:bg-[#00beb560] p-2 cursor-pointer">Paste</li>
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
