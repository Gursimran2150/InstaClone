import React, { useCallback, useEffect, useState } from "react";
import { getUserById } from "../../apiRequests/userApi";
import AnchorTag from "../AnchorTag";
import Button from "../Button";
import Footer from "../Footer/Footer";
import ImgTag from "../ImgTag";
import "./UserProfile.css";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import PostModal from "../Common/PlayingContent/PostModal";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementLike,
  incrementLike,
  initState,
} from "../../slices/likeSlice";
import { postLike } from "../../apiRequests/postApis/postLikeApi";
import { commentOnPost } from "../../apiRequests/commentApi";
import { fetchUserById } from "../../slices/userSlice";
import { follow as followUser } from "../../apiRequests/followApi";
import Message from "../Message/Message";

const UserProfile = ({ userId, handleChnageClick }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredPostId, setHoveredPostId] = useState(null);
  const [data, setData] = useState({});
  // const [likeBtn, setLikesBtn] = useState("");
  const [tempCommentCount, setTempCommentCount] = useState(0);
  const [follow, setFollow] = useState(false);

  const dispatch = useDispatch();
  const logInUser = useSelector((state) => state.user.data);

  useEffect(() => {
    if (logInUser.followData.following.includes(userId)) {
      setFollow(true);
    } else {
      setFollow(false);
    }
  }, [logInUser.followData.following, userId]);
  // const logInUser = useSelector((state) => state.user);

  //getting the user Data

  //getting the posts of the user
  const fetchAllPostsByUsername = async (userName, token) => {
    try {
      const { data } = await axios.get(
        `${BACKEND_URL}/posts/get-post-byUserName/${userName}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const posts = Object.values(data).slice(0, -1);
      setUserPosts(posts);
    } catch (error) {
      console.log("Error fetching user posts:", error);
    }
  };

  //calling both the methods and sending them token and user ID
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));

    const getUserData = async (token) => {
      try {
        const response = await getUserById(userId, token);
        setCurrentUser(response.data);
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };

    getUserData(token);

    fetchAllPostsByUsername(currentUser.userName, token);
  }, [currentUser, currentUser.userName, userId]);

  //model for the posts when user will click hi one particular post
  function openPostModel(post) {
    setCurrentPost(post);
    setTempCommentCount(post?.comments?.length || 0);
    //console.log("current Post-:", currentPost);

    //console.log("like Btn", likeBtn);
    const payload = {
      likeCount: post?.likes?.users?.length || 0,
      likeBtn: post?.likes?.users?.includes(
        JSON.parse(localStorage.getItem("userCedentials"))._id
      )
        ? "../images/inputIcons/redHeart.png"
        : "../images/inputIcons/blackHeart3.png",
    };
    const sendData = {
      clickLike,
      addComment,
      setTempCommentCount,
      tempCommentCount,
    };
    setData(sendData);

    dispatch(initState(payload));

    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }

  // convert uri
  const convert = (url) => {
    if (url?.uri) {
      const encoded = encodeURI(url.uri);
      return encoded;
    }
    return url;
  };

  //check if the userprofile opened is of current user or other user
  const isSameUser = () => {
    const localId = JSON.parse(localStorage.getItem("userCedentials"))._id;

    if (currentUser._id === localId) {
      return true;
    } else {
      return false;
    }
  };

  function handlePostModal(post) {
    openPostModel(post);
  }

  const clickLike = useCallback(
    async (id) => {
      const { data } = await postLike({
        postId: id,
        token: JSON.parse(localStorage.getItem("token")),
      });
      if (data?.message === "post was disLiked") {
        // setTempLikeCount(tempLikeCount - 1);
        //setLikesBtn("../images/inputIcons/blackHeart3.png");
        dispatch(decrementLike());
      } else {
        //  setTempLikeCount(tempLikeCount + 1);
        //setLikesBtn("../images/inputIcons/redHeart.png");
        dispatch(incrementLike());
      }
    },
    [dispatch]
  );

  const addComment = useCallback(async (data) => {
    console.log("Add comment data");
    await commentOnPost(data, JSON.parse(localStorage.getItem("token")))
      .then((response) => {
        //setComment("");
        //commentInputRef.current.value = "";
        // setTempCommentCount(tempCommentCount + 1);
      })
      .catch((err) => console.log(err));
  }, []);

  async function handleFollow(id) {
    console.log("Follow User");
    const user = JSON.parse(localStorage.getItem("userCedentials"));
    const token = JSON.parse(localStorage.getItem("token"));
    await followUser({
      id: id,
      token: JSON.parse(localStorage.getItem("token")),
    })
      .then((respones) => {
        console.log("res-->", respones.data.message);
        dispatch(fetchUserById({ id: user._id, token }));
        setFollow(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const unfollowBtn = async (id) => {
    try {
      console.log("UnFollow User");
      const user = JSON.parse(localStorage.getItem("userCedentials"));
      const token = JSON.parse(localStorage.getItem("token"));

      await axios.put(`${BACKEND_URL}/follow/unfollow/${id}`, {
        _id: user._id,
      });
      setFollow(false);
      // console.log("UnFollow successful");

      dispatch(fetchUserById({ id: user._id, token }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="userProfilePage">
      <div className="userContainer">
        <header className="userProfileHeader">
          <div className="userAvtar">
            <div className="addProfileImg">
              <Button
                text={
                  <ImgTag
                    src={"../images/inputIcons/user.jpg"}
                    className={"imageBorder"}
                    width={150}
                  />
                }
              />
            </div>
          </div>
          <section className="userDetailSection">
            <div className="userProfileUserName">
              <span className="usernamespan">{currentUser?.userName} </span>
              <span className="userRealName">{`${currentUser?.firstName} ${currentUser.lastName}`}</span>
              {isSameUser() ? (
                <>
                  <Button
                    text={"Edit Profile"}
                    className="editProfileBtn editProfileBtnCustom"
                  />
                  <Button
                    text={
                      <ImgTag
                        src={"../images/inputIcons/settings.png"}
                        width={20}
                      />
                    }
                    className={"editProfileBtn removeBg"}
                  />
                </>
              ) : (
                <>
                  <Button
                    text={follow ? "Following" : "Follow"}
                    className="editProfileBtn followBtn"
                    onclick={
                      follow
                        ? () => unfollowBtn(userId)
                        : () => handleFollow(userId)
                    }
                    styles={{
                      backgroundColor: follow ? "#efefef" : "#0095f6",
                      color: follow ? "black" : "white",
                    }}
                  />
                  <Button
                    text={"Message"}
                    onclick={() => console.log("Open Message")}
                    className="editProfileBtn editProfileBtnCustom"
                  />
                </>
              )}
            </div>
            <div className="userContentList">
              <div>
                <span className={"followFollwerBtn"}>
                  {currentUser?.posts?.length}{" "}
                  <span
                    style={{
                      fontWeight: "normal",
                    }}
                  ></span>{" "}
                </span>
                <span>posts</span>
              </div>
              <div className="followerContainer">
                <Button
                  // styles={{ margin: "20px 20px" }}
                  className={"followFollwerBtn"}
                  text={`${currentUser?.followData?.follower?.length || 0} `}
                />
                &nbsp; followers
              </div>
              <div className="followingContainer">
                <Button
                  // styles={{ margin: "20px 20px" }}
                  className={"followFollwerBtn"}
                  text={`${currentUser?.followData?.following?.length || 0} `}
                />
                &nbsp; following
              </div>
            </div>
            <div className="userprofileName">
              <span
                className="usernamespan"
                style={{
                  fontWeight: "bold",
                }}
              >
                {currentUser?.firstName} {currentUser?.lastName}{" "}
              </span>
            </div>
          </section>
        </header>
        <div className="userProfileNavBar">
          <AnchorTag
            href={"*"}
            text={
              <div>
                <ImgTag
                  src={"../images/inputIcons/grid.png"}
                  width={10}
                  height={10}
                />
                <span className="userOptions"> posts </span>
              </div>
            }
            className={"activerBorder"}
          />
          {isSameUser() ? (
            <AnchorTag
              href={"*"}
              text={
                <div>
                  <ImgTag
                    src={"../images/inputIcons/saveBlackIcon3.png"}
                    width={10}
                  />
                  <span className="userOptions"> Saved </span>
                </div>
              }
            />
          ) : (
            ""
          )}
          <AnchorTag
            href={"*"}
            text={
              <div>
                <ImgTag
                  src={"../images/inputIcons/saveBlackIcon3.png"}
                  width={10}
                />
                <span className="userOptions"> tagged </span>
              </div>
            }
          />
        </div>

        {userPosts[0] === 404 ? (
          <div>
            <h6 style={{ textAlign: "center" }}>No Posts</h6>
          </div>
        ) : (
          <div className="userPostGallery">
            {userPosts &&
              userPosts.map((post, ind) => (
                <div className="galleryImg" key={ind}>
                  {post?.media && post.media[0]?.url && (
                    <div
                      onMouseOver={() => setHoveredPostId(post._id)}
                      onMouseOut={() => setHoveredPostId(null)}
                      onClick={() => handlePostModal(post)}
                    >
                      <ImgTag
                        src={convert(post.media[0].url)}
                        alt="posts"
                        className="galleryImgInside"
                      />
                      <div
                        style={{
                          display: post._id === hoveredPostId ? "flex" : "none",
                        }}
                        className="galleryImgInsideDiv"
                      >
                        <div className="comments">
                          <img
                            src="../images/inputIcons/heart.png"
                            alt="heart"
                            height={"24px"}
                            width={"24px"}
                          />
                          <span>{post?.likes?.users?.length}</span>
                        </div>
                        <div className="likes">
                          <img
                            src="../images/inputIcons/oval-black-speech-bubble.png"
                            alt="heart"
                            height={"24px"}
                            width={"24px"}
                          />
                          <span>{post?.comments?.length}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </div>
        )}
      </div>
      <PostModal
        post={currentPost}
        isOpen={isOpen}
        handleClose={handleClose}
        data={data}
      />
      <div className="userProfilePageFooter">
        <Footer />
      </div>
    </div>
  );
};

export default UserProfile;
