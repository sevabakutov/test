import React, { createContext, useContext, useEffect, useState } from "react";

import { WebSocketContext } from "../context/socet";
import { sendMessage } from "../ws/events";
import { UserData } from "../typings";
import { useTonConnect } from "../components/hooks/useTonConnect";

interface UserProviderProps {
  children: React.ReactNode;
}

interface UserContextType {
  user: UserData;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider: React.FC<UserProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<UserData>(null);
  const { userData, readyState, isLoading, send } = useContext(WebSocketContext);

  const { wallet, connected } = useTonConnect();

  useEffect(() => {
    setUser(userData);

    console.log("Profile context, user:", userData);

  }, [userData]);

  useEffect(() => {
    if (readyState === WebSocket.OPEN) {
      if (connected && !isLoading) {
        sendMessage('user', 'update', send, { 
          username: user.username, 
          wallet: wallet 
        },);
      }
    }
  }, [connected]);


  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
};
