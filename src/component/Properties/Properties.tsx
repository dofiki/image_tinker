import type { Element } from "../../types";

const Properties = ({ element }: { element: Element | null }) => {
  if (!element) return null;

  const rows = [
    ["id", element.id.slice(0, 8) + "..."],
    ["x", element.x],
    ["y", element.y],
    ["width", element.width],
    ["height", element.height],
    ...(element.type === "text"
      ? [
          ["content", element.content ?? "—"],
          ["fontSize", element.fontSize],
          ["fontType", element.fontType],
          ["color", element.textColor],
        ]
      : [["src", element.src.slice(0, 16) + "..."]]),
  ];

  return (
    <div
      className="h-full w-full bg-[#002322] border 
     border-[#013836] rounded-[0.2rem] shadow-xl z-10"
    >
      <div className="px-3 pt-3 pb-2 border-b border-[#013836]">
        <span
          className="text-[0.7rem] font-bold text-[#009b6a] uppercase 
        tracking-widest"
        >
          {element.type}
        </span>
      </div>

      <div className="p-3 flex flex-col gap-1.5 font-mono">
        {rows.map(([key, val]) => (
          <div key={String(key)} className="flex justify-between gap-2">
            <span className="text-[0.65rem] text-[#009b6a] uppercase tracking-wider">
              {key}
            </span>
            <span className="text-[0.7rem] text-gray-300 truncate max-w-28">
              {String(val)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Properties;
