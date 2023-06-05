import React, { useEffect, useState } from "react";
import InputField from "../InputField";
import Button from "../Button";
import { searchUsers } from "../../slices/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import ImgTag from "../ImgTag";
import { follow } from "../../apiRequests/followApi";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { fetchUserById } from "../../slices/userSlice";
import { getUser } from "../../apiRequests/userApi";
import UserProfile from "../UserProfile/UserProfile";
import "./leftheadermodal.css";

const LeftSideHeaderModal = ({ setActiveComponent, isOpen, setIsOpen }) => {
  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem("token"));
  const [authToekn, setAuthToken] = useState("");
  const [crrUserFollowingList, setCrrUserFollowingList] = useState([]);

  const searchedUsersTemp = useSelector((state) => state.searchUser.users);
  const searchedUsers = searchedUsersTemp.slice(
    0,
    searchedUsersTemp.length - 2
  );

  //getting cureent user following
  const getUserFollowFollowing = async () => {
    try {
      const id = JSON.parse(localStorage.getItem("userCedentials"))._id;
      const { data } = await axios.get(
        `${BACKEND_URL}/follow/getFollower/${id}`
      );
      console.log(data);
      console.log(data[0].following);
      setCrrUserFollowingList(data[0].following);
    } catch (e) {
      console.log(e.message);
    }
  };

  //checking if the current user follwing list already have the id of user that is in search list
  const checkUserFollow = (id) => {
    if (crrUserFollowingList.includes(id)) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    setAuthToken(token);
    getUserFollowFollowing();
  }, []);

  const handleChange = (e) => {
    dispatch(searchUsers({ pattern: e.target.value, token }));
  };

  const convert = (url) => {
    if (url.uri) {
      const encoded = encodeURI(url.uri);
      return encoded;
    }
    return url;
  };

  //follow btn
  async function followBtn(id) {
    await follow({ id: id, token: authToekn })
      .then((respones) => {
        console.log("res-->", respones.data.message);
        setCrrUserFollowingList((prevFollowingList) => [
          ...prevFollowingList,
          id,
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //unfollow btn
  const unfollowBtn = async (id) => {
    try {
      const user = JSON.parse(localStorage.getItem("userCedentials"));
      const token = JSON.parse(localStorage.getItem("token"));

      await axios.put(`${BACKEND_URL}/follow/unfollow/${id}`, {
        _id: user._id,
      });
      // console.log("UnFollow successful");
      setCrrUserFollowingList((prevFollowingList) =>
        prevFollowingList.filter((userId) => userId !== id)
      );
      dispatch(fetchUserById({ id: user._id, token }));
      getUser(token);
    } catch (err) {
      console.log(err);
    }
  };

  if (isOpen) {
    return (
      <div className="hideComponent">
        <div className="inputWrapper">
          <h3>Search </h3>
          {/* <InputField
          type="ixy"
          onchange={handleChange}
          className={"customInput"}
        /> */}
          <div>
            <div className="headerForMobileRightSectionInput">
              <input type="text" placeholder="Search" onChange={handleChange} />
              {/* <input onChange={handleChange} /> */}
              <img
                className="searchInputIconImg"
                width={"18px"}
                src="../images/inputIcons/searchgrey.png"
                alt="searchIcon"
              />
              <img
                className="cancelInputIcon"
                width={"16px"}
                src="../images/inputIcons/cancel.png"
                alt="searchIcon"
              />
            </div>
          </div>
        </div>

        {searchedUsersTemp[1] !== 500 ? (
          searchedUsers?.length > 0 ? (
            searchedUsers?.map((user, ind) => {
              const isFollowing = checkUserFollow(user._id);
              return (
                <div className="suggestedUserProfile" key={ind}>
                  <div className="userProfile">
                    <div className="suggestedUserProfileImg">
                      <ImgTag
                        handleClick={() => {
                          setIsOpen(false);
                          setActiveComponent(
                            <UserProfile userId={user._id} />,
                            "UserProfile"
                          );
                        }}
                        src={
                          user?.profileImage?.thumbnail?.uri
                            ? convert(user?.profileImage?.thumbnail?.uri)
                            : " ../images/inputIcons/profile.png"
                        }
                      />
                    </div>
                    <div className="suggestedListUserCont">
                      <span className="suggestedListUserName">
                        {user?.userName}{" "}
                      </span>
                      <span className="suggestedListName">
                        {" "}
                        {user?.firstName}
                      </span>
                    </div>
                  </div>

                  <div className="switchButton">
                    <Button
                      text={isFollowing ? "Following" : "Follow"}
                      onclick={
                        isFollowing
                          ? () => unfollowBtn(user._id)
                          : () => followBtn(user._id)
                      }
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <div>No Users Found</div>
          )
        ) : (
          <>
            <div className="recent">
              <h5>Recent</h5>
            </div>
          </>
        )}
      </div>
    );
  } else return null;
};

export default LeftSideHeaderModal;
