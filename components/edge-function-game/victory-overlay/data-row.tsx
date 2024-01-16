import type { FC } from "react";

interface DataRowProps {
  label: string;
  edgeValue: number | undefined;
  serverlessValue: number | undefined;
}

const DataRow: FC<DataRowProps> = ({ label, edgeValue, serverlessValue }) => {
  const renderValue = (value: number | undefined) => {
    const contents = value ? (
      <>
        <span>{value}</span>
        <span className="text-black/50">{"ms"}</span>
      </>
    ) : (
      <span className="text-black/50">{"N/A"}</span>
    );

    return <span className="text-right">{contents}</span>;
  };

  return (
    <>
      <span className="text-black/70">{label}</span>
      {renderValue(edgeValue)}
      {renderValue(serverlessValue)}
    </>
  );
};
export default DataRow;
