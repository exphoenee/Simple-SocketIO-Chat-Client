import React, { useState, useContext } from "react";

import { AllMessageContext } from "../contexts/AllMessageContext";

const Logout = () => {
  const { setUserdata } = useContext(AllMessageContext);

  const handleLogout = () => {
    localStorage.removeItem("userdata");
    setUserdata(null);
    //window.location.reload();
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
