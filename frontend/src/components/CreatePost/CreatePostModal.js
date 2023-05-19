import React, { useRef, useState } from "react";
import "./CreatePostModal.css";
import { uploadFile } from "../../apiRequests/postApi";
import UploadPost from "./UploadPost";
import SelectPost from "./SelectPost";

const CreatePostModal = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isGenraterLink, setGenraterLink] = useState("");

  //
  const fileInput = useRef(null);

  const handleClick = () => {
    fileInput.current.click();
  };

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    const formData = new FormData();
    formData.append("file", selectedFile);

    if (formData) {
      await uploadFile(formData)
        .then((response) => {
          response.data.statusCode === 200
            ? setGenraterLink(response.data.url)
            : setGenraterLink("");
        })
        .catch((err) => console.log(err));
    }
    return null;
  };

  return (
    <div className="createPostPage">
      {isGenraterLink.length > 0 ? (
        <UploadPost link={isGenraterLink} />
      ) : (
        <SelectPost
          handleClick={handleClick}
          fileInput={fileInput}
          handleFileSelect={handleFileSelect}
        />
      )}
    </div>
  );
};

export default CreatePostModal;
