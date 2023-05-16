import React, { useEffect, useState } from "react";
import Button from "../Button";
import ImgTag from "../ImgTag";
import Emoji from "emoji-picker-react";

import InputField from "../InputField";
import { sharePost } from "../../apiRequests/postApi";

const AddDecriptionPost = ({ handleBackClick, currentUser, link }) => {


  const [postData, setPostData] = useState({
    media: [{ url: "" }],
    type: 1,
    content: "",
  });
  const [description, setDescription] = useState("");
  const [authToekn, setAuthToken] = useState("");
  const [isPostShared, setPostShared] = useState(false);
  const [messageOnShared,setMessageShared]=useState("")

  // convert uri
  const convert = (url) => {
    if (url.uri) {
      const encoded = encodeURI(url.uri);
      return encoded;
    }
    return url;
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.innerText);
    setPostData({
      media: [{ url: link }],
      type: 1,
      content: e.target.innerText,
    });
  };

  // share post
  const handleSharePost = async (e) => {
    await sharePost(postData, authToekn)
      .then((respones) => {
        
        if (respones.data.statusCode == 200) {
          setPostShared(true)
          setMessageShared(respones.data.message)
        }else{
          setPostShared(false)
          setMessageShared(respones.data.message)

        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    // const token = localStorage.getItem("token")

    setAuthToken(token);
  }, []);

  return (
    <>
      {!isPostShared ? (
        <div className="createPostCont">
          <div className="addCaptionHeading">
            <Button
              text={"Back"}
              className="postModalBackBtn"
              onclick={handleBackClick}
            />
            <h4> Create New Post </h4>
            <Button
              text={"Share"}
              className="postModalNextBtn"
              onclick={handleSharePost}
            />
          </div>
          <div className="uploadPostModalWithUser">
            <div className="uploadPostModalImg">
              <ImgTag src={link} width={450} />
            </div>

            <div className="uploadPostModalUser">
              <div className="userNameCont">
                <ImgTag
                  src={
                    currentUser?.profileImage?.uri
                 
                      ? convert(currentUser?.profileImage?.uri)
                      : " ../images/inputIcons/profile.png"
                  }
                  width={30}
                />
                <h4> {currentUser?.userName}</h4>
              </div>
              <div className="writeCaptionBox">
                <div
                  contentEditable
                  className="descriptionBox"
                  placeholder="dkjnfkdjnfkd"
                  onInput={handleDescriptionChange}
                ></div>
                <div className="descriptionEmojiBox">
                  <small> {description?.length}/2,200 </small>
                </div>
              </div>
              <div className="uploadPostOption"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="createPostCont">
<ImgTag src={"../images/inputTrue.png"} width={100}/>
<h3> {messageOnShared} </h3>
        </div>
      )}
    </>
  );
};

export default AddDecriptionPost;
