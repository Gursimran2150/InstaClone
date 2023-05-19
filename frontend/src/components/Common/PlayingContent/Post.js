import React, { useState, useEffect } from "react";
import ImgTag from "../../ImgTag";
import ContentHeader from "../ContentHeader";
import Button from "../../Button";
import { commentOnPost } from "../../../apiRequests/commentApi";
import { postLike } from "../../../apiRequests/postApis/postLikeApi";
import { useDispatch } from "react-redux";
import { fetchAllPosts } from "../../../slices/postsSlice";

export default function Post({ post, authToken, onPressItem }) {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");

  const [isLiked, setIsLiked] = useState();
  const [likeBtn, setLikesBtn] = useState(
    "../images/inputIcons/blackHeart3.png"
  );

  // convert uri
  const convert = (url) => {
    if (url.uri) {
      const encoded = encodeURI(url.uri);
      return encoded;
    }
    return url;
  };

  // handle Add comment
  const handleCommetBtn = (e, index) => {
    setComment(e.target.value);
  };

  // send comment data to server
  const addComment = async (data) => {
    await commentOnPost(data, authToken)
      .then((response) => {
        setComment("");
        dispatch(fetchAllPosts());
      })
      .catch((err) => console.log(err));
  };

  // handle post comment
  function handleAddComment(id) {
    const commentData = {
      postId: id,
      text: comment,
    };

    addComment(commentData);
  }

  //handle like click
  const clickLike = async (id) => {
    await postLike({ postId: id, token: authToken });
    dispatch(fetchAllPosts());
  };

  useEffect(() => {
    const currentuser = JSON.parse(localStorage.getItem("userCedentials"));
    setIsLiked(post?.likes?.users?.includes(currentuser._id));
    setLikesBtn(
      isLiked
        ? "../images/inputIcons/redHeart.png"
        : "../images/inputIcons/blackHeart3.png"
    );
  }, [dispatch, isLiked, post?.likes?.users]);

  return (
    <div className="playingContent">
      <ContentHeader
        data={{
          _id: post._id,
          userName: post.userName,
          profileImage: post.profileImage,
          createdAt: post.createdAt,
        }}
      />

      {/* post */}
      <div className="content">
        <ImgTag src={convert(post?.media[0]?.url)} alt={"images"} />
      </div>

      {/* post icons  */}
      <div className="filedIcons">
        <div className="LikeShare">
          <Button
            text={<ImgTag src={likeBtn} width={23} height={20} />}
            onclick={() => clickLike(post?._id)}
          />

          <Button
            text={
              <ImgTag
                src={"../images/inputIcons/blackIconMessage.png"}
                width={20}
                height={20}
              />
            }
          />

          <Button
            text={
              <ImgTag
                src={"../images/inputIcons/shareBlackIcon3.png"}
                width={22}
                height={20}
              />
            }
          />
        </div>
        <div className="saveContent">
          <ImgTag
            src={"../images/inputIcons/saveBlackIcon3.png"}
            width={17}
            height={20}
          />
        </div>
      </div>

      {/* post description */}
      <div className="contentDescription">
        <div className="likesOnPost">
          <span>{post?.likes?.users?.length} likes</span>
        </div>
        <div className="postDescription">
          <span>{post?.userName} </span> {post.content}
        </div>
        <div className="viewComments">
          {post.comment?.map((comment, index) => {
            return (
              <div key={index} className="viewCommentList">
                <strong>{`${comment.user.userName}`}</strong>
                <span>&nbsp; {comment.text} </span>
              </div>
            );
          })}
          <div className="viewComments" onClick={() => onPressItem(post)}>
            <span>{`View all ${post?.comments?.length} comments`}</span>
          </div>

          <div className="addComments">
            <form className="addCommentForm">
              <input
                type="text"
                placeholder="Add a comment... "
                onChange={(e) => handleCommetBtn(e)}
                name="addComment"
                value={comment}
              />
              {comment?.length > 0 ? (
                <Button
                  text={"Post"}
                  onclick={(e) => {
                    e.preventDefault();
                    handleAddComment(post._id);
                  }}
                />
              ) : (
                ""
              )}
              <ImgTag
                src={"../images/inputIcons/blackIconComment.png"}
                width={10}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
