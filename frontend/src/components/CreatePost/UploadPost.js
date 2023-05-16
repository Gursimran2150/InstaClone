import React, { useEffect, useState } from "react";
import Button from "../Button";
import ImgTag from "../ImgTag";
import "./CreatePostModal.css";
import { getUser } from "../../apiRequests/userApi";
import AddDecriptionPost from "./AddDecriptionPost";

const UploadPost = ({ link }) => {
  const [isImgSelect, setImgselect] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleNextClick = () => {
    link.length > 0 ? setImgselect(true) : setImgselect(false);
  };

  const handleBackClick = () => {
    setImgselect(false);
  };

  const getUserData = async (token) => {
    await getUser(token)
      .then((response) => {
        setCurrentUser(response.data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"))
    getUserData(token);
  }, []);

  return (
    <>
      {isImgSelect ? (
        <AddDecriptionPost
          handleBackClick={handleBackClick}
          link={link}
          currentUser={currentUser}
        />
      ) : (
        <div className="createPostCont">
          <div className="cropPostModalHeading">
            <Button text={"Back"} className="postModalBackBtn" />
            <h4> Crop </h4>
            <Button
              text={"Next"}
              className="postModalNextBtn"
              onclick={handleNextClick}
            />
          </div>
          <div className="cropPostModalContent">
            <ImgTag src={link} width={500}/>
          </div>
        </div>
      )}
    </>
  );
};

export default UploadPost;
