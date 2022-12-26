import getUserStorage from "../helpers/getUserStorage";
import setUserStorage from "../helpers/setUserStorage";

const checkUserStorage = (socket) => {
  const userdata = getUserStorage();

  if (userdata && userdata?.username && userdata?.socketId) {
    if (socket.id && userdata.socketId !== socket.id) {
      userdata.socketId = socket.id;
      setUserStorage(userdata);
    }
    return userdata;
  }
  return null;
};

export default checkUserStorage;
