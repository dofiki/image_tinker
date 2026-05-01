const FilterOption = () => {
  return (
    <div
      className="absolute bg-[#e9e9e9] h-55 w-55 z-999 rounded-sm
     text-black cursor-default"
    >
      <ul className="flex flex-col">
        <li className="hover:bg-[#00beb560] p-2">Blur</li>
        <li className="hover:bg-[#00beb560] p-2">Noise</li>
        <li className="hover:bg-[#00beb560] p-2">Distort</li>
        <li className="hover:bg-[#00beb560] p-2">Glassify</li>
      </ul>
    </div>
  );
};

export default FilterOption;
