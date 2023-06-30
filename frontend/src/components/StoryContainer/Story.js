import React, { useEffect, useState } from "react";
import "./Story.css";
import ImgTag from "../ImgTag";
import { Link } from "react-router-dom";
const Story = () => {
  // const [storyList,setStoryList]=useState([])
  // const [iswacthed, setIsWatched] = useState(
  //   JSON.parse(localStorage.getItem("isWatched"))
  // );

  // useEffect(() => {
  //   localStorage.setItem("isWatched", "false");
  // }, []);

  const storyList = [
    {
      profilePic: "../images/inputIcons/user.jpg",
      username: "demo2150",
    },
  ];
  // function handleClick() {
  //   localStorage.setItem("isWatched", "true");
  // }

  return (
    <div className="storyList">
      {storyList.map((item, index) => {
        return (
          <Link
            to={"/story"}
            className="userStory"
            key={index}
            onClick={() => {}}
          >
            <div className={"storyback"}>
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
