import React, { useEffect, useState } from "react";
import "./showstory.css";
import { Link, useNavigate } from "react-router-dom";

const ShowStory = () => {
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const [isSoundOn, setSound] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    let interval = null;

    if (!paused) {
      interval = setInterval(() => {
        setProgress((prev) => prev + 0.05);
        if (progress >= 99) {
          //alert("Story completed");
          navigate("/homePage");
        }
      }, 1);
    }

    return () => {
      clearInterval(interval);
      //setProgress(0);
    };
  }, [progress, paused, navigate]);

  return (
    <div className="showStoryContainer">
      <div className="instagramLogoStory">
        <img src="../images/instagramLogo.png" alt="icon" />
      </div>
      <div className="showStoryBox">
        <div className="showStory">
          <div className="storyContent">
            <div className="storyHeader">
              <div className="progressBar">
                <progress value={progress} max={100}></progress>
              </div>
              <div className="storyUserInfo">
                <div className="firstBox">
                  <img
                    src="../images/inputIcons/profile.png"
                    alt=""
                    width={"30px"}
                  />
                  <div className="userNameStory">demo2150</div>
                  <div className="timeStamp">21h</div>
                </div>
                <div className="secondBox">
                  <img
                    src={
                      paused
                        ? "../images/inputIcons/play-button-arrowhead.png"
                        : "../images/inputIcons/pause.png"
                    }
                    alt="icon"
                    onClick={() => setPaused(!paused)}
                  />
                  <img
                    src={
                      isSoundOn
                        ? "../images/inputIcons/volume.png"
                        : "../images/inputIcons/mute.png"
                    }
                    alt="icon"
                    onClick={() => setSound(!isSoundOn)}
                  />
                  <img src="../images/inputIcons/ellipsis.png" alt="icon" />
                </div>
              </div>
            </div>
            <div className="storyMedia">
              <img
                src="https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
                alt="media"
              />
            </div>
            <div className="storyFooter">
              <input type="text" placeholder="Reply to demo2150..." />
              <img src="../images/inputIcons/blackHeart.png" alt="heart" />
              <img src="../images/inputIcons/shareBlackIcon2.png" alt="heart" />
            </div>
          </div>
        </div>
      </div>

      <div className="showCancelButton">
        <Link to={"/homePage"}>
          <img src="../images/inputIcons/cancelicon.png" alt="cancel" />{" "}
        </Link>
      </div>
    </div>
  );
};

export default ShowStory;
