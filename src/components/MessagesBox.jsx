import React, { useContext } from "react";

import { AllMessageContext } from "../contexts/AllMessageContext";

const MessagesBox = () => {
  const { allMessages, socketId } = useContext(AllMessageContext);

  return (
    <div>
      {allMessages.map((m, i) => (
        <p
          style={{ textAlign: m.socketId === socketId ? "left" : "right" }}
          key={`${m.message}-${i}`}
        >
          {m.socketId === socketId ? "me: " : `${m.socketId}: `}{" "}
          {`${m.message}`}
        </p>
      ))}
    </div>
  );
};

export default MessagesBox;
