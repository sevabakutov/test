import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import { IdeaProvider } from "./context/idea";
import { UserProvider } from "./context/profile";
import { WebSocketProvider } from "./context/socet";

import { TonConnectUIProvider } from "@tonconnect/ui-react";

const manifestUrl: string =
  "https://hash-cash.io/json/tonconnect-manifest.json";

const App = () => {
  return (
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <WebSocketProvider>
        <UserProvider>
          <IdeaProvider>
            <BrowserRouter>
              <AppRouter />
            </BrowserRouter>
          </IdeaProvider>
        </UserProvider>
      </WebSocketProvider>
    </TonConnectUIProvider>
  );
};
export default App;
