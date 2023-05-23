import React, { useEffect, useState } from "react";
import Button from "../Button";
import ImgTag from "../ImgTag";
import "./CreatePostModal.css";
import { getUser } from "../../apiRequests/userApi";
import AddDecriptionPost from "./AddDecriptionPost";
import { useNavigate } from "react-router-dom";
import CreatePostModal from "./CreatePostModal";

const UploadPost = ({ link, handleChnageClick }) => {
  const [isImgSelect, setImgselect] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [opencPostModel, setOpencPostModel] = useState(false);
  const [display, setDisplay] = useState(true);
  const navigate = useNavigate();

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
    const token = JSON.parse(localStorage.getItem("token"));
    getUserData(token);
  }, []);

  function openCreatePostModel() {
    setOpencPostModel(true);
    setDisplay(false);
    setImgselect(false);
  }
  return (
    <>
      {display ? (
        <>
          {isImgSelect ? (
            <AddDecriptionPost
              // setActiveComponent={setActiveComponent}
              handleBackClick={handleBackClick}
              link={link}
              currentUser={currentUser}
            />
          ) : (
            <div className="createPostCont">
              <div className="cropPostModalHeading">
                <Button
                  onclick={
                    // () => console.log(setActiveComponent)
                    // setActiveComponent(<CreatePostModal isOpen={true} />)
                    openCreatePostModel
                  }
                  text={"Back"}
                  className="postModalBackBtn"
                />
                <h4> Crop </h4>
                <Button
                  text={"Next"}
                  className="postModalNextBtn"
                  onclick={handleNextClick}
                />
              </div>
              <div className="cropPostModalContent">
                <ImgTag src={link} width={500} />
              </div>
            </div>
          )}
        </>
      ) : (
        <CreatePostModal isOpen={opencPostModel} />
      )}
    </>
  );
};

export default UploadPost;
