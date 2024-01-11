"use client";

import type { FC } from "react";
import HeartBrokenGlyph from "components/icon-glyphs/heart_broken-glyph";
import { gameTokenColorClassNames } from "components/edge-function-game/edge-function-game";

interface GameTokenForDescriptionProps {
  tokenType: "local" | "network";
}

const GameTokenForDescription: FC<GameTokenForDescriptionProps> = ({
  tokenType,
}) => {
  return (
    <HeartBrokenGlyph
      className={`${
        tokenType === "local"
          ? gameTokenColorClassNames.local
          : gameTokenColorClassNames.network
      } inline h-6 rounded-3xl bg-black/80 p-1`}
    />
  );
};
export default GameTokenForDescription;
