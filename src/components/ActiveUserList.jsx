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

  const handleJoin = (e, user) => {
    e.preventDefault();
    console.log(`Join to user: ${user.username} with id: ${user.id}`);
  };

  return withoutThisUser.length > 0 ? (
    <div>
      <h3>Active users</h3>
      <ul>
        {withoutThisUser.map((user) => (
          <li key={user.id}>
            <button onClick={(e) => handleJoin(e, user)}>Join</button>
            <p>
              {user.username} {user.loginDate}
            </p>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <></>
  );
};

export default ActiveUserList;
