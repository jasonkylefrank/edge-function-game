import EdgeFunctionGame from "components/edge-function-game/edge-function-game";

export const metadata = {
  title: `Raw app`,
  description: `Just the app - useful for embedding in other sites`,
};

export default function Raw() {
  return <EdgeFunctionGame isRaw={true} />;
}
