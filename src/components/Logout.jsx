import React, { useState, useContext } from "react";

import { AllMessageContext } from "../contexts/AllMessageContext";

const Logout = () => {
  const { socket, userdata, setUserdata, setAllMessages } =
    useContext(AllMessageContext);

  const handleLogout = () => {
    localStorage.removeItem("userdata");
    socket.emit("logout", userdata);
    setUserdata(null);
    setAllMessages([]);
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
