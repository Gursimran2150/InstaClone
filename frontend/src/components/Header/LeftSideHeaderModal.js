import React, { useEffect, useState } from "react";
import InputField from "../InputField";
import Button from "../Button";
import { searchUsers } from "../../slices/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import ImgTag from "../ImgTag";
import { follow } from "../../apiRequests/followApi";

const LeftSideHeaderModal = () => {
  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem("token"));

  const searchedUsersTemp = useSelector((state) => state.searchUser.users);
  const searchedUsers = searchedUsersTemp.slice(
    0,
    searchedUsersTemp.length - 2
  );

  console.log("users-: " + searchedUsers.toString());

  const [authToekn, setAuthToken] = useState("");
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    setAuthToken(token);
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
  async function followBtn(id) {
    await follow({ id: id, token: authToekn })
      .then((respones) => {
        console.log("res-->", respones.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div className="hideComponent">
      <div className="">
        <h3>Search Users</h3>
        <InputField type="ixy" onchange={handleChange} />
      </div>

      {searchedUsersTemp[1] !== 500
        ? searchedUsers.map((user, ind) => {
            return (
              <div className="suggestedUserProfile" key={ind}>
                <div className="userProfile">
                  <div className="suggestedUserProfileImg">
                    <ImgTag
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
                  <Button text={"Follow"} onclick={() => followBtn(user._id)} />
                </div>
              </div>
            );
          })
        : ""}

      <div>
        <h5>Recent</h5>
        <Button text={"see All"} />
      </div>
      <div>
        <video src=",,."></video>
      </div>
    </div>
  );
};

export default LeftSideHeaderModal;
