import {
  motion,
  Variants,
  useAnimationControls,
  TargetAndTransition,
} from "framer-motion";
import { useEffect } from "react";
import HeartBrokenGlyph from "components/icon-glyphs/heart_broken-glyph";
import HeartGlyph from "components/icon-glyphs/heart-glyph";
import { useMediaQuery } from "lib/useMediaQuery";
import EastGlyph from "components/icon-glyphs/east-glyph";
import { NetworkLatency, NetworkType } from "../edge-function-game";
import DataRow from "./data-row";

//#region --- Framer Motion Variants ---
interface OverlayVariants extends Variants {
  allHidden: TargetAndTransition;
  scrimVisible: TargetAndTransition;
  brokenHeartRevealed: TargetAndTransition;
  pairRevealed: TargetAndTransition;
  dataRevealed: TargetAndTransition;
  allAscended: TargetAndTransition;
}

const wrapperVariants: OverlayVariants = {
  allHidden: { y: "0vh" },
  scrimVisible: { y: "0vh" },
  brokenHeartRevealed: {},
  pairRevealed: {},
  dataRevealed: {},
  allAscended: { y: "-100vh" },
};

const coloredScrimVariants: OverlayVariants = {
  allHidden: {
    opacity: 0,
  },
  scrimVisible: {
    opacity: 1,
    transition: {
      duration: 0.4,
    },
  },
  brokenHeartRevealed: {},
  pairRevealed: {},
  dataRevealed: {},
  allAscended: {},
};

// Constants for the main "pair" of elements: the broken heart and normal heart
const pairConstants = {
  outOfViewY: "-60vh",
  getStartingX: (nagative: boolean) => {
    const arrowIconHalfWidth = "24px"; // Half the width of the arrow icon that appears between the 2 hearts
    // We have to use this weird syntax for creating a negative value via the calc() function.  See: https://stackoverflow.com/a/25205523/718325
    return nagative
      ? `calc(-1 * 50% - ${arrowIconHalfWidth})`
      : `calc(50% + ${arrowIconHalfWidth})`;
  },
  pairRevealedXShift: {
    // The horizontal distance (in pixels) to travel from center into the "pairRevealed" state
    //largeScreen: 240,
    largeScreen: 208,
    //smallScreen: 170,
    smallScreen: 160,
  },
};

const brokenHeartVariants: OverlayVariants = {
  allHidden: {
    y: pairConstants.outOfViewY,
    x: pairConstants.getStartingX(true),
    opacity: 1,
  },
  scrimVisible: {},
  brokenHeartRevealed: {
    y: "0vh",
    transition: {
      duration: 0.3,
      //type: "spring",
      // damping: 16,
      // stiffness: 120,
    },
  },
  pairRevealed: {
    x: -pairConstants.pairRevealedXShift.largeScreen,
  },
  dataRevealed: {},
  allAscended: {},
};

const normalHeartVariants: OverlayVariants = {
  allHidden: {
    opacity: 0,
    x: pairConstants.getStartingX(false),
  },
  scrimVisible: {},
  brokenHeartRevealed: {},
  pairRevealed: {
    opacity: 1,
    x: pairConstants.pairRevealedXShift.largeScreen,
  },
  dataRevealed: {},
  allAscended: {},
};

const arrowIconVariants: OverlayVariants = {
  allHidden: {
    opacity: 0,
  },
  scrimVisible: {},
  brokenHeartRevealed: {},
  pairRevealed: {
    opacity: 1,
  },
  dataRevealed: {},
  allAscended: {},
};

const restartLinkVariants: OverlayVariants = {
  allHidden: {
    opacity: 0,
  },
  scrimVisible: {},
  brokenHeartRevealed: {},
  pairRevealed: {},
  dataRevealed: {
    opacity: 1,
  },
  allAscended: {},
};

const otherElementsVariants: OverlayVariants = {
  allHidden: {
    opacity: 0,
  },
  scrimVisible: {},
  brokenHeartRevealed: {},
  pairRevealed: {},
  dataRevealed: {
    opacity: 1,
  },
  allAscended: {},
};

function setUpVariants() {
  const variants = [
    wrapperVariants,
    coloredScrimVariants,
    brokenHeartVariants,
    normalHeartVariants,
    arrowIconVariants,
    restartLinkVariants,
    otherElementsVariants,
  ];
  // Set up common timing properties so that variants for each element run in-sync
  variants.forEach((variant) => {
    variant.pairRevealed.transition = {
      delay: 0.8,
      type: "tween", // 'spring' is default
      duration: 0.3,
    };
    variant.dataRevealed.transition = {
      delay: 0.8,
      type: "tween",
      duration: 0.5,
    };
    variant.allAscended.transition = {
      type: "tween",
      duration: 0.34,
    };
  });
}
setUpVariants();

function updateVariantsForScreenSize(isSmallScreen: boolean) {
  let xValue;

  if (isSmallScreen) {
    xValue = pairConstants.pairRevealedXShift.smallScreen;
  } else {
    xValue = pairConstants.pairRevealedXShift.largeScreen;
  }
  brokenHeartVariants.pairRevealed.x = -xValue;
  normalHeartVariants.pairRevealed.x = xValue;
}

//#endregion --- end Framer Motion Variants ---

export default function VictoryOverlay({
  onRestartGame,
  networkLatencies,
}: {
  onRestartGame: () => void;
  networkLatencies: NetworkLatency[];
}) {
  const animationControls = useAnimationControls();
  const isSmallScreen = useMediaQuery("(max-width: 640px)");

  //#region --- math stuff ---
  const firstEdgeCallLatency = networkLatencies.find(
    (item) => item.networkType === NetworkType.VercelEdge
  )?.latency;
  const firstServerlessCallLatency = networkLatencies.find(
    (item) => item.networkType === NetworkType.VercelServerlessAustralia
  )?.latency;

  const getAverageLatency = (networkType: NetworkType) => {
    const networkTypeCount = networkLatencies.reduce(
      (count: number, item) =>
        item.networkType === networkType ? count + 1 : count,
      0
    );
    const averageLatency =
      networkLatencies.reduce(
        (accum: number, item) =>
          item.networkType === networkType ? accum + item.latency : accum,
        0
      ) / networkTypeCount;

    return Math.round(averageLatency);
  };

  const getNetworkTypeLatencies = (networkType: NetworkType) =>
    networkLatencies.reduce(
      (accum: number[], item) =>
        item.networkType === networkType ? [...accum, item.latency] : accum,
      []
    );

  const getLongestLatency = (networkType: NetworkType) => {
    const networkTypeLatencies = getNetworkTypeLatencies(networkType);
    return networkTypeLatencies.length
      ? Math.max(...networkTypeLatencies)
      : undefined;
  };
  const getShortestLatency = (networkType: NetworkType) => {
    const networkTypeLatencies = getNetworkTypeLatencies(networkType);
    return networkTypeLatencies.length
      ? Math.min(...getNetworkTypeLatencies(networkType))
      : undefined;
  };
  //#endregion --- end math stuff ---

  useEffect(() => {
    async function runAnimationStates() {
      animationControls.set("allHidden");
      await animationControls.start("scrimVisible");
      await animationControls.start("brokenHeartRevealed");
      await animationControls.start("pairRevealed");
      await animationControls.start("dataRevealed");
      //await animationControls.start("allAscended");
    }

    updateVariantsForScreenSize(isSmallScreen);
    runAnimationStates();
  }, [animationControls, isSmallScreen]);

  const handleRestartGameClick = async () => {
    await animationControls.start("allAscended");
    onRestartGame();
  };

  // const heartSizeClasses = "h-[80px] w-[80px] sm:h-[132px] sm:w-[132px]";
  const heartSizeClasses = "h-[72px] w-[72px] sm:h-[112px] sm:w-[112px]";
  const statsHeaderSideBorderClassNames =
    "w-full border-1 border-black/20 inline-block";

  return (
    <motion.div
      variants={wrapperVariants}
      animate={animationControls}
      className="not-prose fixed top-0 left-0 right-0 z-50 h-full bg-white"
    >
      <motion.div
        variants={coloredScrimVariants}
        className="grid h-full grid-rows-[auto_1fr_auto] place-items-center overflow-y-scroll bg-[#08eeb2] opacity-0"
      >
        <header className="flex h-20 place-items-center">
          <motion.a
            variants={restartLinkVariants}
            onClick={handleRestartGameClick}
            className="cursor-pointer text-white opacity-0"
          >
            {"restart game"}
          </motion.a>
        </header>

        <div className="flex flex-col items-center">
          <div className="flex items-center">
            <motion.span
              variants={normalHeartVariants}
              className="inline-block opacity-0"
            >
              <HeartGlyph className={`${heartSizeClasses}`} />
            </motion.span>
            <motion.span
              variants={arrowIconVariants}
              className="inline-block opacity-0"
            >
              <EastGlyph className="h-12 w-12 fill-white opacity-70" />
            </motion.span>
            <motion.span
              variants={brokenHeartVariants}
              className="inline-block opacity-0 "
            >
              <HeartBrokenGlyph className={`${heartSizeClasses}`} />
            </motion.span>
          </div>

          <motion.h3
            variants={otherElementsVariants}
            className="mt-9 text-5xl font-light opacity-0"
          >
            {"You did it!"}
          </motion.h3>
        </div>

        <motion.div
          variants={otherElementsVariants}
          className="max-w-xl text-base opacity-0"
        >
          <div className="mt-8 grid w-full grid-cols-[1fr_auto_1fr] place-items-center gap-6">
            <hr className={`${statsHeaderSideBorderClassNames}`} />
            <h4 className="text-black/50">{"Network stats for nerds"}</h4>
            <hr className={`${statsHeaderSideBorderClassNames}`} />
          </div>

          <div className="not-prose mb-12 mt-6 grid grid-cols-[auto_auto_auto] gap-x-6 gap-y-2">
            <span />
            <span className="text-right">{"EDGE"}</span>
            <span className="text-right">{"SERVERLESS"}</span>

            <DataRow
              label="First request latency"
              edgeValue={firstEdgeCallLatency}
              serverlessValue={firstServerlessCallLatency}
            />
            <DataRow
              label="Average latency"
              edgeValue={getAverageLatency(NetworkType.VercelEdge)}
              serverlessValue={getAverageLatency(
                NetworkType.VercelServerlessAustralia
              )}
            />
            <DataRow
              label="Longest"
              edgeValue={getLongestLatency(NetworkType.VercelEdge)}
              serverlessValue={getLongestLatency(
                NetworkType.VercelServerlessAustralia
              )}
            />
            <DataRow
              label="Shortest"
              edgeValue={getShortestLatency(NetworkType.VercelEdge)}
              serverlessValue={getShortestLatency(
                NetworkType.VercelServerlessAustralia
              )}
            />
          </div>
        </motion.div>
      </motion.div>
      <div>{"&nbsp;"}</div>
    </motion.div>
  );
}
