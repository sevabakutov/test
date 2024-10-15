import { IdeaArray } from "../../context/idea";
import TradePoolItem from "./TraidingIdeaItem";

interface PoolListProps {
  pools: IdeaArray;
}

const PoolList: React.FC<PoolListProps> = ({ pools }) => {
  console.log("PoolList, pools:", pools);

  if (!pools.length) {
    return (
      <div
        style={{
          textAlign: "left",
          color: "#888888",
          fontSize: "16px",
          letterSpacing: "0.3px",
          fontWeight: "900",
          padding: "20px",
        }}
      >
        No tokens yet
      </div>
    );
  }

  pools.sort(
    (b, a) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        padding: "0 10px 80px 10px",
      }}
      className="list_wrapper"
    >
      
      {pools.map((pool) => {
          return <TradePoolItem key={pool.id} tradePool={pool} />;
      })}
    </div>
  );
};

export default PoolList;