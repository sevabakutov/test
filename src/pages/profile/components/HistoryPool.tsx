import { TradePool } from "../../../typings";
import PoolList from "../../../components/token/TokenList";
import { IdeaArray } from "../../../context/idea";

interface ProfilePoolProps {
  pools: IdeaArray;
  pnl: number;
}

const ProfileHistoryPool: React.FC<ProfilePoolProps> = ({ pools, pnl }) => {
  return (
    <div className="histoly_wrapper">
      <div className="title">History of Pools</div>
      <div className="pool_list_block">
        <PoolList pools={pools} />
        <div className="total_wrapper">
          <div className="total">
            Total pnl <span> {pnl}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHistoryPool;