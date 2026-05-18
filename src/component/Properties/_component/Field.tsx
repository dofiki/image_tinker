export const Field = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="text-white flex items-center justify-between pl-4 pr-2 ">
    <label>{label}</label>
    {children}
  </div>
);
