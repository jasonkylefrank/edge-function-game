import type { FC } from "react";
import HeartBrokenGlyph from "./icon-glyphs/heart_broken-glyph";

interface GameTokenProps {
  translateX: number;
  translateY: number;
  className?: string;
}

const GameToken: FC<GameTokenProps> = ({
  translateX,
  translateY,
  className,
}) => {
  return (
    <HeartBrokenGlyph
      style={{
        transform: `translateX(${translateX}px) translateY(${translateY}px) scale(100%)`,
      }}
      className={`h-[40px] sm:h-[48px] ${className}`}
    />
  );
};
export default GameToken;
