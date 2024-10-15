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
      <IdeaProvider>
        <WebSocketProvider>
          <UserProvider>
            <BrowserRouter>
              <AppRouter />
            </BrowserRouter>
          </UserProvider>
        </WebSocketProvider>
      </IdeaProvider>
    </TonConnectUIProvider>
  );
};
export default App;
