import React, { useState } from "react";
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

const HomePage = ({ comp }) => {
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState(<MainContent />);
  const [currentUser, setCurrentUser] = useState(null);

  const headerLinks = [
    {
      name: "Home",
      icon: "../images/inputIcons/home.png",
      component: <MainContent />,
    },
    {
      name: "Search",
      icon: "../images/inputIcons/search.png",
      component: <LeftSideHeaderModal/>  ,
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
      component: <CreatePostModal /> ,
    },
    {
      name: "Profile",
      icon: "../images/inputIcons/profile.png",
      component: <UserProfile />,
    },
  ];

 
  // get storage from local storage data
  const getAllStorage = () => {
    let data = [];
    for (var i = 0; i < localStorage.length; i++) {
      data[i] = localStorage.getItem(localStorage.key(i));
    }
    return data;
  };

  // for logout button
  const handleClick = (e) => {
    if (getAllStorage().length > 0) {
      localStorage.clear();
      navigate("/");
    }
  };

  const handleChnageClick = (component, name) => {
    setActiveComponent(component);
  };

  return (
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
                    onClick={() => handleChnageClick(item.component, item.name)}
                    key={index}
                  >
                    <AnchorTag
                      text={
                        <div className="leftHeaderLink">
                          <div>
                            <ImgTag src={item.icon} width={25} height={25} />
                          </div>
                          <div className="leftHeaderLinkName">{item.name}</div>
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
        </div>
      </div>
      <div className="rightContainer">
        {activeComponent ? activeComponent : ""}
      </div>
    </div>
  );
};

export default HomePage;
