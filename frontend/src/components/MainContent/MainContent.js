import React, { useState, useEffect } from "react";
import "./MainContent.css";
import Story from "../StoryContainer/Story";
import Content from "../Common/PlayingContent/Content";
import SuggestionBox from "../SuggestionBox/SuggestionBox";
import { getUser } from "../../apiRequests/userApi";

const MainContent = () => {
  const [currentUser, setCurrentUser] = useState(null);

  const getUserData = async (token) => {
    await getUser(token)
      .then((response) => {
        setCurrentUser(response.data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const token =JSON.parse( localStorage.getItem("token"))
    getUserData(token);
  }, []);

  return (
    <div className="homePageMainContent">
      <div className="leftMainContent">
        <div className="storyContainer">
          {/* <Story /> */}
        </div>
        <div className="mainContentList">
          <Content user={currentUser} />
        </div>
      </div>

      <div className="rightMainContainer">
        <SuggestionBox user={currentUser} />
      </div>
    </div>
  );
};

export default MainContent;
