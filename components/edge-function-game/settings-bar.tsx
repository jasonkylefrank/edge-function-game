import { FC, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import EarthGlyph from "components/icon-glyphs/earth-glyph";
import HubGlyph from "components/icon-glyphs/hub-glyph";
import VercelEdgeGlyph from "components/icon-glyphs/vercel_edge-glyph";
import ToggleGroup from "components/toggle-group";
import { NetworkType } from "./edge-function-game";
import Toggle from "components/toggle";
import HeartBrokenAnimateGlyph from "components/icon-glyphs/heart_broken_animate-glyph";

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
  const [selectedNetworkIndex, setSelectedNetworkIndex] = useState(0);
  const toggleGroupTransitionDuration = 0.25;
  const singleToggleTransitionDuration = 0.1;

  function handleNetworkItemClick(
    newSelectedIndex: number,
    selectedNetwork: NetworkType
  ) {
    setSelectedNetworkIndex(newSelectedIndex);
    onSelectedNetworkChange(selectedNetwork);
  }

  let networkTagline;
  let networkTaglineStatefullClassNames = "";

  switch (selectedNetwork) {
    case NetworkType.VercelEdge:
      networkTagline = "Vercel's edge network (a node close to you)";
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
          selectedIndex={selectedNetworkIndex}
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
        <span className="relative mt-2 h-4 w-full">
          <AnimatePresence>
            <motion.label
              key={networkTagline}
              className={`absolute top-0 text-xs text-black/40 ${networkTaglineStatefullClassNames}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: toggleGroupTransitionDuration }}
            >
              {networkTagline}
            </motion.label>
          </AnimatePresence>
        </span>
      </span>

      <span
        className={`flex flex-wrap place-content-center gap-5 ${
          isRaw && "px-4"
        }`}
      >
        <span className="flex flex-col place-items-center">
          <Toggle
            isOn={isLocalMoveAnimationOn}
            onClick={onIsLocalMoveAnimationOnChange}
            transitionDuration={singleToggleTransitionDuration}
            className="whitespace-nowrap px-3 font-mono text-sm"
            content={
              <>
                <HeartBrokenAnimateGlyph className={`mr-2 h-6`} />
                {"Local animation"}
              </>
            }
          />
          <span className="relative mt-2 h-4 w-full">
            <AnimatePresence>
              <motion.label
                key={localMoveAnimationTagline}
                className={`absolute top-0 w-full text-center text-xs text-black/40`}
                initial={{ opacity: 0, top: -8 }}
                animate={{ opacity: 1, top: 0 }}
                exit={{ opacity: 0, top: -8 }}
                transition={{ duration: singleToggleTransitionDuration }}
              >
                {localMoveAnimationTagline}
              </motion.label>
            </AnimatePresence>
          </span>
        </span>
        <span className="flex flex-col place-items-center">
          <Toggle
            isOn={isNetworkMoveAnimationOn}
            onClick={onIsNetworkMoveAnimationOnChange}
            transitionDuration={singleToggleTransitionDuration}
            className="whitespace-nowrap px-3 font-mono text-sm"
            content={
              <>
                <HeartBrokenAnimateGlyph className={`mr-2 h-6`} />
                {"Network animation"}
              </>
            }
          />
          <span className="relative mt-2 h-4 w-full">
            <AnimatePresence>
              <motion.label
                key={networkMoveAnimationTagline}
                className={`absolute top-0 w-full text-center text-xs text-black/40`}
                initial={{ opacity: 0, top: -8 }}
                animate={{ opacity: 1, top: 0 }}
                exit={{ opacity: 0, top: -8 }}
                transition={{ duration: singleToggleTransitionDuration }}
              >
                {networkMoveAnimationTagline}
              </motion.label>
            </AnimatePresence>
          </span>
        </span>
      </span>
    </div>
  );
};
export default SettingsBar;
