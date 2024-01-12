import EdgeFunctionGame from "components/edge-function-game/edge-function-game";
import GameTokenForDescription from "components/game-token-for-description";

export default function Home() {
  return (
    <div>
      <div className="mb-14 -mt-5">
        <h2 className="text-center">{`Edge function experiment: "Heal the broken heart!"`}</h2>
      </div>

      <p>
        {`Web developer hearts broke when they saw problems with serverless functions: `}
        <strong>{`cold starts`}</strong>
        {` and `} <strong>{`network latency`}</strong>{" "}
        {` caused by their functions being deployed to a single region. 😞`}
      </p>

      <p>{`But alas, edge functions were created to (hopefully) save the day!`}</p>

      <p>
        {`Edge functions run on an `}
        <em>{`edge network`}</em>
        {`, which is a bit like a CDN for serverless functions 
      (except the runtime is more limited so you can't just deploy `}
        <em>{`any`}</em>
        {` serverless function to the edge).`}
      </p>

      <p>{`Let's test-out the latency and cold-start aspect of an edge network function and get this heart healed!  Heal the heart by moving it out
           of the game board one step at a time.`}</p>
      <p>
        {`With each move, this app will simultenously execute 2 types of moves:`}
      </p>
      <ol>
        <li>
          {`A "local move" heart `}
          <GameTokenForDescription tokenType="local" />
          {` that moves immediately (with a paper-trail effect).`}
        </li>
        <li>
          {`A round-trip network-move heart `}
          <GameTokenForDescription tokenType="network" />
          {` that moves once its network call returns.`}
          <div className="text-black/40">{`  I also added an animation to this move so you can more-easily see it "flow onto" the spot of the local-move heart.`}</div>
        </li>
      </ol>

      <p>
        {`You'll be able to visually see the difference between these two types.  Hopefully the edge function proves more responsive than the serverless function!            
          `}
      </p>
      <p className="text-sm italic text-black/40">
        {`DEVELOPER TIP: Open up the console to see some valuable info printed as you make moves or change network settings.
          `}
      </p>

      <span className="not-prose">
        <hr className="my-10" />
      </span>
      {/* NOTE: Don't apply the sizing classes directly to the game component since they won't override the component's size classes in the production build */}
      <div className="h-[580px] sm:h-[1080px]">
        <EdgeFunctionGame />
      </div>
    </div>
  );
}
