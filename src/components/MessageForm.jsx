import React, { useState, useContext } from "react";

import { AllMessageContext } from "../contexts/AllMessageContext";

const MessageForm = () => {
  const { setAllMessages, userdata, socket } = useContext(AllMessageContext);
  const [message, setMessage] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();
    if (message === "") return;
    console.log("Send message");

    const data = { username: userdata.username, message, date: Date.now() };

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
