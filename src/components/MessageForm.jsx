import React, { useState, useContext } from "react";

import { AllMessageContext } from "../contexts/allMessageContext";

const MessageForm = () => {
  const { setAllMessages, socketId, socket } = useContext(AllMessageContext);
  const [message, setMessage] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();
    if (message === "") return;
    console.log("Send message");
    const data = { socketId, message, date: Date.now() };
    socket.emit("send_message", data);
    setAllMessages((prev) => [...prev, data]);
    setMessage("");
  };

  return (
    <form onSubmit={sendMessage}>
      <input
        onChange={(e) => {
          console.log(e.target.value);
          setMessage(e.target.value);
        }}
        value={message}
        placeholder="Message..."
      />
      <button type="submit">Send message</button>
    </form>
  );
};

export default MessageForm;
