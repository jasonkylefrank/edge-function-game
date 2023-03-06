import XataGame from "components/xata-game/xata-game";

export const metadata = {
  title: `Raw app`,
  description: `Just the app - useful for embedding in other sights`,
};

export default function Raw() {
  return (
    <div className="w-full">
      <XataGame />
    </div>
  );
}
