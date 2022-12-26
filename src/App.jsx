import React, { useState, useEffect } from "react";
import io from "socket.io-client";

import "./App.css";

import LoginForm from "./components/LoginForm";
import MessageFrom from "./components/MessageForm";
import MessagesBox from "./components/MessagesBox";

import AllMessageContextProvider from "./contexts/allMessageContext";

import checkUserStorage from "./helpers/checkUserStorage";

const socket = io.connect("http://localhost:3000");

function App() {
  const [allMessages, setAllMessages] = useState([]);
  const user = checkUserStorage();

  const socketId = socket.id;

  console.log(socket);

  useEffect(() => {
    const handler = (data) => {
      console.log(data);
      setAllMessages((prev) => [...prev, data]);
    };

    socket.on("receive_message", handler);
    return () => socket.off("receive_message", handler);
  }, [socket]);

  return (
    <div className="App">
      <AllMessageContextProvider
        value={{ allMessages, setAllMessages, socketId, socket }}
      >
        <header className="App-header">
          <h1>Socket.io chat app</h1>
        </header>
        <body>
          <MessageFrom />
          {user ? <MessagesBox /> : <LoginForm />}
        </body>
      </AllMessageContextProvider>
    </div>
  );
}

export default App;
