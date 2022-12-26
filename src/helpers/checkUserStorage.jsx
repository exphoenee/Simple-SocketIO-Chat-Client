import getUserStorage from "../helpers/getUserStorage";
import setUserStorage from "../helpers/setUserStorage";

const checkUserStorage = (socket) => {
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
