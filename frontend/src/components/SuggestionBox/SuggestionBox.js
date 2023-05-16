import React, { useEffect, useState } from "react";
import "./SuggestionBox.css";
import ImgTag from "../ImgTag";
import Button from "../Button";
import SuggestionBoxFooter from "./SuggestionBoxFooter";
import { getAllUsers } from "../../apiRequests/userApi";
import { follow } from "../../apiRequests/followApi";
import { async } from "react-input-emoji";

const SuggestionBox = ({ user }) => {
  const [listOfUser, setListOfUser] = useState([]);
  const [currentUser,setCurrentUser]=useState("")
  const [authToekn,setAuthToken]=useState("")



  const getUsers = async (token) => {
    await getAllUsers(token)
      .then((response) => {
        setListOfUser(response.data.users);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const token =JSON.parse( localStorage.getItem("token"))
    setAuthToken(token)
    getUsers(token);
  
    const user =JSON.parse(localStorage.getItem("userCedentials"));
    if(user){
      setCurrentUser(user);
    }else{
      const user= JSON.parse(localStorage.getItem("signUser"))
      setCurrentUser(user)
    }

  }, []);

 // convert uri
 const convert = (url) => {
  if (url.uri) {
    const encoded = encodeURI(url.uri);
    return encoded;
  }
  return url;
};


//follow api 
async function followBtn(id){
  await follow({id:id,token:authToekn}).then((respones)=>{console.log("res-->",respones.data.message); }).catch((err)=>{console.log(err);})
}

  return (
    <div className="suggestionContainer">
      <div className="userDetails">
        <div className="userProfile">
          <div>
            <ImgTag
              src={
                currentUser?.profileImage?.uri
                  ? convert(user?.profileImage?.uri)
                  : " ../images/inputIcons/profile.png"
              }
              width={60}
            />  
          </div>
          <div className="suggestedListUserCont">
        
          <span className="suggestedListUserName">{currentUser?.userName} </span>
                  <span className="suggestedListName"> {currentUser?.firstName} {user?.lastName} </span>
          </div>
        </div>

        <div className="switchButton">
          <Button text={"Switch"} />
        </div>
      </div>

      <div className="suggestionHeading">
        <span>Suggestion for you</span>
        <Button text={"See All"} />
        {/* <span className="">See All</span> */}
      </div>

      <div className="suggestedUser">
        {
          
          listOfUser.filter((item)=>{
          return (
            item._id!==currentUser._id
          )
        } ).map((user, ind) => {
          return (
            <div className="suggestedUserProfile" key={ind}>
              <div className="userProfile">
                <div className="suggestedUserProfileImg">
                  <ImgTag
                    src={
                      user?.profileImage?.thumbnail?.uri
                        ? convert(user?.profileImage?.thumbnail?.uri)
                        : " ../images/inputIcons/profile.png"
                    }
                  />
                </div>
                <div className="suggestedListUserCont">
                  <span className="suggestedListUserName">{user?.userName} </span>
                  <span className="suggestedListName"> {user?.firstName}</span>
                </div>
              </div>

              <div className="switchButton">
                <Button text={"Follow"} onclick={()=>followBtn(user._id)} />
              </div>
            </div>
          );
        })}
      </div>

      <div>
        <SuggestionBoxFooter />
      </div>
    </div>
  );
};

export default SuggestionBox;
