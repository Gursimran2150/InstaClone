import React, { useEffect, useState } from "react";
import { getUserById } from "../../apiRequests/userApi";
import AnchorTag from "../AnchorTag";
import Button from "../Button";
import Footer from "../Footer/Footer";
import ImgTag from "../ImgTag";
import "./UserProfile.css";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import PostModal from "../Common/PlayingContent/PostModal";

const UserProfile = ({ userId }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredPostId, setHoveredPostId] = useState(null);

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
  }, [currentUser.userName, userId]);

  //model for the posts when user will click hi one particular post
  function openPostModel(post) {
    setCurrentPost(post);
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

  //console.log(currentUser);

  // console.log(userPosts);
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
                    text={"Follow"}
                    className="editProfileBtn followBtn"
                  />
                  <Button
                    text={"Message"}
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
                      onClick={() => openPostModel(post)}
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
      <PostModal post={currentPost} isOpen={isOpen} handleClose={handleClose} />
      <div className="userProfilePageFooter">
        <Footer />
      </div>
    </div>
  );
};

export default UserProfile;
