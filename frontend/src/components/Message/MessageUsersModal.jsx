import React, { useState } from "react";
import "./messageusermodal.css";
import { useSelector } from "react-redux";
import SuggestedUser from "./SuggestedUser";
import axios from "axios";

const MessageUsersModal = ({
  isOpen,
  setMessageUserModal,
  setOtherUser,
  setOpenConversation,
  setRoomId,
  fetchAllMessages,
}) => {
  const [receiverId, setReceiverId] = useState("initial value");

  const following = useSelector(
    (state) => state.user.data.followData.following
  );

  function handleClose() {
    setMessageUserModal(false);
  }

  function handleContainerClick(e) {
    e.stopPropagation();
  }

  function handleSendMessage() {
    const currentUserId = JSON.parse(
      localStorage.getItem("userCedentials")
    )._id;
    createRoom(currentUserId, receiverId);
    setOpenConversation(true);
    handleClose();
    // console.log("currentUserId Id", currentUserId);
    // console.log("Receiver Id", receiverId);
  }

  async function createRoom(senderId, receiverId) {
    try {
      const { data } = await axios.post("http://localhost:4500/chatroom", {
        senderId: senderId,
        recieverId: receiverId,
      });

      console.log(`Room has been created with id-: `, data._id);
      fetchAllMessages(data._id);
      setRoomId(data._id);
    } catch (e) {
      console.log(e);
    }
  }

  if (isOpen) {
    return (
      <div className="parentModalWrapper" onClick={handleClose}>
        <div className="messageUserContainer" onClick={handleContainerClick}>
          <div className="messageUserContainerHeader">
            <div onClick={handleClose}>
              <img
                src="../images/inputIcons/close.png"
                alt="crossIcon"
                width={"20px"}
                height={"20px"}
              />
            </div>
            <div className="newMessage">New message</div>
            <div>
              <button className="nextbtn" onClick={() => handleSendMessage()}>
                Send
              </button>
            </div>
          </div>

          <div className="suggested">Suggested</div>
          <div className="suggestedUserList">
            {following &&
              following.map((userId) => (
                <SuggestedUser
                  userId={userId}
                  setReceiverId={setReceiverId}
                  setOtherUser={setOtherUser}
                />
              ))}
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default MessageUsersModal;
