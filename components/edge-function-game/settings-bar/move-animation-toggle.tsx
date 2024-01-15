import type { FC } from "react";
import HeartBrokenAnimateGlyph from "components/icon-glyphs/heart_broken_animate-glyph";
import Toggle from "components/toggle";
import ToggleTagline from "./toggle-tagline";
import { singleToggleTransitionDuration } from "./settings-bar";

interface MoveAnimationToggleProps {
  isOn: boolean;
  onClick: (value: any) => void;
  toggleLabel: any;
  taglineContent: any;
}

const MoveAnimationToggle: FC<MoveAnimationToggleProps> = ({
  isOn,
  onClick,
  toggleLabel,
  taglineContent,
}) => {
  return (
    <span className="flex flex-col place-items-center">
      <Toggle
        isOn={isOn}
        onClick={onClick}
        transitionDuration={singleToggleTransitionDuration}
        className="whitespace-nowrap px-3 font-mono text-sm"
        content={
          <>
            <HeartBrokenAnimateGlyph className={`mr-2 h-6`} />
            {toggleLabel}
          </>
        }
      />
      <ToggleTagline
        content={taglineContent}
        transitionDurationSeconds={singleToggleTransitionDuration}
        classes={{ contentFrame: "text-center" }}
      />
    </span>
  );
};
export default MoveAnimationToggle;
