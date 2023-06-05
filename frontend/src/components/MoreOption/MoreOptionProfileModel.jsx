import React from "react";
import "./moreoptionprofilemodel.css";
import { useNavigate } from "react-router-dom";

const MoreOptionProfileModel = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();

  const getAllStorage = () => {
    let data = [];
    for (var i = 0; i < localStorage.length; i++) {
      data[i] = localStorage.getItem(localStorage.key(i));
    }
    return data;
  };

  function handleLogout() {
    if (getAllStorage().length > 0) {
      localStorage.clear();
      navigate("/");
    }
  }

  if (isOpen) {
    return (
      <div className="MoreOptionMainContainer" onClick={() => setIsOpen(false)}>
        <div className="optionsContainer">
          <div className="option">
            <img
              src={"../images/inputIcons/settings.png"}
              alt="icon"
              height={"20px"}
              width={"20px"}
            />
            <span>Settings</span>
          </div>
          <div className="option">
            <img
              src="../images/inputIcons/youractivity.png"
              alt="icon"
              height={"20px"}
              width={"20px"}
            />
            <span>Your activity</span>
          </div>
          <div className="option">
            <img
              src="../images/inputIcons/save-instagram.png"
              alt="icon"
              width={"20px"}
              height={"14px"}
            />
            <span>Saved</span>
          </div>
          <div className="option">
            <img
              src="../images/inputIcons/sun.png"
              alt="icon"
              height={"20px"}
              width={"20px"}
            />
            <span>Swtich apprerence</span>
          </div>
          <div className="option">
            <img
              src="../images/inputIcons/reportproblem.png"
              alt="icon"
              height={"18px"}
              width={"18px"}
            />
            <span>Report a problem</span>
          </div>
        </div>
        {isOpen && <div className="line"></div>}
        <div className="secondOptionContainer ">
          <div className="option border-bottom">
            <span>Swtich accounts</span>
          </div>
          <div className="option" onClick={handleLogout}>
            <span>Logout</span>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default MoreOptionProfileModel;
