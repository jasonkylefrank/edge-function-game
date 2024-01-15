import { AnimatePresence, motion } from "framer-motion";
import type { FC } from "react";

interface FramerMotionProps {
  initial: object;
  animate: object;
  exit: object;
}

interface Classes {
  root?: string;
  contentFrame?: string;
}

export interface ToggleTaglineProps {
  /** If not provided, the `content` will be used */
  key?: any;
  content: any;
  transitionDurationSeconds?: number;
  motionProps?: FramerMotionProps;
  classes?: Classes;
}

const ToggleTagline: FC<ToggleTaglineProps> = ({
  key,
  content,
  transitionDurationSeconds,
  motionProps,
  classes,
}) => {
  const defaultMotionProps = {
    initial: { opacity: 0, top: -8 },
    animate: { opacity: 1, top: 0 },
    exit: { opacity: 0, top: -8 },
  };
  const mergedMotionProps = motionProps || defaultMotionProps;

  return (
    <span className={`relative mt-2 h-4 w-full ${classes?.root}`}>
      <AnimatePresence>
        <motion.label
          key={key || content}
          className={`absolute top-0 w-full text-xs text-black/40 ${classes?.contentFrame}`}
          {...mergedMotionProps}
          transition={{ duration: transitionDurationSeconds || 0.25 }}
        >
          {content}
        </motion.label>
      </AnimatePresence>
    </span>
  );
};
export default ToggleTagline;
