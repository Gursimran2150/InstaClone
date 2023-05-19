import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
import InputFeild from "../InputField";
import Button from "../Button";
import ImgTag from "../ImgTag";
import AnchorTag from "../AnchorTag";
import AppStoreIcons from "../Common/AppStoreIcons/AppStoreIcons";
import LoginSignupOption from "../Common/LoginSignupOption";
import HorizontalLine from "../Common/HorizontalLine";
import { logIn } from "../../apiRequests/authApi";
import { LOCAL_ORIGIN } from "../../config";

const LoginForm = () => {
  const navigate = useNavigate();
  const loginInitialState = {
    userName: "",
    password: "",
  };

  const [loginData, setLoginData] = useState(loginInitialState);
  const [warning, setWarning] = useState("");
  const [disable, setDisable] = useState(true);
  const [token, setToken] = useState("");

  //password input
  const [passwordType, setPasswordType] = useState("password");
  const [passwordText, setPasswordText] = useState("Show");

  // set login data
  const handleChange = (e) => {
    loginData.password.length >= 5 && loginData.userName.length > 0
      ? setDisable(false)
      : setDisable(true);
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  // login button submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const respones = await logIn(loginData);
    if (respones.data.statusCode == 200) {
      setToken(respones.data.token);
      localStorage.setItem("token", JSON.stringify(respones.data.token));

      localStorage.setItem(
        "userCedentials",
        JSON.stringify(respones.data.userData)
      );
      navigate("/homePage");
    } else if (
      respones.data.statusCode == 400 ||
      respones.data.statusCode == 404
    ) {
      setWarning(
        "Sorry, your password was incorrect. Please double-check your password."
      );
    } else {
      setWarning(respones.data.message);
    }
  };

  const toggleBtn = (e) => {
    e.preventDefault();
    if (passwordType === "password") {
      setPasswordType("text");
      setPasswordText("Hide");
      return;
    }
    setPasswordType("password");
    setPasswordText("Show");
  };

  useEffect(() => {
    localStorage.setItem("token", JSON.stringify(token));
  }, [token]);

  return (
    <div className="loginForm">
      <div className="loginContainer">
        <div className="icon">
          <ImgTag src={"/images/binstalogo.png"} width={200} />
        </div>

        <form className="form">
          <InputFeild
            requied
            type={"text"}
            placeholder={"Phone number, username or email"}
            onchange={handleChange}
            name={"userName"}
            value={loginData.userName}
          />

          <InputFeild
            required
            type={passwordType}
            placeholder={"Password"}
            onchange={handleChange}
            name={"password"}
            value={loginData.password}
            showBtn={loginData?.password?.length > 0}
            innerInputContent={
              <Button
                text={passwordText}
                className={"hideShowPassword"}
                onclick={toggleBtn}
              />
            }
          />

          <Button
            className={"loginBtn"}
            text={"Log In"}
            disabled={disable}
            onclick={handleSubmit}
          />

          <HorizontalLine />

          <div className="facebookLink">
            <ImgTag src={"./images/facebook.png"} width={"16px"}></ImgTag>

            <AnchorTag
              href={
                "https://www.facebook.com/login.php?skip_api_login=1&api_key=124024574287414&kid_directed_site=0&app_id=124024574287414&signed_next=1&next=https%3A%2F%2Fwww.facebook.com%2Fdialog%2Foauth%3Fclient_id%3D124024574287414%26redirect_uri%3Dhttps%253A%252F%252Fwww.instagram.com%252Faccounts%252Fsignup%252F%26state%3D%257B%2522fbLoginKey%2522%253A%25221fff0l112wgktc1ed6ohn1tc8viu89ne6k1uee8a31agyvjeydzv4x%2522%252C%2522fbLoginReturnURL%2522%253A%2522%252Ffxcal%252Fdisclosure%252F%253Fnext%253D%25252F%2522%257D%26scope%3Demail%26response_type%3Dcode%252Cgranted_scopes%26locale%3Den_US%26ret%3Dlogin%26fbapp_pres%3D0%26logger_id%3Dcc751796-6e0b-4b51-8733-f757265a28c1%26tp%3Dunspecified&cancel_url=https%3A%2F%2Fwww.instagram.com%2Faccounts%2Fsignup%2F%3Ferror%3Daccess_denied%26error_code%3D200%26error_description%3DPermissions%2Berror%26error_reason%3Duser_denied%26state%3D%257B%2522fbLoginKey%2522%253A%25221fff0l112wgktc1ed6ohn1tc8viu89ne6k1uee8a31agyvjeydzv4x%2522%252C%2522fbLoginReturnURL%2522%253A%2522%252Ffxcal%252Fdisclosure%252F%253Fnext%253D%25252F%2522%257D%23_%3D_&display=page&locale=en_GB&pl_dbl=0"
              }
              className={"facebookIcons"}
              text={` Log in with Facebook `}
            />
          </div>
          {warning.length > 0 ? (
            <span className="errorWearningShow">{warning}</span>
          ) : (
            ""
          )}

          <AnchorTag
            href={`${LOCAL_ORIGIN}/accounts/password/reset`}
            className={"forgotPass"}
            text={"Forgot password?"}
          />
        </form>
      </div>
      <LoginSignupOption
        label="Don't have an account?"
        linkText="Sign up"
        linkUrl="/accounts/emailsignup"
      />
      <AppStoreIcons />
    </div>
  );
};

export default LoginForm;
