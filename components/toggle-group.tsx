import type { FC } from "react";

interface ToggleGroupProps {
  items: React.ReactNode[];
}

const ToggleGroup: FC<ToggleGroupProps> = ({ items }) => {
  return (
    <>
      <h3>Toggle group</h3>
      {items.map((item: any, i: number) => (
        <div key={i}>{item}</div>
      ))}
    </>
  );
};

export default ToggleGroup;
