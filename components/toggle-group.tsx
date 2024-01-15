import type { FC } from "react";
import { motion } from "framer-motion";

interface ToggleItem {
  content: React.ReactNode;
  value: any;
  onClick: (newSelectedIndex: number, value: any) => void;
}
interface ToggleGroupProps {
  items: ToggleItem[];
  className?: string;
  selectedIndex: number;
  transitionDuration?: number;
}

const ToggleGroup: FC<ToggleGroupProps> = ({
  items,
  className,
  selectedIndex,
  transitionDuration = 0.25,
}) => {
  return (
    <span
      // `grid-cols-[repeat(2,minmax(auto,1fr))]` sets the widths equal when there is space to do so (based on the widest content item)...and then shrinks the smaller-width-content items when space gets compressed
      className={`inline-grid select-none grid-cols-[repeat(2,minmax(auto,1fr))] rounded border border-black/20 ${className}`}
    >
      {items.map((item: ToggleItem, i: number) => {
        const isSelected = selectedIndex === i;
        const statefulClassNames = isSelected ? "opacity-100" : "opacity-50";
        return (
          <span
            key={i}
            className={`relative inline-flex cursor-pointer place-content-center place-items-center p-1 px-3 ${statefulClassNames}`}
            onClick={() => item.onClick(i, item.value)}
          >
            {item.content}
            {isSelected && (
              <motion.span
                layoutId="selectedItemBackground"
                transition={{ duration: transitionDuration }}
                className="absolute top-0 left-0 h-full w-full bg-black/10"
              />
            )}
          </span>
        );
      })}
    </span>
  );
};

export default ToggleGroup;
