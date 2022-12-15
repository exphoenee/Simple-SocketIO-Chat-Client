import React, { useState, useEffect } from "react";
import io from "socket.io-client";

import "./App.css";

const socket = io.connect("http://localhost:3000");

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    if (message === "") return;
    console.log("Send message");
    socket.emit("send_message", { type: "sent", message });
    setMessages((prev) => [...prev, { type: "sent", message }]);
    setMessage("");
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
      setMessages((prev) => [
        ...prev,
        { type: "recived", meassage: data.message },
      ]);
    });
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
          {messages.map((m, i) => (
            <p
              style={{ textAlign: m.type === "send" ? "left" : "right" }}
              key={`${m.message}-${i}`}
            >
              {m.message}
            </p>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
