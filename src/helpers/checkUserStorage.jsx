import { useContext } from "react";
import getUserStorage from "../helpers/getUserStorage";

const checkUserStorage = () => {
  const { socket } = useContext(AllMessageContext);
  const user = getUserStorage();

  if (user) {
    if (user.socketId !== socket.id) {
      user.socketId = socket.id;
      setUserStorage(user);
      return user;
    }
  }
  return null;
};

export default checkUserStorage;
