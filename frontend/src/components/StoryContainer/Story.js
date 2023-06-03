import React, { useState } from "react";
import "./Story.css";
import ImgTag from "../ImgTag";
import { Link } from "react-router-dom";
const Story = () => {
  // const [storyList,setStoryList]=useState([])

  const storyList = [
    {
      profilePic: "../images/inputIcons/user.jpg",
      username: "demo2150",
    },
    {
      profilePic: "../images/inputIcons/user.jpg",
      username: "temp2150",
    },
    // {
    //   "profilePic": "../images/inputTrue.png",
    //   "username": "instagram"

    // }, {
    //   "profilePic": "../images/x-mark-1.png",
    //   "username": "instagram"

    // }, {
    //   "profilePic": "../images/lightFacebookIcons.png",
    //   "username": "instagram"

    // }, {
    //   "profilePic": "../images/facebook.png",
    //   "username": "instagram"

    // }, {
    //   "profilePic": "../images/inputIcons/search.png",
    //   "username": "instagram"

    // }, {
    //   "profilePic": "../images/inputIcons/reels.png",
    //   "username": "instagram"

    // }, {
    //   "profilePic": "../images/inputIcons/instagram.png",
    //   "username": "instagram"

    // },
  ];

  return (
    <div className="storyList">
      {storyList.map((item, index) => {
        return (
          <Link
            to={"/story"}
            className="userStory"
            key={index}
            onClick={() => {
              console.log("Story Clicked!!");
            }}
          >
            <div className="storyback">
              <ImgTag src={item.profilePic} width={59} height={59} />
            </div>
            <span className="storyUserName"> {item.username} </span>
          </Link>
        );
      })}
    </div>
  );
};

export default Story;
