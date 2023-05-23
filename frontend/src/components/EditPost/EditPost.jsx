import { updatePost } from "../../apiRequests/postApi";
import "./editpost.css";

import React, { useState } from "react";

const EditPost = ({ isOpen, setIsOpen, post, handleClose, setContent }) => {
  function handleBack() {
    setIsOpen(false);
  }
  async function handleDone() {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      await updatePost(post._id, updateDesc, token);
      console.log("updated successfully");
    } catch (e) {
      console.log(e.message);
    }
    setContent(updateDesc);
    setIsOpen(false);
    handleClose();
  }

  const [updateDesc, setUpdateDesc] = useState(post?.content);

  //convert img uri to url
  const convert = (url) => {
    if (url.uri) {
      const encoded = encodeURI(url.uri);
      return encoded;
    }
    return url;
  };

  if (isOpen) {
    return (
      <div className="edit">
        <div className="editPostWrapper">
          <div className="upperheader">
            <div className="back" onClick={handleBack}>
              Back
            </div>
            <div className="Editinfo">Edit Info</div>
            <div className="done_btn" onClick={handleDone}>
              Done
            </div>
          </div>
          <div className="contentShownDesc">
            <div className="imageShow">
              <img src={convert(post?.media[0].url)} alt="img" />
            </div>
            <div className="postDescEdit">
              <div className="ProfileInfo">
                <img
                  src="https://th.bing.com/th/id/OIP.S171c9HYsokHyCPs9brbPwHaGP?pid=ImgDet&rs=1"
                  alt="img"
                />
                <h6>{post?.userName}</h6>
              </div>
              <div className="addDesc">
                <textarea
                  cols="30"
                  value={updateDesc}
                  onChange={(e) => setUpdateDesc(e.target.value)}
                ></textarea>
                <div>{updateDesc.length}/2,200</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default EditPost;
