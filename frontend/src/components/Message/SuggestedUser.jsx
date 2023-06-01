import React, { useEffect, useState } from "react";
import "./suggesteduser.css";
import { getUserById } from "../../apiRequests/userApi";

const SuggestedUser = ({ userId, setReceiverId, setOtherUser }) => {
  const [user, setUser] = useState({});
  const [isChecked, setIsChecked] = useState(false);

  async function fetchUser(userId) {
    const { data } = await getUserById(
      userId,
      JSON.parse(localStorage.getItem("token"))
    );
    setUser(data);
  }

  useEffect(() => {
    fetchUser(userId);
  }, [userId]);

  return (
    <div className="suggestedUserContainer">
      <div className="leftSend">
        <div className="userimg">
          <img src="../images/inputIcons/profile.png" alt="profile" />
        </div>
        <div className="userInfoS">
          <div className="usernameS">{user?.userName}</div>
          <div className="fullname">
            {" "}
            {`${user?.firstName} ${user.lastName} `}
          </div>
        </div>
      </div>
      <div className="rightSend">
        <div className="checkBoxsend">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => {
              setIsChecked(!isChecked);
              if (!isChecked) {
                setReceiverId(userId);
                setOtherUser(user);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SuggestedUser;
