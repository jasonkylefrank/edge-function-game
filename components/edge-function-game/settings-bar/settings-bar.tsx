import { FC, useState } from "react";
import EarthGlyph from "components/icon-glyphs/earth-glyph";
import VercelEdgeGlyph from "components/icon-glyphs/vercel_edge-glyph";
import ToggleGroup from "components/toggle-group";
import ToggleTagline from "./toggle-tagline";
import { NetworkType } from "../edge-function-game";
import MoveAnimationToggle from "./move-animation-toggle";

export const toggleGroupTransitionDuration = 0.25;
export const singleToggleTransitionDuration = 0.1;

interface SettingsBarProps {
  isRaw?: boolean;
  className?: string;
  selectedNetwork: NetworkType;
  onSelectedNetworkChange: (newSelectedNetwork: NetworkType) => void;
  serverlessRegionCode: string;
  isLocalMoveAnimationOn: boolean;
  onIsLocalMoveAnimationOnChange: (newIsAnimationOn: boolean) => void;
  isNetworkMoveAnimationOn: boolean;
  onIsNetworkMoveAnimationOnChange: (newIsAnimationOn: boolean) => void;
}

const SettingsBar: FC<SettingsBarProps> = ({
  isRaw,
  className,
  selectedNetwork,
  onSelectedNetworkChange,
  serverlessRegionCode,
  isLocalMoveAnimationOn,
  onIsLocalMoveAnimationOnChange,
  isNetworkMoveAnimationOn,
  onIsNetworkMoveAnimationOnChange,
}) => {
  function handleNetworkItemClick(
    newSelectedIndex: number,
    selectedNetwork: NetworkType
  ) {
    onSelectedNetworkChange(selectedNetwork);
  }

  let networkTagline;
  let networkTaglineStatefullClassNames = "";

  switch (selectedNetwork) {
    case NetworkType.VercelEdge:
      networkTagline = "Vercel's edge network (a node close to you)";
      networkTaglineStatefullClassNames = "left-0 text-left";
      break;

    case NetworkType.VercelServerlessAustralia:
      networkTagline = `Vercel's node in Syndney, Australia (${serverlessRegionCode})`;
      networkTaglineStatefullClassNames = "right-0 text-right";
  }

  const localMoveAnimationTagline = isLocalMoveAnimationOn
    ? "Paper-trail effect"
    : "";
  const networkMoveAnimationTagline = isNetworkMoveAnimationOn
    ? "Move starts when the call returns"
    : "";

  return (
    <div
      className={`flex flex-wrap place-content-center ${
        isRaw ? "gap-4" : "gap-10"
      } ${className}`}
    >
      <span className={`flex flex-col place-items-center ${isRaw && "px-4"}`}>
        <ToggleGroup
          className="font-mono text-sm"
          selectedIndex={selectedNetwork}
          transitionDuration={toggleGroupTransitionDuration}
          items={[
            {
              content: (
                <>
                  <VercelEdgeGlyph className="mr-2 h-6" />
                  {"Edge"}
                </>
              ),
              value: NetworkType.VercelEdge,
              onClick: handleNetworkItemClick,
            },
            {
              content: (
                <>
                  <EarthGlyph className="mr-2 h-6" />
                  {"Serverless"}
                </>
              ),
              value: NetworkType.VercelServerlessAustralia,
              onClick: handleNetworkItemClick,
            },
          ]}
        />
        <ToggleTagline
          content={networkTagline}
          transitionDurationSeconds={toggleGroupTransitionDuration}
          classes={{
            contentFrame: `absolute top-0 text-xs text-black/40 ${networkTaglineStatefullClassNames}`,
          }}
          motionProps={{
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
          }}
        />
      </span>

      <span
        className={`flex flex-wrap place-content-center gap-5 ${
          isRaw && "px-4"
        }`}
      >
        <MoveAnimationToggle
          isOn={isLocalMoveAnimationOn}
          onClick={onIsLocalMoveAnimationOnChange}
          toggleLabel={"Local animation"}
          taglineContent={localMoveAnimationTagline}
        />

        <MoveAnimationToggle
          isOn={isNetworkMoveAnimationOn}
          onClick={onIsNetworkMoveAnimationOnChange}
          toggleLabel={"Network animation"}
          taglineContent={networkMoveAnimationTagline}
        />
      </span>
    </div>
  );
};
export default SettingsBar;
