import React, { useEffect, useState } from "react";
import "./message.css";
import axios from "axios";
import UserMessageProfile from "./UserMessageProfile";
import Conversations from "./Conversations";
import MessageUsersModal from "./MessageUsersModal";

const Message = () => {
  const [listChatUsers, setListChatUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [openConversation, setOpenConversation] = useState(false);
  const [otherUser, setOtherUser] = useState({});
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [roomId, setRoomId] = useState("");
  const [isMessageUserModalOpen, setMessageUserModal] = useState(false);

  function isCurrentUser(id) {
    if (id === currentUser._id) {
      return true;
    } else {
      return false;
    }
  }

  async function sendMessage() {
    try {
      const { data } = await axios.post("http://localhost:4500/message", {
        roomId: roomId,
        senderId: currentUser._id,
        text: text,
      });
      console.log(`${data.text} sent successfully!`);
      setText("");
    } catch (e) {
      console.log(e);
    }
  }

  async function getChatUsers(userId) {
    try {
      const { data } = await axios.get(
        `http://localhost:4500/chatroom/${userId}`
      );

      setListChatUsers(data);
    } catch (e) {
      console.log(e);
    }
  }

  function handleConversationClick(user, roomId) {
    setOpenConversation(true);
    setOtherUser(user);

    setRoomId(roomId);
    fetchAllMessages(roomId);
  }

  async function fetchAllMessages(roomId) {
    try {
      const { data } = await axios.get(
        `http://localhost:4500/message/${roomId}`
      );

      // console.log(data);
      setMessages(data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("userCedentials")));
    getChatUsers(currentUser._id);
  }, [currentUser._id]);

  return (
    <>
      <div className="sendMessageParentWrapper">
        <div className="sendMessageParent">
          <div className="userDetailsAndListUsers">
            <div className="userNameHeaderBox">
              {currentUser.userName}
              <img
                src="../images/inputIcons/edit-button.png"
                alt="edit icon"
                onClick={() => setMessageUserModal(true)}
              />
            </div>
            <div className="usersMessageList">
              {listChatUsers.map((user) => (
                <div
                  onClick={() =>
                    handleConversationClick(
                      isCurrentUser(user.members[0]._id)
                        ? user.members[1]
                        : user.members[0],
                      user._id
                    )
                  }
                >
                  <UserMessageProfile
                    key={user._id}
                    user={
                      isCurrentUser(user.members[0]._id)
                        ? user.members[1]
                        : user.members[0]
                    }
                  />
                </div>
              ))}
            </div>
          </div>

          {/* chat box conatiner  */}

          <div className="userChatBox">
            {openConversation ? (
              <>
                <div className="chatBoxHeader">
                  <div className="userProfileLeftBox">
                    <img src="../images/inputIcons/profile.png" alt="profile" />
                    <h6>{`${otherUser?.firstName} ${otherUser?.lastName}`}</h6>
                  </div>
                  <div className="userProfileRightBox">
                    <img src="../images/inputIcons/phonecall.png" alt="icon" />
                    <img src="../images/inputIcons/video.png" alt="icon" />
                    <img src="../images/inputIcons/info.png" alt="icon" />
                  </div>
                </div>
                <div className="userChats">
                  {messages.map((message) => (
                    <Conversations
                      text={message.text}
                      ownMessage={message.senderId === currentUser._id}
                    />
                  ))}
                </div>

                <div className="sendChatContainer">
                  <div className="chatSendInput">
                    <div className="emogBox">
                      <img
                        src="../images/inputIcons/smile.png"
                        alt="emog"
                        width={"24px"}
                        height={"24px"}
                      />
                    </div>
                    <div className="inputBox">
                      <input
                        type="text"
                        placeholder="Message"
                        onChange={(e) => setText(e.target.value)}
                        value={text}
                      />
                    </div>

                    <div className="otherIconsBox">
                      {text.length > 0 ? (
                        <button
                          className="sendBtn"
                          onClick={() => sendMessage()}
                        >
                          Send
                        </button>
                      ) : (
                        <>
                          <img
                            src="../images/inputIcons/gallery.png"
                            alt="emog"
                            width={"24px"}
                            height={"24px"}
                          />
                          <img
                            src="../images/inputIcons/blackHeart.png"
                            alt="emog"
                            width={"24px"}
                            height={"24px"}
                          />
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>

      <MessageUsersModal
        isOpen={isMessageUserModalOpen}
        setMessageUserModal={setMessageUserModal}
        setOtherUser={setOtherUser}
        setOpenConversation={setOpenConversation}
        setRoomId={setRoomId}
        fetchAllMessages={fetchAllMessages}
      />
    </>
  );
};

export default Message;
