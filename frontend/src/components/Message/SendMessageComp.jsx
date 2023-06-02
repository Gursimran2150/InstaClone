import React from "react";
import "./sendmessagecomp.css";

const SendMessageComp = () => {
  return (
    <div className="sendMessageContainer">
      <div className="sendMessageImage">
        <img
          src="../images/inputIcons/send.png"
          alt="sendImage"
          height={"120px"}
          width={"120px"}
        />
      </div>
      <div className="sendMessageImageText">
        Send private messages to a friend
      </div>
    </div>
  );
};

export default SendMessageComp;
