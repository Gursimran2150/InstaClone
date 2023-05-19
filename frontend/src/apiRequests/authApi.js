import axios from "axios";
import { BACKEND_URL } from "../config";

const API = axios.create({ baseURL: BACKEND_URL });

//login api request
export const logIn = (data) => {
  return API.post("/accounts/login", {
    userName: data.userName,
    password: data.password,
  });
};

//register
export const register = (data) => {
  return API.post("/accounts/register", {
    email: data.email,
    userName: data.userName,
    name: data.name,
    password: data.password,
  });
};

//send verification code
export const sendCodeAndAddBirthday = (data, navigate) => {
  return API.post(`accounts/signUp/${data.id}`, {
    dateOfBirth: data.dateOfBirth,
    userName: data.userName,
  });
};

//CONFIRM  verification
export const confirVerificaionCode = (data, navigate, setWearning) => {
  return API.put(`/accounts/verified/${data.id}`, { code: data.code });
};

// resend verificaion code
export const reSendVerificaionCode = (data, navigate, setResendCodeMsg) => {
  API.put(`/accounts/verified/resend/${data.id}`)
    .then((res) => {
      setResendCodeMsg(res?.data);
    })
    .catch((err) => console.log(err));
};

//create random userName
export const createRandomUserName = (data) => {
  return API.post("accounts/createUserName", { userName: data });
};

//check user is present in db
export const checkUserIs = (data) => {
  return API.get(`accounts/checkUser/${data}`);
};

//send forgot password link
export const sendForgotLink = (payload) => {
  return API.post(`accounts/challegeTrue/sendLink/${payload.userName}`);
};
