import { useEditorStore } from "../../../store/useEditorStore";

const EditOption = () => {
  const { undo, redo } = useEditorStore();

  return (
    <div className="absolute bg-[#e9e9e9] h-55 w-55 z-999 rounded-sm text-black cursor-default">
      <ul className="flex flex-col">
        <li onClick={undo} className="hover:bg-[#00beb560] p-2 cursor-pointer">
          Undo
        </li>

        <li onClick={redo} className="hover:bg-[#00beb560] p-2 cursor-pointer">
          Redo
        </li>
      </ul>
    </div>
  );
};

export default EditOption;
