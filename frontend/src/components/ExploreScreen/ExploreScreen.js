import React from "react";
import "./ExploreScreen.css";
import ImgTag from "../ImgTag";
import { useSelector } from "react-redux";

const ExploreScreen = () => {
  const posts = useSelector((state) => state.allPosts.data.data);
  const [hoveredPostId, setHoveredPostId] = React.useState(null);

  //convert uri to url
  const convert = (url) => {
    if (url?.uri) {
      const encoded = encodeURI(url.uri);
      return encoded;
    }
    return url;
  };
  return (
    <div className="exploreContainer">
      <div className="exploreViewRow">
        {posts.map((post, ind) => {
          return (
            <>
              <div
                className="imageWrapper"
                onMouseOver={() => setHoveredPostId(post._id)}
                onMouseOut={() => setHoveredPostId(null)}
              >
                <img key={ind} src={convert(post?.media[0].url)} alt="media" />
                <div
                  className="galleryImgInsideDiv"
                  style={{
                    display: post._id === hoveredPostId ? "flex" : "none",
                  }}
                >
                  <div className="commentlikeWrapper">
                    <div
                      className="comments"
                      style={{ width: "24px", backgroundColor: "transparent" }}
                    >
                      <img
                        src="../images/inputIcons/heart.png"
                        alt="heart"
                        height={"24px"}
                        width={"24px"}
                      />
                      <span>{post?.likes?.users?.length}</span>
                    </div>
                    <div
                      className="likes"
                      style={{ width: "24px", backgroundColor: "transparent" }}
                    >
                      <img
                        src="../images/inputIcons/oval-black-speech-bubble.png"
                        alt="heart"
                        height={"24px"}
                        width={"24px"}
                      />
                      <span>{post?.comments?.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default ExploreScreen;
