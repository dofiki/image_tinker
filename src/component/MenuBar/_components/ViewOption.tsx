import { useEditorStore } from "../../../store/useEditorStore";

const ViewOption = () => {
  const { rulerStatus, setRulerStatus } = useEditorStore();
  return (
    <div
      className="absolute bg-[#e9e9e9] h-55 w-55 z-999 
    rounded-sm text-black cursor-default"
      onClick={(e) => e.stopPropagation()}
    >
      <ul className="flex flex-col">
        <li className="hover:bg-[#00beb560] p-2">Grid</li>
        <li className="hover:bg-[#00beb560] p-2 flex gap-2">
          <input
            type="checkbox"
            checked={rulerStatus}
            onChange={() => setRulerStatus(!rulerStatus)}
            className="w-4 accent-green-600"
          />
          <label>Ruler</label>
        </li>
        <li className="hover:bg-[#00beb560] p-2">Edit Box</li>
        <li className="hover:bg-[#00beb560] p-2">Layers</li>
        <li className="hover:bg-[#00beb560] p-2">Tool Box</li>
      </ul>
    </div>
  );
};

export default ViewOption;
