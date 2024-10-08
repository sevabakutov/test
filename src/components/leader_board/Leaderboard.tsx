import "./leaderboard.scss";
const Leaderboard = () => {
  return (
    <div className="board_wrapper">
      <ol className="leaderboard">
        <div className="leaderboard__title">Leader board</div>
        <li className="leaderboard__item">
          <div className="leaderboard__name-wrapper">
            <span className="leaderboard__position">1.</span>
            <span className="leaderboard__name">Kama!</span>
          </div>
          <span className="leaderboard__score">107 %</span>
        </li>
        <li className="leaderboard__item">
          <div className="leaderboard__name-wrapper">
            <span className="leaderboard__position">2.</span>
            <span className="leaderboard__name">Vileborg tw.tv</span>
          </div>
          <span className="leaderboard__score">95 %</span>
        </li>
        <li className="leaderboard__item">
          <div className="leaderboard__name-wrapper">
            <span className="leaderboard__position">3.</span>
            <span className="leaderboard__name">david26</span>
          </div>
          <span className="leaderboard__score">89 %</span>
        </li>
      </ol>
    </div>
  );
};

export default Leaderboard;
