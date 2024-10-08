import { Route, Routes } from "react-router-dom";
import { routes } from "../router/index";
import { useContext } from "react";
import { WebSocketContext } from "../context/socet";

const AppRouter = () => {
  // const { tg } = useTelegram();
  // const initData = tg.initData;

  // const WS_USER_URL = "wss://hash-cash.io/ws/telegram/user/";
  // const { data, error, send, readyState } = useWebSocket(WS_USER_URL);

  // const [isUserDataRequested, setIsUserDataRequested] = useState(false);
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  // const { profile, createProfile } = useContext(ProfileContext);

  // const { wallet, connected } = useTonConnect();

  // useEffect(() => {
  //   if (readyState === WebSocket.OPEN && !isUserDataRequested) {
  //     get_user_data(initData, send, false);
  //     setIsUserDataRequested(true);
  //   }
  // }, [readyState]);

  // useEffect(() => {
  //   if (data) {
  //     const dataObj = JSON.parse(data);
  //     switch (dataObj.message) {
  //       case "User not found": {
  //         create(initData, send);
  //         break;
  //       }

  //       case "User found": {
  //         setIsAuthenticated(true);
  //         const parsedData: Profile = JSON.parse(data);
  //         const profileObj = {
  //           id: parsedData.id,
  //           username: parsedData.username,
  //           img: parsedData.img,
  //           pnl: parsedData.pnl,
  //         };
  //         createProfile(profileObj);
  //         break;
  //       }

  //       case "User was created!": {
  //         setIsAuthenticated(true);
  //         break;
  //       }

  //       // case "User was updated!": {
  //       //   console.log("Updated user:", JSON.parse(data));
  //       // }
  //     }
  //   }
  // }, [data]);

  // useEffect(() => {
  //   if (
  //     readyState === WebSocket.OPEN &&
  //     isUserDataRequested &&
  //     isAuthenticated
  //   ) {
  //     console.log("connecetd");
  //     if (connected && profile.username) {
  //       console.log("user");
  //       update_user_params(
  //         { username: profile.username, wallet_addr: wallet },
  //         send
  //       );
  //     }
  //   }
  // }, [connected]);

  // if (!isAuthenticated || !isUserDataRequested) {
  //   return (
  //     <div
  //       style={{
  //         display: "flex",
  //         justifyContent: "center",
  //         alignItems: "center",
  //         height: "100vh",
  //         backgroundColor: "#080A15",
  //         fontSize: "24px",
  //         color: "white",
  //       }}
  //     >
  //       Loading...
  //     </div>
  //   );
  // }

  const { verifError, isLoading } = useContext(WebSocketContext);

  if (verifError) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#000000",
          fontSize: "24px",
          color: "red",
        }}
      >
        Просто verif error, ошибка аутенификации
      </div>
    );
  }

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#000000",
          fontSize: "24px",
          color: "white",
        }}
      >
        Loading..
      </div>
    );
  }

  return (
    <Routes>
      {routes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<route.component {...(route.props || {})} />}
        />
      ))}
    </Routes>
  );
};

export default AppRouter;
