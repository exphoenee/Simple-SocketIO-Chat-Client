import React, { useState, useEffect } from "react";
import io from "socket.io-client";

import "./App.css";

import LoginForm from "./components/LoginForm";
import Logout from "./components/Logout";
import MessageFrom from "./components/MessageForm";
import MessagesBox from "./components/MessagesBox";
import ActiveUserList from "./components/ActiveUserList";

import AllMessageContextProvider from "./contexts/AllMessageContext";

import checkUserStorage from "./helpers/checkUserStorage";

const socket = io.connect("http://localhost:3000");

function App() {
  const user = checkUserStorage(socket);

  const [allMessages, setAllMessages] = useState([]);
  const [userdata, setUserdata] = useState(user);
  const [activeUsers, setActiveUsers] = useState([]);

  useEffect(() => {
    const handleNewUsers = (users) => {
      console.log(users);
      setActiveUsers(users);
    };

    socket.on("active_users", handleNewUsers);
    return () => socket.off("active_users", handleNewUsers);
  }, [socket]);

  return (
    <div className="App">
      <AllMessageContextProvider
        value={{
          activeUsers,
          allMessages,
          setAllMessages,
          userdata,
          setUserdata,
          socket,
        }}
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
        <ActiveUserList />
      </AllMessageContextProvider>
    </div>
  );
}

export default App;
