import { useContext, createContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
export const RoomContext: any = createContext(null);
export const RoomContextProvider = (props: any) => {
  const { children } = props;
  const [messageHistory, setMessageHistory]: any = useState([]);
  const [messageList, setMessageList]: any = useState([]);
  const [roomData, setRoomData]: any = useState("");
  const [cookies, setCookies] = useCookies(["username", "password"]);
  return (
    <RoomContext.Provider
      value={{
        messageList,
        setMessageList,
        messageHistory,
        setMessageHistory,
        roomData,
        setRoomData,
        cookies,
        setCookies,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};
export const useRoomContext = () => useContext(RoomContext);
