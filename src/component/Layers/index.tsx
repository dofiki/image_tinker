import { useRef } from "react";
import { useEditorStore } from "../../store/useEditorStore";
import type { Element } from "../../types/elements";
import { LayerRow } from "./component/LayerRow";

const Layers = ({
  elements,
  selected,
  onTextStatus,
  onMoveStatus,
  onDrawStatus,
  onRectStatus,
}: {
  elements: Element[];
  selected: Element | null;
  onMoveStatus: (arg0: boolean) => void;
  onTextStatus: (arg0: boolean) => void;
  onDrawStatus: (arg0: boolean) => void;
  onRectStatus: (arg0: boolean) => void;
}) => {
  const {
    updateElement,
    setSelectedElementId,
    removeElement,
    setElements,
    selectedElementId,
  } = useEditorStore();

  const draggingItem = useRef<null | number>(null);
  const draggingOverItem = useRef<null | number>(null);

  function handleMoveStatus() {
    onTextStatus(false);
    onMoveStatus(true);
    onDrawStatus(false);
    onRectStatus(false);
  }

  function handleDragStart(index: number) {
    draggingItem.current = index;
  }

  function handleDragEnter(index: number) {
    draggingOverItem.current = index;
  }

  function handleDragEnd() {
    if (draggingItem.current === null || draggingOverItem.current === null)
      return;

    const canvasContext = [...elements].reverse();
    const draggingItemContent = canvasContext[draggingItem.current];
    canvasContext.splice(draggingItem.current, 1);
    canvasContext.splice(draggingOverItem.current, 0, draggingItemContent);

    draggingItem.current = null;
    draggingOverItem.current = null;

    setElements(canvasContext.reverse());
  }

  return (
    <div className="bg-[#002322] h-60 text-white rounded-sm">
      <div
        className="flex justify-between items-center px-3 border-b
          border-[#013836] w-full h-10"
      >
        <span className="text-[0.7rem] font-bold text-green-500 uppercase tracking-widest">
          Layers
        </span>
      </div>

      <div
        className="h-50 overflow-scroll md:overflow-scroll md:overflow-x-hidden"
        id="layers"
      >
        {[...elements].reverse().map((el, index) => (
          <LayerRow
            key={el.id}
            el={el}
            isSelected={el.id === selected?.id}
            onSelect={() => {
              setSelectedElementId(el.id);
              handleMoveStatus();
            }}
            onUpdate={(patch) => updateElement(el.id, patch)}
            onRemove={() => removeElement(el.id)}
            onDragStart={() => handleDragStart(index)}
            onDragEnter={() => handleDragEnter(index)}
            onDragEnd={handleDragEnd}
            updateElement={updateElement}
            selectedElementId={selectedElementId}
          />
        ))}
      </div>
    </div>
  );
};

export default Layers;
