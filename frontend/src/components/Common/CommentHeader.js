import ImgTag from "../ImgTag";
import Button from "../Button";
import moment from "moment";
import "../Common/PlayingContent/Content.css";
import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { useDispatch } from "react-redux";
import { fetchComments } from "../../slices/commentSlice";

const CommentHeader = ({ data, post }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  //getting username from localstorage
  const userName = JSON.parse(localStorage.getItem("userCedentials")).userName;

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleThreeDotClick = (e) => {
    handleMenu(e);
  };

  //deleting a comment
  const deleteComment = async (id) => {
    handleClose();
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      console.log("token-:", token);
      console.log(`url-: ${BACKEND_URL}/comment/${id}`);
      const { data } = await axios.delete(`${BACKEND_URL}/comment/${id}`, {
        headers: { Authorization: token },
      });
      dispatch(fetchComments(post._id));
    } catch (e) {
      console.log(e);
    }
  };

  //creating a date
  const createDate = () => {
    let now = moment.utc();
    let createdAt = moment.utc(data.createdAtC);
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
      {userName !== data.userName ? (
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
                deleteComment(data._id);
              }}
            >
              Delete
            </MenuItem>
          </Menu>
        </div>
      )}
    </div>
  );
};

export default CommentHeader;
