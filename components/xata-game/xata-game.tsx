"use client";

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

export default function XataGame() {
  const iconButtonHoverElementClassNameProp = {
    hoverElementClassName:
      "rounded-lg top-0 bottom-0 left-0 right-0 scale-75 group-hover:opacity-10",
  };

  async function handleArrowClick(direction: MoveDirection) {
    // TODO: affect a "local change"

    const xataWorkerResult = await moveViaXataWorker(direction);
    console.log(xataWorkerResult);
  }

  return (
    <section className={styles.root}>
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
        className={cn(
          styles.gameBoard,
          "relative h-72 justify-self-stretch rounded-lg bg-gray-800 text-white"
        )}
      >
        <span className="absolute top-[calc(50%-24px)] left-[calc(50%-24px)]">
          <CompanyLogo className="h-[40px]" wingsFill="#bbbbbb" />
        </span>
      </span>

      <IconButton
        className={styles.rightArrow}
        onClick={() => handleArrowClick(MoveDirection.Right)}
        {...iconButtonHoverElementClassNameProp}
      >
        <ChevronRightGlyph />
      </IconButton>
      {/* </div> */}

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
