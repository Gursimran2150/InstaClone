import React, { useEffect, useState } from "react";
import ImgTag from "../ImgTag";
import Button from "../Button";
import moment from "moment";
import "../Common/PlayingContent/Content.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserById } from "../../slices/userSlice";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
const ContentHeader = ({ data }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const userName = JSON.parse(localStorage.getItem("userCedentials")).userName;

  // console.log("myId" + data.userName);

  const handleClose = () => {
    setAnchorEl(null);
  };
  // find the diff b/w post uploading date and current date
  // const dispatch = useDispatch();
  // const commentPersonUsername = useSelector(
  //   (state) => state.user.data.userName
  // );
  // useEffect(() => {
  //   const token = JSON.parse(localStorage.getItem("token"));
  //   const id = JSON.parse(localStorage.getItem("userCedentials"))._id;

  //   // console.log("login UserId-: " + id);
  //   // console.log("Commented by-: " + commentPersonUsername);
  //   dispatch(
  //     fetchUserById({
  //       id: data.commentedBy != null ? data.commentedBy : id,
  //       token,
  //     })
  //   );
  // }, [dispatch, data.userName, data.commentedBy]);

  const handleThreeDotClick = (e) => {
    handleMenu(e);
  };

  const deletePost = (id) => {
    handleClose();
    console.log("Post delted" + id);
  };
  const updatePost = (id) => {
    handleClose();
    console.log("Post updated" + id);
  };

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
            <span className="userDetailOnPostUserName">{data?.userName}</span>
            <span className="userDetailOnUploadTme"> {createDate()} </span>
          </div>

          <span className="userDetailonPostTittle">
            {" "}
            {data.text ? data.text : "title"}{" "}
          </span>
        </div>
      </div>
      {userName === data.userName ? (
        ""
      ) : (
        <div className="optionButton">
          <Button onclick={handleThreeDotClick} text={"..."} />
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              onClick={() => {
                deletePost(data._id);
              }}
            >
              Delete
            </MenuItem>
            <MenuItem onClick={() => updatePost(data._id)}>Edit</MenuItem>
          </Menu>
        </div>
      )}
    </div>
  );
};

export default ContentHeader;
