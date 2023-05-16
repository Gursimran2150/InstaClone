import React from "react";
import ImgTag from "../ImgTag";
import Button from "../Button";
import moment from "moment";
import "../Common/PlayingContent/Content.css";
const ContentHeader = ({ data }) => {
  // find the diff b/w post uploading date and current date
  const createDate = () => {
    let now = moment(new Date());
    let createdAt = moment(data.createdAt);
    let days = now.diff(createdAt, "days");
    if (days < 7) {
      if (days < 1) {
        if (moment(createdAt).format("mm") < "60") {
          return `${moment(createdAt).format("mm")}m`;
        } else {
          return `${moment(createdAt).format("hh")}h`;
        }
      } else {
        return `${days}d`;
      }
    } else {
      return `${Math.round(days / 7)}w`;
    }
  };

  // convert uri
  const convert = (url) => {
    if (url.uri) {
      const encoded = encodeURI(url.uri);
      return encoded;
    }
    return url;
  };

  return (
    <div className="contentHeader">
      <div className="userProfile">
        <div className="userProfileImg">
          <ImgTag
            src={
              data?.profileImage
                ? convert(data?.profileImage)
                : " ../images/inputIcons/profile.png"
            }
            width={35}
          />
        </div>
        <div className="userDetailOnPost">
          <div className="userDetailTopLine">
            <span className="userDetailOnPostUserName">{data?.userName}</span>
            <span className="userDetailOnUploadTme"> {createDate()} </span>
          </div>

          <span className="userDetailonPostTittle"> title </span>
        </div>
      </div>
      <div className="optionButton">
        <Button text={"..."} />
      </div>
    </div>
  );
};

export default ContentHeader;
