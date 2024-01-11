import EdgeFunctionGame from "components/edge-function-game/edge-function-game";

export default function Home() {
  return (
    <div>
      <h2>{`Edge function experiment: "Heal the broken heart!"`}</h2>

      <p>{`Web developer hearts broke when they saw the cold-starts of serverless functions. 😞`}</p>

      <p>{`But alas, edge functions evolved to (hopefully) save the day!`}</p>

      <p>{`Let's test-out the latency of an edge network function and get this heart healed!  Heal the heart by moving it out
           of the game board one step at a time.`}</p>
      <p>
        {`With each move, this app will simultenously execute 2 types of moves:`}
      </p>
      <ol>
        <li>{`A round-trip edge-network move by calling a function that has been deployed to an edge network.`}</li>
        <li>{`A "local move" that moves a version of the heart immediately.`}</li>
      </ol>

      <p>
        {`You'll be able to visually see the difference between the “local move” (immediate) and the move that comes back from the edge 
          function.  Hopefully the difference is pretty small!            
          `}
      </p>

      {/* NOTE: Don't apply the sizing classes directly to the game component since they won't override the component's size classes in the production build */}
      <div className="h-[580px] sm:h-[1080px]">
        <EdgeFunctionGame />
      </div>
    </div>
  );
}
