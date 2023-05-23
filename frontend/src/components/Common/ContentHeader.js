import React, { memo, useState } from "react";
import ImgTag from "../ImgTag";
import Button from "../Button";
import moment from "moment";
import "../Common/PlayingContent/Content.css";

import OptionModal from "../MoreOption/optionModal";

const ContentHeader = ({ data, setContent }) => {
  //dipatch to dispatch actions

  const [openOptionModal, setOpenOptionModal] = useState(false);

  //To handle side menu for a post

  const handleThreeDotClick = (e) => setOpenOptionModal(true);

  // storing username and user id
  const userName = JSON.parse(localStorage.getItem("userCedentials")).userName;
  const userId = JSON.parse(localStorage.getItem("userCedentials"))._id;

  // creating date for the post
  const createDate = () => {
    let now = moment.utc();
    let createdAt = moment.utc(data.createdAt);
    let days = now.diff(createdAt, "days");
    if (days < 7) {
      if (days < 1) {
        let minutes = moment.duration(now.diff(createdAt)).asMinutes();
        if (minutes < 60) {
          return `${Math.floor(minutes)}m`;
        } else {
          return `${Math.floor(
            moment.duration(now.diff(createdAt)).asHours()
          )}h`;
        }
      } else {
        return `${days}d`;
      }
    } else {
      return `${Math.round(days / 7)}w`;
    }
  };

  // convert uri
  const convert = (url) => {
    if (url.uri) {
      const encoded = encodeURI(url.uri);
      return encoded;
    }
    return url;
  };

  const handleCloseOptionModel = () => {
    setOpenOptionModal(false);
  };

  const checkIfUserIsSameAsLoginUser = () => {
    return userName === data.userName;
  };

  return (
    <div className="contentHeader">
      <div className="userProfile">
        <div className="userProfileImg">
          <ImgTag
            src={
              data?.profileImage
                ? convert(data?.profileImage)
                : " ../images/inputIcons/profile.png"
            }
            width={35}
          />
        </div>
        <div className="userDetailOnPost">
          <div className="userDetailTopLine">
            <span className="userDetailOnPostUserName">{data?.userName}</span>
            <span className="userDetailOnUploadTme"> {createDate()} </span>
          </div>

          <span className="userDetailonPostTittle">
            {" "}
            {data.text ? data.text : "title"}{" "}
          </span>
        </div>
      </div>

      <div className="optionButton">
        <Button onclick={handleThreeDotClick} text={"..."} />
      </div>
      <OptionModal
        isOpen={openOptionModal}
        handleClose={handleCloseOptionModel}
        sameUser={checkIfUserIsSameAsLoginUser}
        postId={data._id}
        userId={userId}
        post={data}
        setContent={setContent}
      />
    </div>
  );
};

export default memo(ContentHeader);
