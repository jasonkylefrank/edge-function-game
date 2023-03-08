import XataGame from "components/xata-game/xata-game";

export default function Home() {
  return (
    <div>
      <h2>{`Xata workers experiment: "Free the butterfly!"`}</h2>

      <p>{`The Xata butterfly is trapped and needs your help!`}</p>
      <p>
        {`She was flying around the internet and got caught between Vercel's edge functions and Xata's new 
          (edge) worker functions.`}
      </p>
      <p>
        {`You can free her by moving her one step at a time.  With each move, a call to either Xata's or Vercel's edge 
          functions will be made to test-out the latency of these services and move her toward the exit.  You'll be able 
          to visually see the difference between a “local move” (immediate) and the move that comes back from the edge 
          function.  Hopefully the difference is pretty small!            
          `}
      </p>
      <XataGame className="h-[392px] sm:h-[520px]" />
    </div>
  );
}
