const ViewOption = () => {
  return (
    <div
      className="absolute bg-[#e9e9e9] h-55 w-55 z-999 
    rounded-sm text-black cursor-default"
    >
      <ul className="flex flex-col">
        <li className="hover:bg-[#00beb560] p-2">Grid</li>
        <li className="hover:bg-[#00beb560] p-2">Ruler</li>
        <li className="hover:bg-[#00beb560] p-2">Edit Box</li>
        <li className="hover:bg-[#00beb560] p-2">Layers</li>
        <li className="hover:bg-[#00beb560] p-2">Tool Box</li>
      </ul>
    </div>
  );
};

export default ViewOption;
