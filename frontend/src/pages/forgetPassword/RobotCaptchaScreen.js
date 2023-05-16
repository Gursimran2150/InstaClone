import React, { useState } from "react";
import "./ForgetPassword.css";

import AnchorTag from "../../components/AnchorTag";
import Footer from "../../components/Footer/Footer";
import ImgTag from "../../components/ImgTag";
import Button from "../../components/Button";
import InputField from "../../components/InputField";
import { useLocation, useNavigate } from "react-router-dom";
import RobotCaptcha from "../../components/ForgotScreen/RobotCaptcha";
import SendPasswordLink from "../../components/ForgotScreen/SendPasswordLink";
import { sendForgotLink } from "../../apiRequests/authApi";

const RobotCaptchaScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentUser = location.state?.user;

  const [isChecked, setIsChecked] = useState("");
  const [confirmRobot, setConfirmRobot] = useState(false);

  const handleChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const sendLinkForgotPassword = async () => {
    await sendForgotLink({ userName: currentUser })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClickNext = () => {
    if (isChecked && currentUser !== null) {
      sendLinkForgotPassword();

      setConfirmRobot(true);
    } else {
      setConfirmRobot(false);
    }
  };

  return (
    <div className="forgetPasswordPage">
      <div className="robotCapcthaNavBar">
        <div className="robotCapcthaNavBarCont">
          <div className="robotCapcthaNavBarLeft">
            <ImgTag src={"/images/instagramLogo.png"} width={102} />
          </div>
          <div className="robotCapcthaNavBarRight">
            <AnchorTag
              href={"/accounts/login"}
              text={"Log Into Another Account"}
            />
          </div>
        </div>
      </div>
      <div className="main">
        {confirmRobot ? (
          <SendPasswordLink  user={currentUser}/>
        ) : (
          <RobotCaptcha
            handleChange={handleChange}
            handleClick={handleClickNext}
           
          />
        )}
      </div>
    </div>
  );
};

export default RobotCaptchaScreen;
