import React, { useEffect, useState } from "react";
import { getUserById } from "../../apiRequests/userApi";
import AnchorTag from "../AnchorTag";
import Button from "../Button";
import Footer from "../Footer/Footer";
import ImgTag from "../ImgTag";
import "./UserProfile.css";

const UserProfile = () => {
  const [currentUser, setCurrentUser] = useState(null);

  const getUserData = async (id, token) => {
    await getUserById(id, token)
      .then((response) => {
        setCurrentUser(response.data);
        console.log(response.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    const user = JSON.parse(localStorage.getItem("userCedentials"));
    getUserData(user._id, token);
  }, []);

  // convert uri
  const convert = (url) => {
    if (url?.uri) {
      const encoded = encodeURI(url.uri);
      return encoded;
    }
    return url;
  };

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
              <Button text={"Edit Profile"} className="editProfileBtn" />
              <Button
                text={<ImgTag src={"../images/refreshing-1.png"} width={20} />}
                className={"editProfileBtn"}
              />
            </div>
            <div className="userContentList">
              <span>{currentUser?.posts.length} posts </span>
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
          <AnchorTag
            href={"*"}
            text={
              <div>
                <ImgTag
                  src={"../images/inputIcons/saveBlackIcon3.png"}
                  width={10}
                />
                <span> saved </span>
              </div>
            }
          />
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
          {currentUser?.posts.map((post, ind) => {
            return (
              <div className="galleryImg" key={ind}>
                <ImgTag src={convert(post?.media[0]?.url)} alt={"images"} />
              </div>
            );
          })}
        </div>
      </div>
      <div className="userProfilePageFooter">
        <Footer />
      </div>
    </div>
  );
};

export default UserProfile;
