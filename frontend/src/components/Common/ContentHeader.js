import React from "react";
import ImgTag from "../ImgTag";
import Button from "../Button";
import moment from "moment";
import "../Common/PlayingContent/Content.css";
import { useDispatch } from "react-redux";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { deletePostById, fetchAllPosts } from "../../slices/postsSlice";

const ContentHeader = ({ data, post }) => {
  //dipatch to dispatch actions
  const dispatch = useDispatch();

  //To handle side menu for a post
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleThreeDotClick = (e) => handleMenu(e);

  // storing username and user id
  const userName = JSON.parse(localStorage.getItem("userCedentials")).userName;
  const userId = JSON.parse(localStorage.getItem("userCedentials"))._id;

  //deleting post
  const deletePost = (id) => {
    handleClose();
    dispatch(deletePostById({ id, userId: userId }));
    dispatch(fetchAllPosts());
  };

  // creating date for the post
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
                deletePost(data._id);
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

export default ContentHeader;
