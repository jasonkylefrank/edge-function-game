import { FC, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export interface ToggleProps {
  isOn: boolean;
  className?: string;
  transitionDuration: number;
  content: React.ReactNode;
  onClick: (value: any) => void;
}

const Toggle: FC<ToggleProps> = ({
  isOn,
  content,
  className,
  transitionDuration,
  onClick,
}) => {
  return (
    <motion.span
      className={`relative inline-flex cursor-pointer select-none place-content-center place-items-center overflow-hidden rounded border border-black/20 p-1 ${className}`}
      animate={{ opacity: isOn ? 1 : 0.5 }}
      transition={{ duration: transitionDuration }}
      onClick={() => onClick(!isOn)}
    >
      {content}
      <AnimatePresence>
        <motion.span
          key={`${isOn}`}
          initial={{ left: "-100%" }}
          animate={{ left: "0%" }}
          exit={{ left: "-100%" }}
          transition={{ duration: transitionDuration }}
          className={`absolute top-0 h-full w-full ${
            isOn ? "bg-black/10" : ""
          }`}
        />
      </AnimatePresence>
    </motion.span>
  );
};
export default Toggle;
