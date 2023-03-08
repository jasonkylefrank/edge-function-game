"use client";

import React, { useEffect, useRef, useState } from "react";
import { xataWorker } from "xata";
import cn from "classnames";
import ChevronLeftGlyph from "components/icon-glyphs/chevron_left-glyph";
import ChevronRightGlyph from "components/icon-glyphs/chevron_right-glyph";
import ExpandLessGlyph from "components/icon-glyphs/expand_less-glyph";
import ExpandMoreGlyph from "components/icon-glyphs/expand_more-glyph";
import IconButton from "components/icon/icon-button";
import CompanyLogo from "../xata-logo";
import styles from "./xata-game.module.css";

enum MoveDirection {
  Up = "Up",
  Down = "Down",
  Left = "Left",
  Right = "Right",
}

const moveViaXataWorker = xataWorker(
  "moveViaXataWorker",
  async ({ xata }, direction: MoveDirection) => {
    // return await xata.db.Posts.sort("createdAt").getMany({
    //   pagination: { size, offset },
    // });

    return "Hello from Xata worker function.  You clicked: " + direction;
  }
);

export default function XataGame({ className }: { className?: string }) {
  const [logoTranslateY, setLogoTranslateY] = useState<number>(0);
  const gameBoardRef = useRef<HTMLElement>();
  const gameBoardResizeOberserverRef = useRef<ResizeObserver>();

  function handleGameBoardResize(entries: any) {
    for (const entry of entries) {
      console.log(entry);
    }
  }

  useEffect(() => {
    gameBoardResizeOberserverRef.current = new ResizeObserver(
      handleGameBoardResize
    );
    gameBoardResizeOberserverRef.current.observe(
      gameBoardRef.current as HTMLElement
    );

    const board = gameBoardRef.current;
    console.log({
      width: board?.offsetWidth,
      height: board?.offsetHeight,
    });
  }, []);

  const iconButtonHoverElementClassNameProp = {
    hoverElementClassName:
      "rounded-lg top-0 bottom-0 left-0 right-0 scale-75 group-hover:opacity-10",
  };

  async function handleArrowClick(direction: MoveDirection) {
    switch (direction) {
      case MoveDirection.Up:
        setLogoTranslateY((prev) => prev - 10);
        break;
    }

    const xataWorkerResult = await moveViaXataWorker(direction);
    console.log(xataWorkerResult);
  }

  return (
    <section className={cn(styles.root, className)}>
      <IconButton
        className={styles.upArrow}
        onClick={() => handleArrowClick(MoveDirection.Up)}
        {...iconButtonHoverElementClassNameProp}
      >
        <ExpandLessGlyph />
      </IconButton>

      <IconButton
        className={styles.leftArrow}
        onClick={() => handleArrowClick(MoveDirection.Left)}
        {...iconButtonHoverElementClassNameProp}
      >
        <ChevronLeftGlyph />
      </IconButton>

      <span
        ref={gameBoardRef}
        className={cn(
          styles.gameBoard,
          "relative rounded-lg bg-gray-800 text-white"
        )}
      >
        <span
          className="absolute 
                        top-[calc(50%-16px)] left-[calc(50%-16px)]  
                        sm:top-[calc(50%-24px)] sm:left-[calc(50%-24px)]"
        >
          <CompanyLogo
            style={{ transform: `translateY(${logoTranslateY}px)` }}
            className="h-[32px] sm:h-[40px]"
            wingsFill="#bbbbbb"
          />
        </span>
      </span>

      <IconButton
        className={styles.rightArrow}
        onClick={() => handleArrowClick(MoveDirection.Right)}
        {...iconButtonHoverElementClassNameProp}
      >
        <ChevronRightGlyph />
      </IconButton>

      <IconButton
        className={styles.downArrow}
        onClick={() => handleArrowClick(MoveDirection.Down)}
        {...iconButtonHoverElementClassNameProp}
      >
        <ExpandMoreGlyph />
      </IconButton>
    </section>
  );
}
