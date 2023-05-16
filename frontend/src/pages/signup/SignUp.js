import React, { useState } from "react";
import "./SignUp.css";
import ImgTag from "../../components/ImgTag";
import AnchorTag from "../../components/AnchorTag";
import InputField from "../../components/InputField";
import Button from "../../components/Button";

import Footer from "../../components/Footer/Footer";
import AppStoreIcons from "../../components/Common/AppStoreIcons/AppStoreIcons";
import LoginSignupOption from "../../components/Common/LoginSignupOption";
import HorizontalLine from "../../components/Common/HorizontalLine";
import { createRandomUserName, register } from "../../apiRequests/authApi";
import { useNavigate } from "react-router-dom";
import { LOGIN_WITH_FACEBOOK } from "../../config";

const SignUp = () => {
  const navigate = useNavigate();

  const [signUpData, setSignUpData] = useState({
    email: "",
    name: "",
    userName: "",
    password: "",
  });

  // button disable
  const [disable, setDisable] = useState(true);

  const [error, setError] = useState({
    email: "",
    name: "",
    userName: "",
    password: "",
  });
  const [signUpWearning, setSignUpWearning] = useState("");

  //random userName
  const [userNameList, setUserNameList] = useState([]);

  //password input
  const [showPassword, setShowPassword] = useState(false);

  //check email validation
  const checkEmail = function (v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  };

  //check phone validation
  const ph = (v) => {
    return /^\+?[1-9][0-9]{7,9}$/.test(v);
  };

  //check password
  const password = (v) => {
    return /^[a-zA-Z0-9!@#$%^&*]{6,15}$/.test(v);
  };

  //check userName
  const checkUerName = (v) => {
    return /^[A-Za-z][A-Za-z0-9]{6,14}$/.test(v);
  };

  // set error
  //check email and phone number
  const checkPhEmailValidation = (key) => {
    const inputValue = signUpData[key];
    const isture = checkEmail(inputValue) || ph(inputValue);
    if (inputValue.length > 0) {
      isture
        ? setError({ ...error, [key]: "success" })
        : setError({ ...error, [key]: "error" });
    }
    return null;
  };

  //check simple input
  const checkValidation = (key) => {
    const inputValue = signUpData[key];

    if (inputValue.length >= 0) {
      setError({ ...error, [key]: "success" });
    } else {
      setError({ ...error, [key]: "error" });
    }
  };

  //check userName
  const checkUserNamevalidation = (key) => {
    let inputValue = signUpData[key];
    const isture = checkUerName(inputValue);
    if (inputValue.length > 0) {
      signUpData?.name !== inputValue && isture
        ? setError({ ...error, [key]: "success" })
        : setError({ ...error, [key]: "error" });
    }
    return null;
  };

  //check password
  const checkPasswordValidation = (key) => {
    const inputValue = signUpData[key];
    const isture = password(inputValue);
    if (inputValue.length > 0) {
      isture
        ? setError({ ...error, [key]: "success" })
        : setError({ ...error, [key]: "error" });
    }
    return null;
  };

  const handleChange = (e) => {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
    signUpData.password.length >= 5 ? setDisable(false) : setDisable(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (error?.email === "error") {
      setSignUpWearning("Enter a valid email address.");
    } else if (error?.userName === "error") {
      setSignUpWearning("This username isn't available. Please try another.");
    } else if (error?.password === "error") {
      setSignUpWearning("Password is easy to guess.");
    } else {
      const respones = await register(signUpData);
      if (respones.data.statusCode === 200) {
        navigate("/accounts/emailsignup/addbirthdate", {
          state: {
            signUpData: {
              user: respones.data.user,
              token: respones.data.token,
            },
          },
        });
      } else if (respones.data.statusCode === 403) {
        setSignUpWearning(`${respones.data.message}`);
      } else {
        setSignUpWearning(`${respones.data.message}`);
      }
    }
  };

  // Refresh username
  const refreshUserName = async () => {
    const preUserName = signUpData.name;
    if (userNameList.length > 0) {
      const first = userNameList[0];
      setSignUpData({
        ...signUpData,
        userName: first,
      });
      setUserNameList(userNameList.slice(1));
    } else {
      let response = await createRandomUserName(preUserName);
      const list = response?.data?.data;
      const first = list[0];
      setSignUpData({
        ...signUpData,
        userName: first,
      });
      setUserNameList(list.slice(1));
    }
  };

  const loginWithFbHandle = () => {
    navigate(LOGIN_WITH_FACEBOOK);
  };

  return (
    <div className="panel">
      <div className="signUpContainer">
        <div className="signUpPanel">
          <div className="icon">
            <ImgTag src={"/images/binstalogo.png"} width={200} />
          </div>
          <form className="signUpForm" onSubmit={handleSubmit}>
            <h2 className="signUpHeading">
              Sign up to see photos and videos from your friends.
            </h2>
            <Button
              className={"facebookLoginBtn"}
              text={
                <AnchorTag
                  fontIcon={
                    <ImgTag
                      src={"/images/whitefacebookIcon.png"}
                      width={"15.5px"}
                    />
                  }
                  className={"facebookLoginBtnLink"}
                  href={LOGIN_WITH_FACEBOOK}
                  text={` Log in with Facebook `}
                />
              }
            />

            <HorizontalLine />

            <InputField
              type={"text"}
              placeholder={"Mobile number or email"}
              onchange={handleChange}
              name={"email"}
              value={signUpData.email}
              showBtn
              innerInputContent={
                <RenderInnerInputContent
                  forKey="email"
                  error={error}
                  showIcon={signUpData?.email.length > 0}
                />
              }
              handleBlur={checkPhEmailValidation}
            />
            <InputField
              type={"text"}
              placeholder={"Full Name"}
              onchange={handleChange}
              name={"name"}
              showBtn
              value={signUpData.name}
              innerInputContent={
                <RenderInnerInputContent
                  forKey="name"
                  error={error}
                  showIcon={signUpData?.name.length > 0}
                />
              }
              handleBlur={checkValidation}
            />
            <InputField
              type={"text"}
              placeholder={"Username"}
              onchange={handleChange}
              name={"userName"}
              showBtn
              value={signUpData?.userName}
              innerInputContent={
                <RenderInnerInputContent
                  forKey="userName"
                  error={error}
                  refresh={signUpData.name.length > 0}
                  showIcon={signUpData?.userName.length > 0}
                  handleClick={refreshUserName}
                />
              }
              handleBlur={() => checkUserNamevalidation("userName")}
            />
            <InputField
              type={showPassword ? "text" : "password"}
              placeholder={"Password"}
              onchange={handleChange}
              name={"password"}
              showBtn={signUpData.password.length > 0}
              value={signUpData.password}
              innerInputContent={
                <RenderInnerInputContent
                  forKey="password"
                  error={error}
                  showPassword={showPassword}
                  handleClick={(e) => {
                    e.preventDefault();
                    setShowPassword(!showPassword);
                  }}
                />
              }
              handleBlur={checkPasswordValidation}
            />

            <div className="signUpDescription">
              <p>
                People who use our service may have uploaded your contact
                information to Instagram.{" "}
                <AnchorTag
                  href={
                    "https://www.facebook.com/help/instagram/261704639352628"
                  }
                  text={" Learn More"}
                />
              </p>
              <p>
                By signing up, you agree to our
                <AnchorTag
                  href={
                    "https://help.instagram.com/581066165581870/?locale=en_US"
                  }
                  text={"Terms "}
                />{" "}
                ,
                <AnchorTag
                  href={"https://www.facebook.com/privacy/policy"}
                  text={"Privacy Policy"}
                />
                and
                <AnchorTag
                  href={"https://help.instagram.com/1896641480634370/"}
                  text={"Cookies Policy."}
                />
              </p>
            </div>

            <Button
              className={"sginUpBtn"}
              text={"Sign up"}
              disabled={disable}
            />
            {signUpWearning.length > 0 ? (
              <span className="signUpWearning">{signUpWearning}</span>
            ) : (
              ""
            )}
          </form>
        </div>
        <LoginSignupOption
          label={"Have an account?"}
          linkText="Log in"
          linkUrl="/accounts/login"
        />
        <AppStoreIcons />
      </div>

      <Footer />
    </div>
  );
};

export default SignUp;

function RenderInnerInputContent({
  forKey,
  error,
  handleClick,
  showPassword,
  refresh,
  showIcon,
  showBtn,
}) {
  if (forKey === "email" && showIcon) {
    return (
      <ImgTag
        src={
          error[forKey] === "success"
            ? "/images/inputTrue.png"
            : "/images/x-mark-1.png"
        }
        alt="icon"
        width={20}
      />
    );
  }

  if (forKey === "userName") {
    return (
      <>
        {showIcon && (
          <ImgTag
            src={
              error[forKey] === "success"
                ? "/images/inputTrue.png"
                : "/images/x-mark-1.png"
            }
            alt="icon"
            width={20}
          />
        )}
        {refresh && (
          <ImgTag
            src={"/images/refreshing-1.png"}
            alt="icon"
            width={20}
            handleClick={handleClick}
          />
        )}
      </>
    );
  }

  if (forKey === "password") {
    return (
      <>
        <ImgTag
          src={
            error[forKey] === "success"
              ? "/images/inputTrue.png"
              : "/images/x-mark-1.png"
          }
          alt="icon"
          width={20}
        />
        <Button
          text={showPassword ? "Hide" : "Show"}
          onclick={handleClick}
          className={"hideShowPassword"}
        />
      </>
    );
  }

  if (error[forKey] === "success" && showIcon) {
    return <ImgTag src={"/images/inputTrue.png"} alt="icon" width={20} />;
  }

  if (error[forKey] === "error" || showBtn) {
    return <ImgTag src={"/images/x-mark-1.png"} alt="icon" width={20} />;
  }

  return null;
}
