import React, { useContext } from "react";

import { AllMessageContext } from "../contexts/AllMessageContext";

const ActiveUserList = () => {
  const { activeUsers, userdata } = useContext(AllMessageContext);

  console.log(userdata);
  console.log(activeUsers);

  const withoutThisUser = activeUsers.filter(
    (user) => user?.id !== userdata?.id
  );

  console.log(withoutThisUser);

  return withoutThisUser.length > 0 ? (
    <div>
      <h3>Active users</h3>
      <ul>
        {withoutThisUser.map((user) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </div>
  ) : (
    <></>
  );
};

export default ActiveUserList;
