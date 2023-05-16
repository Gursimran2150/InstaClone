import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./AddBirthDate.css";

import Footer from "../../components/Footer/Footer";
import AnchorTag from "../../components/AnchorTag";
import ImgTag from "../../components/ImgTag";
import Button from "../../components/Button";
import AppStoreIcons from "../../components/Common/AppStoreIcons/AppStoreIcons";
import LoginSignupOption from "../../components/Common/LoginSignupOption";
import DatePicker from "../../components/Common/DatePicker/DatePicker";
import { sendCodeAndAddBirthday } from "../../apiRequests/authApi";


const AddBirthDate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.signUpData?.user;
  const authToken = location.state?.signUpData?.token;

  localStorage.setItem("userCedentials", JSON.stringify(user));
  localStorage.setItem("token", JSON.stringify(authToken));

  //initial state for birthdate
  const initialBirthDate = {
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
    year: new Date().getFullYear(),
  };

  const [birthDate, setBirthDate] = useState(initialBirthDate);
  const [btnDisale, setBtnDisable] = useState(true);

  //state for set string date into object
  const [newDateFormat, setNewDateFormat] = useState(
    new Date(`${birthDate.year},${birthDate.month},${birthDate.day}`)
  );

  useEffect(() => {
    if (birthDate.year < new Date().getFullYear() - 7) {
      setBtnDisable(false);
    } else {
      setBtnDisable(true);
    }
    setNewDateFormat(
      new Date(`${birthDate.year},${birthDate.month},${birthDate.day}`)
    );
  }, [birthDate]);

  //handleBackButton
  const handleBackClick = () => {
    navigate("/accounts/emailsignup");
  };

  //api request to add birth
  const addBirthDateCall = async () => {
    await sendCodeAndAddBirthday({
      dateOfBirth: newDateFormat,
      userName: user?.email,
    })
      .then((res) => {
        if (res.data.statusCode === 200) {
          localStorage.setItem("SignUpUser", JSON.stringify(res?.data));
          localStorage.setItem("userCedentials", JSON.stringify(res?.data));
          navigate("/accounts/emailsignup/codeveified");
        } else if (res.data.statusCode === 500) {
          alert("Server Error");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addBirthDateCall();
  };

  return (
    <div className="AddBirthDatePanel">
      <div className="birthDateContainer">
        <form className="selectDatePanel" onSubmit={handleSubmit}>
          <div className="formlayout">
            <div className="cakeIcon">
              <ImgTag src={"/images/birthDayCake.png"} width={140} />
              <h4 className="headingForBirth">Add Your Birthday</h4>

              <p className="publicProfile">
                This won't be a part of your public profile.
              </p>
            </div>

            <div className="dateSelection">
              <DatePicker setBirthDate={setBirthDate} birthDate={birthDate} />
              <p className="birthDateDescription ">
                <span className="wearing">
                  {" "}
                  You need to enter the date you were born
                </span>
                Use your own birthday, even if this account is for a business, a
                pet, or something else
              </p>
            </div>
            <div className="nextBackBtn">
              <Button
                className={"nextBtn"}
                text={"Next"}
                disabled={btnDisale}
              />

              <AnchorTag href="/accounts/emailsignup" text={"Go Back"} />
            </div>
          </div>
        </form>
        <LoginSignupOption
          label={"Have an account?"}
          linkText={"Log In"}
          linkUrl={"/accounts/login"}
        />

        <AppStoreIcons />
      </div>
      <Footer />
    </div>
  );
};

export default AddBirthDate;
