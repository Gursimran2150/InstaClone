import { makeStyles } from "@mui/styles";
import { Modal } from "react-bootstrap";
import "./Content.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ImgTag from "../../ImgTag";
import ContentHeader from "../ContentHeader";
import CommentHeader from "../CommentHeader";
import { useSelector } from "react-redux";

function PostModal({ post, isOpen, handleClose, postList, isClose }) {
  const classes = useStyles();

  //fetching all the comments on a particular post using its id and removing the last element from it as api is returing in the form of object
  const comments = useSelector((state) => state.comments.data);
  const commentsArray = Object.values(comments).slice(0, -1);

  // convert uri
  const convert = (url) => {
    if (url.uri) {
      const encoded = encodeURI(url.uri);
      return encoded;
    }
    return url;
  };

  if (post) {
    return (
      <div>
        <Modal show={isOpen} className={classes.contentBox}>
          <div>
            <button className={classes.cancelBtn} onClick={handleClose}>
              <ImgTag
                src={"../images/inputIcons/cancelicon.png"}
                width={20}
                height={20}
              />
            </button>
          </div>

          <div className={classes.containerBox}>
            <div className={classes.innerBox1}>
              <ImgTag
                src={convert(post?.media[0]?.url)}
                className={classes.innerBox1Img}
                width={550}
              />
            </div>
            <div className={classes.innerBox2}>
              <ContentHeader data={post} />

              <div className={classes.commentListBox}>
                <div
                  className="postDescription"
                  style={{ display: "flex", gap: "10px" }}
                >
                  <div className="userProfileImg">
                    <ImgTag
                      src={
                        post?.profileImage
                          ? convert(post?.profileImage)
                          : " ../images/inputIcons/profile.png"
                      }
                      width={35}
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
  contentBox: {
    marginTop: "30px",
    padding: 0,
  },

  containerBox: {
    padding: 0,
    display: "flex",
    width: "100%",
    height: "80vh",
  },

  cancelBtn: {
    backgroundColor: "transparent",
    objectFit: "cover",
    position: "absolute",
    right: "-300px",
  },
  innerBox1: {
    backgroundColor: "#737373",
    width: "auto",
    padding: 0,
    margin: 0,
    display: "flex",
  },

  innerBox2: { width: "47%", height: "100%", padding: "10px" },

  innerBox1Img: {
    maxWidth: "100%",
  },
  commentListBox: {
    borderTop: "1px solid lightGray",
    padding: "10px",
  },
}));
