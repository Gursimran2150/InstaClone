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

  return (
    <div className="userProfilePage">
      <div className="userContainer">
        <header className="userProfileHeader">
          <div className="userAvtar">
            <div className="addProfileImg">
              <Button
                text={<ImgTag src={"../images/x-mark-1.png"} width={150} />}
              />
            </div>
          </div>
          <section className="userDetailSection">
            <div className="userProfileUserName">
              <span>{currentUser?.userName} </span>
              {isSameUser() ? (
                <Button text={"Edit Profile"} className="editProfileBtn" />
              ) : (
                ""
              )}
              <Button
                text={<ImgTag src={"../images/refreshing-1.png"} width={20} />}
                className={"editProfileBtn"}
              />
            </div>
            <div className="userContentList">
              <span>{currentUser?.posts?.length} posts </span>
              <Button
                styles={{ margin: "0 20px" }}
                text={`${
                  currentUser?.followData?.follower?.length || 0
                } followers`}
              />
              <Button
                styles={{ margin: "0 20px" }}
                text={`${
                  currentUser?.followData?.following?.length || 0
                } following`}
              />
            </div>
            <div className="userprofileName">
              <span>{currentUser?.firstName} </span>
            </div>
          </section>
        </header>
        <div className="userProfileNavBar">
          <AnchorTag
            href={"*"}
            text={
              <div>
                <ImgTag
                  src={"../images/inputIcons/saveBlackIcon3.png"}
                  width={10}
                />
                <span> posts </span>
              </div>
            }
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
                  <span> Saved </span>
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
                <span> tagged </span>
              </div>
            }
          />
        </div>

        <div className="userPostGallery">
          {userPosts &&
            userPosts.map((post, ind) => (
              <div className="galleryImg" key={ind}>
                {post?.media && post.media[0]?.url && (
                  <div onClick={() => openPostModel(post)}>
                    <ImgTag
                      src={convert(post.media[0].url)}
                      alt="posts"
                      className="galleryImg"
                    />
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
      <PostModal post={currentPost} isOpen={isOpen} handleClose={handleClose} />
      <div className="userProfilePageFooter">
        <Footer />
      </div>
    </div>
  );
};

export default UserProfile;
