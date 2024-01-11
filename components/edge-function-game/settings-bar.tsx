import { FC, useState } from "react";
import EarthGlyph from "components/icon-glyphs/earth-glyph";
import HubGlyph from "components/icon-glyphs/hub-glyph";
import ToggleGroup from "components/toggle-group";
import { NetworkType } from "./edge-function-game";

interface SettingsBarProps {
  className?: string;
  selectedNetwork: NetworkType;
  onSelectedNetworkChange: (newSelectedNetwork: NetworkType) => void;
}

const SettingsBar: FC<SettingsBarProps> = ({
  className,
  selectedNetwork,
  onSelectedNetworkChange,
}) => {
  const [selectedNetworkIndex, setSelectedNetworkIndex] = useState(0);

  function handleItemClick(
    newSelectedIndex: number,
    selectedNetwork: NetworkType
  ) {
    setSelectedNetworkIndex(newSelectedIndex);
    onSelectedNetworkChange(selectedNetwork);
  }

  return (
    <div className={`flex place-content-center ${className}`}>
      <ToggleGroup
        className="font-mono text-sm"
        selectedIndex={selectedNetworkIndex}
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
    </div>
  );
};
export default SettingsBar;
