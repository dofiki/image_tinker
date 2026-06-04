import { useEditorStore } from "../../../store/useEditorStore";

const FilterOption = () => {
  const { selectedElementId, updateElement } = useEditorStore();
  if (!selectedElementId) return;
  return (
    <div
      className="absolute bg-[#e9e9e9] h-auto w-55 z-999 rounded-sm
     text-black cursor-default"
    >
      <ul className="flex flex-col">
        <li
          className="hover:bg-normtex p-2"
          onClick={() => updateElement(selectedElementId, { blur: 20 })}
        >
          Blur
        </li>
        <hr className="text-black/25"></hr>

        <li
          className="hover:bg-normtex p-2"
          onClick={() =>
            updateElement(selectedElementId, {
              saturate: 0.0001,
              saturationStatus: true,
            })
          }
        >
          Saturate
        </li>
        <li
          className="hover:bg-normtex p-2"
          onClick={() =>
            updateElement(selectedElementId, {
              brightness: 1,
              brightnessStatus: true,
            })
          }
        >
          Brightness
        </li>
        <li
          className="hover:bg-normtex p-2"
          onClick={() =>
            updateElement(selectedElementId, {
              contrast: 1,
              contrastStatus: true,
            })
          }
        >
          Contrast
        </li>
        <li
          className="hover:bg-normtex p-2"
          onClick={() =>
            updateElement(selectedElementId, {
              invert: true,
              invertStatus: true,
            })
          }
        >
          Invert
        </li>
      </ul>
    </div>
  );
};

export default FilterOption;
