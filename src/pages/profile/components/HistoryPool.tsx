import ArrowUp from "../../../assets/Icons/Arrow-up";

interface ProfilePooProps {
  pnl: number;
}

const ProfileHistoryPool: React.FC<ProfilePooProps> = ({ pnl }) => {
  return (
    <div className="histoly_wrapper">
      <div className="title">History of Pools</div>
      <div className="pool_list_block">
        {/* <ul className="list">
          <li className="list_item">
            <div className="list_item_info">
              <div className="arrow_block">
                <ArrowUp />
              </div>
              <div className="arrow_active">$BTC</div>
            </div>
            <div className="pnl">
              pnl <span>- 300%</span>
            </div>
          </li>
          <li className="list_item">
            <div className="list_item_info">
              <div className="arrow_block">
                <ArrowUp />
              </div>
              <div className="arrow_active">$BTC</div>
            </div>
            <div className="pnl">
              pnl <span>- 300%</span>
            </div>
          </li>
          <li className="list_item">
            <div className="list_item_info">
              <div className="arrow_block">
                <ArrowUp />
              </div>
              <div className="arrow_active">$BTC</div>
            </div>
            <div className="pnl">
              pnl <span>- 300%</span>
            </div>
          </li>
          <li className="list_item">
            <div className="list_item_info">
              <div className="arrow_block">
                <ArrowUp />
              </div>
              <div className="arrow_active">$BTC</div>
            </div>
            <div className="pnl">
              pnl <span>- 300%</span>
            </div>
          </li>
        </ul> */}
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
