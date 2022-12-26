import React, { useContext } from "react";

import { AllMessageContext } from "../contexts/allMessageContext";

const MessagesBox = () => {
  const { allMessages, userId } = useContext(AllMessageContext);

  return (
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
  );
};

export default MessagesBox;
