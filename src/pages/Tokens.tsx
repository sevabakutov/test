import { useContext, useEffect, useState } from "react";
import { useTelegram } from "../components/hooks/useTelegram";

import FilterToken from "../components/token/FilterToken";
import PoolList from "../components/token/TokenList";
import Header from "../components/header/Header";

import { IdeaArray, IdeaContext } from "../context/idea";
import List from "../components/leader_board/List";
import Footer from "../components/footer/Footer";
import { WebSocketContext } from "../context/socet";

const Pools = () => {
  const { leaderboard } = useContext(WebSocketContext);
  const { tradePools } = useContext(IdeaContext)!;
  const { tg } = useTelegram();
  const [activePage, setActivePage] = useState<string>("home");
  
  const pools: IdeaArray = [...tradePools];

  useEffect(() => {
    tg.BackButton.hide();
  }, [tg]);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        style={{
          width: "100%",
          background: "#080A15",
          height: "100vh",
          maxWidth: "900px",
          padding: "80px 0",
        }}
      >
        <Header />
        {activePage === "home" ? (
          <>
            <List data={leaderboard}/>
            <FilterToken />
            <PoolList pools={pools} />
          </>
        ) : activePage === "task" ? (
          <div
            style={{
              height: "90vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#8e8e8e",
              fontSize: "20px",
            }}
          >
            Coming soon...
          </div>
        ) : activePage === "wallet" ? null : null}
        <Footer activePage={activePage} setActivePage={setActivePage} />
      </div>
    </div>
  );
};

export default Pools;
