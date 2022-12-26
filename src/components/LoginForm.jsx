import React, { useState, useEffect, useContext } from "react";
import { v4 as uuidv4 } from "uuid";

import { AllMessageContext } from "../contexts/AllMessageContext";

import setUserStorage from "../helpers/setUserStorage";

const LoginForm = () => {
  const { socket, userdata, setUserdata } = useContext(AllMessageContext);
  const [username, setUsername] = useState("");

  const sendLogin = (e) => {
    e.preventDefault();
    if (username === "") return;
    const data = { socketId: socket.id, username, id: uuidv4() };

    socket.emit("login", data);
    setUserdata(data);
    setUserStorage(data);
  };

  return (
    <form onSubmit={sendLogin}>
      <label htmlFor="username"></label>
      <input
        id="username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        placeholder="Username"
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
