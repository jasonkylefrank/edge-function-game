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
import debounce from "lib/debounce";

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
  const [logoTranslateX, setLogoTranslateX] = useState<number>(0);
  // Need to pass-in null since this ref is to store a reference to an HTML element (as opposed to an arbitrary variable). Initializing it with null makes the ref's 'current' property readonly and satisfies the TypeScrip compiler.  See: https://stackoverflow.com/a/61680609/718325
  const gameBoardRef = useRef<HTMLElement>(null);
  const gameBoardResizeOberserverRef = useRef<ResizeObserver>();
  const gameBoardWidthRef = useRef<number>();
  const gameBoardHeightRef = useRef<number>();
  // The number of "steps" (generally clicks), in any direction, for the logo to go to exit the board.
  const stepsToExit = 10;
  const currentYStepRef = useRef<number>(0); // The logo will "exit" the board once (abs(currentYStepRef.current) > stepsToExit)
  const currentXStepRef = useRef<number>(0);
  const [hasExited, setHasExited] = useState<boolean>(false);

  useEffect(() => {
    function handleGameBoardResize(
      resizeObserverEntries: ResizeObserverEntry[]
    ) {
      // We only have one entry in our case, so I'm just extracting that one
      const gameBoardResizeEntry = resizeObserverEntries[0];
      const { contentRect } = gameBoardResizeEntry;
      gameBoardWidthRef.current = contentRect.width;
      gameBoardHeightRef.current = contentRect.height;
      // Need to update the logo's position here because the previous translate amount was based on the previous board size (this keeps is positioned at the correct percentage toward the exit)
      updatePosition();
    }
    (function setUpBoardResizeObserver() {
      gameBoardResizeOberserverRef.current = new ResizeObserver(
        debounce(handleGameBoardResize, 200)
      );
      gameBoardResizeOberserverRef.current.observe(
        gameBoardRef.current as HTMLElement
      );
    })();

    const board = gameBoardRef.current;
    gameBoardWidthRef.current = board?.offsetWidth;
    gameBoardHeightRef.current = board?.offsetHeight;
  }, []);

  useEffect(() => {
    console.log("New hasExisted: " + hasExited);
  }, [hasExited]);

  const iconButtonHoverElementClassNameProp = {
    hoverElementClassName:
      "!rounded-lg !top-0 !bottom-0 !left-0 !right-0 scale-75 !group-hover:opacity-10",
  };

  function updatePosition() {
    if (!gameBoardHeightRef.current || !gameBoardWidthRef.current) {
      return;
    }
    const yPercentTowardExit = currentYStepRef.current / stepsToExit;
    const newTranslateY = yPercentTowardExit * (gameBoardHeightRef.current / 2);
    setLogoTranslateY(newTranslateY);

    const xPercentTowardExit = currentXStepRef.current / stepsToExit;
    const newTranslateX = xPercentTowardExit * (gameBoardWidthRef.current / 2);
    setLogoTranslateX(newTranslateX);
  }

  async function handleArrowClick(direction: MoveDirection) {
    if (!gameBoardHeightRef.current || !gameBoardWidthRef.current) {
      return;
    }

    switch (direction) {
      case MoveDirection.Up:
        currentYStepRef.current--; // decrement because upward is negative with CSS translate (so this keeps that mindset consistent)
        break;
      case MoveDirection.Down:
        currentYStepRef.current++;
        break;
      case MoveDirection.Left:
        currentXStepRef.current--;
        break;
      case MoveDirection.Right:
        currentXStepRef.current++;
    }
    updatePosition();

    if (
      Math.abs(currentYStepRef.current) > stepsToExit ||
      Math.abs(currentXStepRef.current) > stepsToExit
    ) {
      setHasExited(true);
    }

    // TODO:  Xata worker aspect
    //const xataWorkerResult = await moveViaXataWorker(direction);
    //console.log(xataWorkerResult);
  }
  const gameBoardColorClassNames = hasExited ? "bg-green-600" : "bg-gray-800";

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
          "relative rounded-lg  text-white",
          gameBoardColorClassNames
        )}
      >
        <span
          className="absolute 
                        top-[calc(50%-16px)] left-[calc(50%-16px)]  
                        sm:top-[calc(50%-24px)] sm:left-[calc(50%-24px)]"
        >
          <CompanyLogo
            style={{
              transform: `translateY(${logoTranslateY}px) translateX(${logoTranslateX}px)`,
            }}
            className="h-[32px] transition duration-75 sm:h-[40px]"
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
