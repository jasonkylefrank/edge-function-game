import { FC, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import EarthGlyph from "components/icon-glyphs/earth-glyph";
import HubGlyph from "components/icon-glyphs/hub-glyph";
import ToggleGroup from "components/toggle-group";
import { NetworkType } from "./edge-function-game";

interface SettingsBarProps {
  className?: string;
  selectedNetwork: NetworkType;
  onSelectedNetworkChange: (newSelectedNetwork: NetworkType) => void;
  serverlessRegionCode: string;
}

const SettingsBar: FC<SettingsBarProps> = ({
  className,
  selectedNetwork,
  onSelectedNetworkChange,
  serverlessRegionCode,
}) => {
  const [selectedNetworkIndex, setSelectedNetworkIndex] = useState(0);
  const transitionDuration = 0.25;

  function handleItemClick(
    newSelectedIndex: number,
    selectedNetwork: NetworkType
  ) {
    setSelectedNetworkIndex(newSelectedIndex);
    onSelectedNetworkChange(selectedNetwork);
  }

  let networkTagline;
  let networkTaglineRightCSS = null;

  switch (selectedNetwork) {
    case NetworkType.VercelEdge:
      networkTagline = "Vercel's edge network (a node close to you)";
      break;

    case NetworkType.VercelServerlessAustralia:
      networkTagline = `Vercel's node in Syndney, Australia (${serverlessRegionCode})`;
      networkTaglineRightCSS = 0;
  }

  return (
    <div className={`flex place-content-center ${className}`}>
      <span className="flex flex-col place-items-center">
        <ToggleGroup
          className="font-mono text-sm"
          selectedIndex={selectedNetworkIndex}
          transitionDuration={transitionDuration}
          items={[
            {
              content: (
                <>
                  <HubGlyph className="mr-2 h-5" />
                  {"Edge network"}
                </>
              ),
              value: NetworkType.VercelEdge,
              onClick: handleItemClick,
            },
            {
              content: (
                <>
                  <EarthGlyph className="mr-2 h-6" />
                  {"Serverless network"}
                </>
              ),
              value: NetworkType.VercelServerlessAustralia,
              onClick: handleItemClick,
            },
          ]}
        />
        <span className="relative mt-2 h-4 w-full">
          <AnimatePresence>
            <motion.label
              key={networkTagline}
              className={`absolute top-0 text-xs text-black/40 ${
                networkTaglineRightCSS !== null && "right-0"
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: transitionDuration }}
            >
              {networkTagline}
            </motion.label>
          </AnimatePresence>
        </span>
      </span>
    </div>
  );
};
export default SettingsBar;
