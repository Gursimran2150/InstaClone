import { makeStyles } from "@mui/styles";
import { Modal } from "react-bootstrap";
import "./Content.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ImgTag from "../../ImgTag";
import ContentHeader from "../ContentHeader";
import CommentHeader from "../CommentHeader";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useState } from "react";
import { fetchComments } from "../../../slices/commentSlice";

function PostModal({
  post,
  isOpen,
  handleClose,
  postList,
  isClose,
  likesCount,
  likeFunction,
  data,
}) {
  const classes = useStyles();

  const dispatch = useDispatch();

  const payload = useSelector((state) => state.likes);
  //fetching all the comments on a particular post using its id and removing the last element from it as api is returing in the form of object
  const comments = useSelector((state) => state.comments.data);
  const commentsArray = Object.values(comments).slice(0, -1);

  const [comment, setComment] = useState("");

  //console.log("PostModalData-:", data);

  // console.log("likeUseStateCount:", likeCount);

  function addCommmentData(id) {
    setComment("");
    console.log("Comment Count-:", data.tempCommentCount);
    data?.setTempCommentCount(data.tempCommentCount + 1);
    data?.addComment({ postId: id, text: comment });
    dispatch(fetchComments(id));
  }

  // createDate
  const createDate = () => {
    let now = moment.utc();
    let createdAt = moment.utc(data?.createdAt || post?.createdAt);
    let days = now.diff(createdAt, "days");
    if (days < 7) {
      if (days < 1) {
        let minutes = moment.duration(now.diff(createdAt)).asMinutes();
        if (minutes < 60) {
          return `${Math.floor(minutes)}m`;
        } else {
          return `${Math.floor(
            moment.duration(now.diff(createdAt)).asHours()
          )}h`;
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
  const isButtonDisabled = comment.length <= 1;
  if (post) {
    return (
      <div>
        <Modal show={isOpen} className={"contentBox"}>
          <div>
            <button className={classes.cancelBtn} onClick={handleClose}>
              <ImgTag
                src={"../images/inputIcons/cancelicon.png"}
                width={20}
                height={20}
              />
            </button>
          </div>

          <div className={`containerBox `}>
            <div className={`innerBox1`}>
              <ImgTag
                src={convert(post?.media[0]?.url)}
                className={classes.innerBox1Img}
                width={550}
              />
            </div>
            <div className={"innerBox2"}>
              <ContentHeader data={post} />

              <div className={"commentListBox"}>
                <div
                  className="postDescription"
                  style={{ display: "flex", gap: "10px" }}
                >
                  <div className="userProfileImg">
                    <img
                      src={
                        post?.profileImage
                          ? convert(post?.profileImage)
                          : " ../images/inputIcons/profile.png"
                      }
                      width={"30px"}
                      height={"30px"}
                      alt="userimg"
                    />
                  </div>

                  <div className="userDetailOnPost">
                    <div className="userDetailTopLine">
                      <span className="userDetailOnPostUserName">
                        {post?.userName}
                      </span>
                      <span className="userDetailOnUploadTme">
                        {" "}
                        {post?.content}{" "}
                      </span>
                    </div>
                  </div>
                </div>

                {commentsArray.map((comment, index) => {
                  return (
                    <div key={index}>
                      <CommentHeader
                        data={{
                          _id: comment._id,
                          userName: comment.user.userName,
                          profileImage: post.profileImage,
                          createdAt: post.createdAt,
                          text: comment.text,
                          postId: post._id,
                          createdAtC: comment.createdAt,
                        }}
                        post={post}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="otherOptionsWrapper">
                <div className="likeShareCommentSection">
                  <div className="likesharecomment">
                    <div className="threeOptions">
                      <img
                        src={payload.likeBtn}
                        alt="likeIcon"
                        width={"24px"}
                        height={"24px"}
                        onClick={() => {
                          data.clickLike(post._id);
                        }}
                      />
                      <img
                        src="../images/inputIcons/blackIconComment.png"
                        alt="cIcon"
                        width={"24px"}
                        height={"24px"}
                      />
                      <img
                        src="../images/inputIcons/shareBlackIcon2.png"
                        alt="sIcon"
                        width={"24px"}
                        height={"24px"}
                      />
                    </div>
                  </div>
                  <div className="saveIconCont">
                    <img
                      src="../images/inputIcons/saveBlackicon2.png"
                      alt="saveIcon"
                      width={"21px"}
                      height={"21px"}
                    />
                  </div>
                </div>
                <div className="likesCount">{payload.likeCount} likes</div>
                <div className="timeBox">{createDate()}</div>
              </div>
              <div className="inputComment">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  onChange={(e) => setComment(e.target.value)}
                  value={comment}
                />
                <button
                  onClick={() => addCommmentData(post._id)}
                  disabled={isButtonDisabled}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }

  return null;
}

export default PostModal;

//styles for the layout

const useStyles = makeStyles(() => ({
  cancelBtn: {
    backgroundColor: "transparent",
    objectFit: "cover",
    position: "absolute",
    top: "-10px",
    right: "-30px",
  },
  innerBox1: {},

  innerBox2: {},

  innerBox1Img: {
    width: "100%",
    margin: "auto",
    // overflow: "hidden",
    objectFit: "contain",
  },
  commentListBox: {
    borderTop: "1px solid lightGray",
    padding: "10px",
    border: "2px solid red",
  },
}));
