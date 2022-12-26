import React, { useEffect, useContext } from "react";

import { AllMessageContext } from "../contexts/AllMessageContext";

const MessagesBox = () => {
  const { allMessages, setAllMessages, userdata, socket } =
    useContext(AllMessageContext);

  useEffect(() => {
    const handler = (data) => {
      console.log(data);
      setAllMessages((prev) => [...prev, data]);
    };

    socket.on("receive_message", handler);
    return () => socket.off("receive_message", handler);
  }, [socket]);

  return (
    <div>
      {allMessages.map((m, i) => (
        <p
          style={{
            textAlign: m.username === userdata?.username ? "left" : "right",
          }}
          key={`${m.message}-${i}`}
        >
          {m.username === userdata?.username
            ? "me: "
            : `${userdata?.username}: `}
          {`${m.message}`}
        </p>
      ))}
    </div>
  );
};

export default MessagesBox;
