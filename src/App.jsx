import React, { useState, useEffect } from "react";
import io from "socket.io-client";

import "./App.css";

const socket = io.connect("http://localhost:3000");

function App() {
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);

  const userId = socket.id;

  const sendMessage = () => {
    if (message === "") return;
    console.log("Send message");
    const data = { userId, message, date: Date.now() };
    socket.emit("send_message", data);
    setAllMessages((prev) => [...prev, data]);
    setMessage("");
  };

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
      <header className="App-header">
        <h1>Socket.io chat app</h1>
        <input
          onChange={(e) => {
            console.log(e.target.value);
            setMessage(e.target.value);
          }}
          value={message}
          placeholder="Message..."
        />
        <button onClick={sendMessage}>Send message</button>
        <div>
          {allMessages.map((m, i) => (
            <p
              style={{ textAlign: m.userId === userId ? "left" : "right" }}
              key={`${m.message}-${i}`}
            >
              {m.userId === userId ? "me: " : `${m.userId}: `} {`${m.message}`}
            </p>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
