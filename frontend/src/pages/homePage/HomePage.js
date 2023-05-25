import React, { useEffect, useState } from "react";
import "./HomePage.css";
import LeftHeader from "../../components/Header/LeftHeader";
import Footer from "../../components/Footer/Footer";
import MainContent from "../../components/MainContent/MainContent";
import { Router, useNavigate } from "react-router-dom";
import SuggestionBox from "../../components/SuggestionBox/SuggestionBox";
import AnchorTag from "../../components/AnchorTag";
import ImgTag from "../../components/ImgTag";
import ExploreScreen from "../../components/ExploreScreen/ExploreScreen";
import { getUser } from "../../apiRequests/userApi";
import UserProfile from "../../components/UserProfile/UserProfile";
import CreatePostModal from "../../components/CreatePost/CreatePostModal";
import LeftSideHeaderModal from "../../components/Header/LeftSideHeaderModal";
import MoreOptionProfileModel from "../../components/MoreOption/MoreOptionProfileModel";

const HomePage = ({ comp }) => {
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState(<MainContent />);
  const [currentUser, setCurrentUser] = useState({});
  const [createPostModel, setCreatePostModel] = useState(true);
  const [isMoreOptionModelOpen, setMoreOptionModel] = useState(false);

  useEffect(() => {
    console.log("home page render");
    const userData = JSON.parse(localStorage.getItem("userCedentials"));
    //console.log(userData);
    setCurrentUser(userData);
  }, []);
  const handleChnageClick = (component) => {
    setActiveComponent(component);
  };

  const headerLinks = [
    {
      name: "Home",
      icon: "../images/inputIcons/home.png",
      component: <MainContent />,
    },
    {
      name: "Search",
      icon: "../images/inputIcons/search.png",
      component: () => (
        <LeftSideHeaderModal setActiveComponent={setActiveComponent} />
      ),
    },
    {
      name: "Explore",
      icon: "../images/inputIcons/exploer.png",
      component: <ExploreScreen />,
    },
    {
      name: "Reels",
      icon: "../images/inputIcons/reels.png",
      component: <SuggestionBox />,
    },
    {
      name: "Messages",
      icon: "../images/inputIcons/messanger.png",
      component: <SuggestionBox />,
    },
    {
      name: "Notifications",
      icon: "../images/inputIcons/notification.png",
      component: <SuggestionBox />,
    },
    {
      name: "Create",
      icon: "../images/inputIcons/create.png",
      component: (
        <CreatePostModal
          isOpen={createPostModel}
          handleChnageClick={handleChnageClick}
        />
      ),
    },
    {
      name: "Profile",
      icon: "../images/inputIcons/profile.png",
      component: <UserProfile userId={currentUser._id} />,
    },
  ];

  // get storage from local storage data

  // for opening menu
  const handleClick = (e) => {
    setMoreOptionModel(!isMoreOptionModelOpen);
    // if (getAllStorage().length > 0) {
    //   localStorage.clear();
    //   navigate("/");
    // }
  };

  return (
    <div className="homePageWrapper">
      {/* header navbar on 800px  */}
      <div className="headerForMobile">
        <div className="headerForMobileLogo">
          <ImgTag src={"/images/instagramLogo.png"} width={103} height={32} />
        </div>
        <div className="headerForMobileRightSection">
          <div className="headerForMobileRightSectionInput">
            <input type="text" placeholder="Search" />
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
          <div className="headerForMobileRightSectionOptions">
            <img
              src="../images/inputIcons/blackheart.png"
              alt="likeicon"
              width={"24px"}
              height={"24px"}
            />
          </div>
        </div>
      </div>

      {/* home page common for all  */}
      <div className="homePage">
        <div className="leftContainer">
          <div className="leftHeader">
            <div className="leftHeaderTop">
              <div className="leftHeaderIcon">
                <AnchorTag
                  src={"*"}
                  text={
                    <ImgTag
                      src={"/images/instagramLogo.png"}
                      width={103}
                      height={32}
                    />
                  }
                />
              </div>

              <div className="leftHeaderLinkList">
                {headerLinks.map((item, index) => {
                  return (
                    <div
                      className="leftHeaderLinkBox"
                      onClick={() =>
                        handleChnageClick(item.component, item.name)
                      }
                      key={index}
                    >
                      <AnchorTag
                        text={
                          <div className="leftHeaderLink">
                            <div>
                              <ImgTag src={item.icon} width={25} height={25} />
                            </div>
                            <div className="leftHeaderLinkName">
                              {item.name}
                            </div>
                          </div>
                        }
                        key={index}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="LeftHeaderBottom " onClick={handleClick}>
              <AnchorTag
                text={
                  <>
                    <div>
                      <ImgTag
                        src={"../images/inputIcons/menuLine.png"}
                        width={20}
                        height={22}
                      />
                    </div>
                    <div>
                      <div className="leftHeaderLinkName">More</div>
                    </div>
                  </>
                }
              />
            </div>
            <MoreOptionProfileModel
              isOpen={isMoreOptionModelOpen}
              setIsOpen={setMoreOptionModel}
            />
          </div>
        </div>
        <div className="rightContainer">
          {activeComponent ? activeComponent : ""}
        </div>
      </div>

      {/* bottom navigation on 800px  */}
      <div className="bottomNavigation">
        <div>
          <AnchorTag
            text={
              <div
                className="leftHeaderLinkbottom"
                onClick={() => setActiveComponent(<MainContent />)}
              >
                <div>
                  <ImgTag
                    src={"../images/inputIcons/home.png"}
                    width={25}
                    height={25}
                  />
                </div>
              </div>
            }
          />
        </div>

        <div>
          <AnchorTag
            text={
              <div
                className="leftHeaderLinkbottom"
                onClick={() => setActiveComponent(<ExploreScreen />)}
              >
                <div>
                  <ImgTag
                    src={"../images/inputIcons/exploer.png"}
                    width={25}
                    height={25}
                  />
                </div>
              </div>
            }
          />
        </div>

        <div>
          <AnchorTag
            text={
              <div className="leftHeaderLinkbottom">
                <div>
                  <ImgTag
                    src={"../images/inputIcons/reels.png"}
                    width={25}
                    height={25}
                  />
                </div>
              </div>
            }
          />
        </div>
        <div>
          <AnchorTag
            text={
              <div
                className="leftHeaderLinkbottom"
                onClick={() =>
                  setActiveComponent(
                    <CreatePostModal
                      isOpen={createPostModel}
                      handleChnageClick={handleChnageClick}
                    />
                  )
                }
              >
                <div>
                  <ImgTag
                    src={"../images/inputIcons/create.png"}
                    width={25}
                    height={25}
                  />
                </div>
              </div>
            }
          />
        </div>
        <div>
          <AnchorTag
            text={
              <div className="leftHeaderLinkbottom">
                <div>
                  <ImgTag
                    src={"../images/inputIcons/messanger.png"}
                    width={25}
                    height={25}
                  />
                </div>
              </div>
            }
          />
        </div>
        <div>
          <AnchorTag
            text={
              <div
                className="leftHeaderLinkbottom"
                onClick={() =>
                  setActiveComponent(<UserProfile userId={currentUser._id} />)
                }
              >
                <div>
                  <ImgTag
                    src={"../images/inputIcons/profile.png"}
                    width={25}
                    height={25}
                  />
                </div>
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
