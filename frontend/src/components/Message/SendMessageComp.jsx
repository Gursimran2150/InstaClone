import React from "react";
import "./sendmessagecomp.css";

const SendMessageComp = ({ setMessageUserModal }) => {
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
      <div className="sendMessageBtn">
        <button onClick={() => setMessageUserModal(true)}>Send Message</button>
      </div>
    </div>
  );
};

export default SendMessageComp;
