import React, { useState, useContext } from "react";

import { AllMessageContext } from "../contexts/allMessageContext";

import setUserStorage from "../helpers/setUserStorage";

const LoginForm = () => {
  const { socketId, socket } = useContext(AllMessageContext);
  const [username, setUsername] = useState("");

  const sendLogin = (e) => {
    e.preventDefault();
    if (username === "") return;
    console.log(`Login: ${username}`);
    const data = { socketId, username };
    socket.emit("login", data);
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
