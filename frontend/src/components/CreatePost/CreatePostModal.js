import React, { useRef, useState } from "react";
import "./CreatePostModal.css";
import { uploadFile } from "../../apiRequests/postApi";
import UploadPost from "./UploadPost";
import SelectPost from "./SelectPost";
import { HOST } from "../../config";

const CreatePostModal = ({ isOpen, handleChnageClick }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isGenraterLink, setGenraterLink] = useState("");
  // const [isOpen, setIsOpen] = useState(false)

  //

  const fileInput = useRef(null);

  const handleClick = () => {
    fileInput.current.click();
  };

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    const formData = new FormData();
    formData.append("file", file);

    if (formData) {
      await uploadFile(formData)
        .then((response) => {
          response.data.statusCode === 200
            ? setGenraterLink(response.data.url.replace("localhost", HOST))
            : setGenraterLink("");
        })
        .catch((err) => console.log(err));
    }
  };

  console.log("Image Link-:", isGenraterLink);
  if (isOpen) {
    return (
      <div className="createPostPage">
        {isGenraterLink.length > 0 ? (
          <UploadPost
            link={isGenraterLink}
            handleChnageClick={handleChnageClick}
          />
        ) : (
          <SelectPost
            handleClick={handleClick}
            fileInput={fileInput}
            handleFileSelect={handleFileSelect}
          />
        )}
      </div>
    );
  } else {
    return null;
  }
};

export default CreatePostModal;
