import React, { useState } from "react";
import AnchorTag from "../AnchorTag";
import ImgTag from "../ImgTag";
import "./LeftHeader.css";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import SuggestionBox from "../SuggestionBox/SuggestionBox";
import MainContent from "../MainContent/MainContent";

const LeftHeader = () => {

  const [activeComponent,setActiveComponent]=useState(<MainContent/>)
  const navigate = useNavigate();

  const headerLinks = [
    {
      url: "/",
      name: "Home",
      icon: "../images/inputIcons/home.png",
    component:<MainContent />
    },
    {
      url: "",
      name: "Search",
      icon: "../images/inputIcons/search.png",
    },
    {
      url: "/explore",
      name: "Explore",
      icon: "../images/inputIcons/exploer.png",
    component:<SuggestionBox/>
    },
    {
      url: "/reels",
      name: "Reels",
      icon: "../images/inputIcons/reels.png",
    },
    {
      url: "https://about.meta.com/",
      name: "Messages",
      icon: "../images/inputIcons/messanger.png",
    },
    {
      url: "https://about.meta.com/",
      name: "Notifications",
      icon: "../images/inputIcons/notification.png",
    },
    {
      url: "https://about.meta.com/",
      name: "Create",
      icon: "../images/inputIcons/create.png",
    },
    {
      url: "https://about.meta.com/",
      name: "Profile",
      icon: "../images/inputIcons/profile.png",
    },
  ];

  const getAllStorage = () => {
    let data = [];
    for (var i = 0; i < localStorage.length; i++) {
      data[i] = localStorage.getItem(localStorage.key(i));
    }
    return data;
  };

  const handleClick = (e) => {
    if (getAllStorage().length > 0) {
      localStorage.clear();
      navigate("/");
    }
  };

const handleChnageClick=(component,name)=>{
setActiveComponent(component)
}


  return (
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
              <div className="leftHeaderLinkBox" onClick={handleChnageClick(item.component,item.name)}>
                <AnchorTag
                  href={item.url}
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
          // href={"https://web.skype.com/"}
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
                {/* <Button text={"Menu"} onclick={handleClick} /> */}

                <div className="leftHeaderLinkName">More</div>
              </div>
            </>
          }
        />
      </div>
    </div>
  );
};

export default LeftHeader;
