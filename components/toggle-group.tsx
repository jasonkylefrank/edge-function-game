import type { FC } from "react";
import { motion } from "framer-motion";
import { NetworkType } from "./edge-function-game/edge-function-game";

interface ToggleItem {
  content: React.ReactNode;
  value: any;
  onClick: (newSelectedIndex: number, newNetworkType: NetworkType) => void;
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
    <span className={`inline-flex rounded border border-black/20 ${className}`}>
      {items.map((item: ToggleItem, i: number) => {
        const isSelected = selectedIndex === i;
        const statefulClassNames = isSelected ? "opacity-100" : "opacity-50";
        return (
          <span
            key={i}
            className={`relative inline-flex cursor-pointer place-items-center py-1 px-3 ${statefulClassNames}`}
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
