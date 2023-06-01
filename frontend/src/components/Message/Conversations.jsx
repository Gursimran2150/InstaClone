import React from "react";
import "./conversation.css";

const Conversations = ({ text, ownMessage }) => {
  return (
    <div
      className="userMessageContainer"
      style={{
        justifyContent: ownMessage ? "flex-end" : "flex-start",
      }}
    >
      <div
        className="userMessage"
        style={{
          border: ownMessage ? "none" : "1px solid lightgray",
          backgroundColor: ownMessage ? "#f1f1f1" : "",
        }}
      >
        {text}
      </div>
    </div>
  );
};

export default Conversations;
