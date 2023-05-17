import React, { useEffect, useState } from "react";
import ImgTag from "../ImgTag";
import Button from "../Button";
import moment from "moment";
import "../Common/PlayingContent/Content.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserById } from "../../slices/userSlice";

const CommentHeader = ({ data }) => {
  // find the diff b/w post uploading date and current date
  //   const dispatch = useDispatch();
  //   const commentPersonUsername = useSelector(
  //     (state) => state.user.data.userName
  //   );
  //   useEffect(() => {
  //     const token = JSON.parse(localStorage.getItem("token"));
  //     const id = JSON.parse(localStorage.getItem("userCedentials"))._id;

  //     // console.log("login UserId-: " + id);
  //     console.log("Commented by-: " + commentPersonUsername);
  //     dispatch(
  //       fetchUserById({
  //         id: data.commentedBy != null ? data.commentedBy : id,
  //         token,
  //       })
  //     );
  //   }, [dispatch, data.commentedBy, commentPersonUsername]);
  const createDate = () => {
    let now = moment(new Date());
    let createdAt = moment(data.createdAt);
    let days = now.diff(createdAt, "days");
    if (days < 7) {
      if (days < 1) {
        if (moment(createdAt).format("mm") < "60") {
          return `${moment(createdAt).format("mm")}m`;
        } else {
          return `${moment(createdAt).format("hh")}h`;
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
            <span className="userDetailOnPostUserName">{data.commentedBy}</span>
            <span className="userDetailOnUploadTme"> {createDate()} </span>
          </div>

          <span className="userDetailonPostTittle"> {data.text} </span>
        </div>
      </div>
      <div className="optionButton">
        <Button text={"..."} />
      </div>
    </div>
  );
};

export default CommentHeader;
