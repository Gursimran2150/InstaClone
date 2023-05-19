import React, { useEffect, useState } from "react";
import "./SuggestionBox.css";
import ImgTag from "../ImgTag";
import Button from "../Button";
import SuggestionBoxFooter from "./SuggestionBoxFooter";
import { getAllUsers } from "../../apiRequests/userApi";
import { follow } from "../../apiRequests/followApi";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserById } from "../../slices/userSlice";
import axios from "axios";
import { BACKEND_URL } from "../../config";

const SuggestionBox = ({ user }) => {
  const dispatch = useDispatch();

  //getting list of user current user and auth token of current user
  const [listOfUser, setListOfUser] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [authToken, setAuthToken] = useState("");

  const userData = useSelector((state) => state.user.data);

  //get all the avaialable users
  const getUsers = async (token) => {
    try {
      const response = await getAllUsers(token);
      setListOfUser(response.data.users);
    } catch (err) {
      console.log(err);
    }
  };

  //follow a user
  const followBtn = async (id) => {
    const user = JSON.parse(localStorage.getItem("userCedentials"));
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      await follow({ id: id, token: authToken });
      dispatch(fetchUserById({ id: user._id, token }));
      getUsers(authToken);
    } catch (err) {
      console.log(err);
    }
  };

  //unfollow user
  const unfollowBtn = async (id) => {
    try {
      const user = JSON.parse(localStorage.getItem("userCedentials"));
      const token = JSON.parse(localStorage.getItem("token"));

      await axios.put(`${BACKEND_URL}/follow/unfollow/${id}`, {
        _id: user._id,
      });
      console.log("UnFollow successful");
      dispatch(fetchUserById({ id: user._id, token }));
      getUsers(authToken);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    setAuthToken(token);
    getUsers(token);

    const user = JSON.parse(localStorage.getItem("userCedentials"));
    if (user) {
      setCurrentUser(user);
      dispatch(fetchUserById({ id: user._id, token }));
    } else {
      const user = JSON.parse(localStorage.getItem("signUser"));
      setCurrentUser(user);
    }
  }, [dispatch]);

  //convert uri
  const convert = (url) => {
    if (url && url.uri) {
      const encoded = encodeURI(url.uri);
      return encoded;
    }
    return url;
  };

  //changing follow and following text
  const handleFollowText = (userId) => {
    if (userData.followData && userData.followData.following.includes(userId)) {
      return "Following";
    } else {
      return "Follow";
    }
  };

  return (
    <div className="suggestionContainer">
      <div className="userDetails">
        <div className="userProfile">
          <div>
            <ImgTag
              src={
                currentUser?.profileImage?.uri
                  ? convert(user?.profileImage?.uri)
                  : "../images/inputIcons/profile.png"
              }
              width={60}
            />
          </div>
          <div className="suggestedListUserCont">
            <span className="suggestedListUserName">
              {currentUser?.userName}
            </span>
            <span className="suggestedListName">
              {currentUser?.firstName} {user?.lastName}
            </span>
          </div>
        </div>

        <div className="switchButton">
          <Button text={"Switch"} />
        </div>
      </div>

      <div className="suggestionHeading">
        <span>Suggestion for you</span>
        <Button text={"See All"} />
      </div>

      <div className="suggestedUser">
        {listOfUser
          .filter((item) => item._id !== currentUser._id)
          .map((user, ind) => {
            const followText = handleFollowText(user._id);
            return (
              <div className="suggestedUserProfile" key={ind}>
                <div className="userProfile">
                  <div className="suggestedUserProfileImg">
                    <ImgTag
                      src={
                        user?.profileImage?.thumbnail?.uri
                          ? convert(user?.profileImage?.thumbnail?.uri)
                          : "../images/inputIcons/profile.png"
                      }
                    />
                  </div>
                  <div className="suggestedListUserCont">
                    <span className="suggestedListUserName">
                      {user?.userName}
                    </span>
                    <span className="suggestedListName">{user?.firstName}</span>
                  </div>
                </div>
                <div className="switchButton">
                  <Button
                    text={followText}
                    onclick={
                      followText === "Following"
                        ? () => unfollowBtn(user._id)
                        : () => followBtn(user._id)
                    }
                  />
                </div>
              </div>
            );
          })}
      </div>

      <div>
        <SuggestionBoxFooter />
      </div>
    </div>
  );
};

export default SuggestionBox;
