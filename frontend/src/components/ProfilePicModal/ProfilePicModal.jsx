import React, { useRef } from "react";
import "./profilepicmodal.css";
import axios from "axios";
import { BACKEND_URL } from "../../config";

const ProfilePicModal = ({ isOpen, setIsOpen, userId }) => {
  const profileRef = useRef();

  function handleUpload() {
    profileRef.current.click();
  }

  function onProfilePicSelected(event) {
    console.log("I am selecting the file -:");
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      console.log("Selected file:", selectedFile);
      getUrlFromServer(selectedFile)
        .then((res) => {
          console.log("Image Url-:", res.url);
          uploadProfilePic(res.url, userId)
            .then((res) => {
              console.log(res.message);
              setIsOpen(false);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }

  async function uploadProfilePic(url, userId) {
    try {
      const { data } = await axios.put(
        `${BACKEND_URL}/user/users/${userId}/profile-picture`,
        {
          profileUrl: url,
        }
      );
      return data;
    } catch (e) {
      console.log(e.message);
    }
  }

  async function getUrlFromServer(file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", userId);
    formData.append("profileImage", "profile");
    const { data } = await axios.post(`${BACKEND_URL}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  }
  function handleRemove() {
    uploadProfilePic("", userId);
    setIsOpen(false);
  }

  if (isOpen) {
    return (
      <div className="profilePicModalWrapper" onClick={() => setIsOpen(false)}>
        <div className="profileModal" onClick={(e) => e.stopPropagation()}>
          <input
            type="file"
            name="file"
            ref={profileRef}
            style={{ display: "none" }}
            onChange={onProfilePicSelected}
          />
          <div className="profileModalheading">Change Profile Photo</div>
          <div className="profileModaloption blue" onClick={handleUpload}>
            Upload Photo
          </div>
          <div className="profileModaloption red" onClick={handleRemove}>
            Remove Current Photo
          </div>
          <div
            className="profileModaloption noBg"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </div>
        </div>
      </div>
    );
  } else return null;
};

export default ProfilePicModal;
