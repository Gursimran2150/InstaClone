import "./App.css";
import "./components/Common/common.css";
import SignUp from "./pages/signup/SignUp";

import { Route, Routes } from "react-router-dom";
import AddBirthDate from "./pages/addBirth/AddBirthDate";
import CodeVerification from "./pages/codeVerification/CodeVerification";

import HomePage from "./pages/homePage/HomePage";
import Login from "./pages/login/Login";
import ForgetPassword from "./pages/forgetPassword/ForgetPassword";
import RobotCaptchaScreen from "./pages/forgetPassword/RobotCaptchaScreen";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route
          path="/accounts/emailsignup/codeveified"
          element={<CodeVerification />}
        />
        <Route
          path="/accounts/emailsignup/addbirthdate"
          element={<AddBirthDate />}
        />
        <Route path="/accounts/password/reset" element={<ForgetPassword />} />
        <Route path="/accounts/emailsignup" element={<SignUp />} />
        <Route path="/accounts/login" element={<Login />} />
        <Route path="/homePage" element={<HomePage />} />
        <Route path="/challenges" element={<RobotCaptchaScreen />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
