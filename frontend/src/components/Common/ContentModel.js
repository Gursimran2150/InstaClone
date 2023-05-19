import React from "react";
import "../Common/PlayingContent/Content.css";

const ContentModel = ({ modalIsOpen }) => {
  const customStyles = {
    content: {
      top: "40%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <div className="model">
      <div className=""></div>
    </div>
  );
};

export default ContentModel;
