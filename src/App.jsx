import React, { useState, useEffect } from "react";
import io from "socket.io-client";

import "./App.css";

import LoginForm from "./components/LoginForm";
import Logout from "./components/Logout";
import MessageFrom from "./components/MessageForm";
import MessagesBox from "./components/MessagesBox";

import AllMessageContextProvider from "./contexts/AllMessageContext";

import checkUserStorage from "./helpers/checkUserStorage";

const socket = io.connect("http://localhost:3000");

function App() {
  const user = checkUserStorage(socket);

  const [allMessages, setAllMessages] = useState([]);
  const [userdata, setUserdata] = useState(user);

  useEffect(() => {
    const handleNewUsers = (users) => {
      console.log(users);
    };

    socket.on("active_users", handleNewUsers);
    return () => socket.off("active_users", handleNewUsers);
  }, [socket]);

  return (
    <div className="App">
      <AllMessageContextProvider
        value={{ allMessages, setAllMessages, userdata, setUserdata, socket }}
      >
        <h1>Socket.io chat app</h1>
        {userdata ? (
          <>
            <Logout />
            <MessageFrom />
            <MessagesBox />
          </>
        ) : (
          <LoginForm />
        )}
      </AllMessageContextProvider>
    </div>
  );
}

export default App;
