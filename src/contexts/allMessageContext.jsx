import React, { createContext } from "react";

export const AllMessageContext = createContext();

const AllMessageContextProvider = (props) => {
  return (
    <AllMessageContext.Provider value={props.value}>
      {props.children}
    </AllMessageContext.Provider>
  );
};

export default AllMessageContextProvider;
