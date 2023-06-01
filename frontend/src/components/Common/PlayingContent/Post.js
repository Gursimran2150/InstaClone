import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";

import { commentOnPost } from "../../../apiRequests/commentApi";
import { postLike } from "../../../apiRequests/postApis/postLikeApi";
import { useDispatch } from "react-redux";

import "./post.css";
import ContentHeader from "../ContentHeader";
import { fetchComments } from "../../../slices/commentSlice";
import {
  decrementLike,
  incrementLike,
  initState,
} from "../../../slices/likeSlice";

function Post({ post, authToken, onPressItem, setData }) {
  const dispatch = useDispatch();

  const [isLiked, setIsLiked] = useState();
  const [likeBtn, setLikesBtn] = useState(
    "../images/inputIcons/blackHeart3.png"
  );
  const [tempLikeCount, setTempLikeCount] = useState(
    post?.likes?.users?.length || 0
  );
  const [tempCommentCount, setTempCommentCount] = useState(
    post?.comments?.length || 0
  );
  const [content, setContent] = useState(post?.content);

  const commentInputRef = useRef(null);

  // convert uri
  const convert = (url) => {
    console.log("converting uri to url");
    if (url && url.uri) {
      const encoded = encodeURI(url.uri);
      return encoded;
    }
    return url;
  };

  const convertedUrl = useMemo(
    () => convert(post?.media[0]?.url),
    [post?.media]
  );

  // addcomment
  const addComment = useCallback(
    async (data) => {
      console.log("Add comment data");
      await commentOnPost(data, authToken)
        .then((response) => {
          commentInputRef.current.value = "";
          setTempCommentCount(tempCommentCount + 1);
        })
        .catch((err) => console.log(err));
    },
    [authToken, tempCommentCount]
  );

  // handle comment input
  function handleAddComment(id) {
    const commentData = { postId: id, text: commentInputRef.current.value };
    if (commentData.text === "") alert(`Can't be empty`);
    else addComment(commentData);
  }

  //like dislike post
  const clickLike = useCallback(
    async (id) => {
      const { data } = await postLike({ postId: id, token: authToken });
      if (data?.message === "post was disLiked") {
        setTempLikeCount(tempLikeCount - 1);
        setLikesBtn("../images/inputIcons/blackHeart3.png");
        dispatch(decrementLike());
      } else {
        setTempLikeCount(tempLikeCount + 1);
        setLikesBtn("../images/inputIcons/redHeart.png");
        dispatch(incrementLike());
      }
    },
    [authToken, dispatch, tempLikeCount]
  );

  //this hook will fectch the user credentails from the local storage and checks wheather the user has already liked the post or not is alredy liked change liked to true else false
  useEffect(() => {
    const currentuser = JSON.parse(localStorage.getItem("userCedentials"));
    setIsLiked(post?.likes?.users?.includes(currentuser?._id));
  }, [post, dispatch]);

  //if the is liked is true then it will set the button as red heart else black heart
  useEffect(() => {
    setLikesBtn(
      isLiked
        ? "../images/inputIcons/redHeart.png"
        : "../images/inputIcons/blackHeart3.png"
    );
  }, [isLiked]);

  function openPostModel({ post, tempLikeCount, clickLike }) {
    const data = {
      likeCount: tempLikeCount,
      setLikeCount: setTempLikeCount,
      isLiked: isLiked,
      clickLike: clickLike,
      likeBtn,
      setLikesBtn,
      createdAt: post.createdAt,
      addComment,
      setTempCommentCount,
      tempCommentCount,
    };
    setData(data);
    const payload = {
      likeCount: tempLikeCount || 0,
      likeBtn: likeBtn,
    };
    dispatch(initState(payload));

    onPressItem({ post, tempLikeCount, clickLike });
  }

  console.log(`Render post of ${post?.userName}`);
  return (
    <div className="parentWrapper">
      {/* <div className="profileInfoContainer">
        <div className="profileInfoContainerLeftPart">
          <div className="profileInfoContainerLeftPartImage">
            <img
              src="https://th.bing.com/th/id/OIP.GlXqxcR9EmviN5kuwaUsMQHaIB?pid=ImgDet&rs=1"
              alt="profile"
            />
          </div>
          <div className="profileInfoContainerLeftPartUserDetails">
            <div className="profileUsername">{post?.userName}</div>
            <div className="postTitle">{getTimeAgo(post?.createdAt)}</div>
          </div>
          <div className="postTime"></div>
        </div>
        <div className="profileInfoContainerRightPart">
          <button className="moreOptionButton">...</button>
        </div>
      </div> */}
      <ContentHeader data={post} setContent={setContent} />
      <div className="imageContainer">
        <img src={convertedUrl} alt="img" />
      </div>
      <div className="likesCommentShareContainer">
        <div className="firstThreeIcons">
          <button className="iconBtn" onClick={() => clickLike(post?._id)}>
            <img src={likeBtn} alt="like" />
          </button>
          <button
            className="iconBtn"
            onClick={() => openPostModel({ post, tempLikeCount, clickLike })}
          >
            <img
              src="../images/inputIcons/blackIconMessage.png"
              alt="comment"
            />
          </button>
          <button className="iconBtn">
            <img src="../images/inputIcons/shareBlackIcon3.png" alt="share" />
          </button>
        </div>
        <div className="saveIcon">
          {" "}
          <button className="iconBtn">
            <img
              className="saveIcon"
              src="../images/inputIcons/saveBlackIcon3.png"
              alt="save"
            />
          </button>
        </div>
      </div>
      <div className="showLikesContainer">
        {tempLikeCount === 0
          ? "Be the First to like"
          : `${tempLikeCount} likes`}
      </div>
      <div className="postDescriptionContainer">
        <span style={{ fontWeight: "bold" }}>{post?.userName}</span>
        {` ${content}`}
      </div>
      <div
        className="viewAllCommentsContainer"
        onClick={() => openPostModel({ post, tempLikeCount, clickLike })}
      >
        View All {tempCommentCount} Comments
      </div>
      <div className="addCommentContainer">
        <div className="addCommentInput">
          <input
            type="text"
            placeholder="Add a comment..."
            ref={commentInputRef}
          />
        </div>
        <div className="postbtn">
          <button onClick={() => handleAddComment(post?._id)}>Post</button>
        </div>
      </div>
    </div>
  );

  // return (
  //   <div className="playingContent">
  //     <ContentHeader data={data} />

  //     {/* post */}
  //     <div className="content">
  //       <ImgTag src={convertedUrl} alt={"images"} />
  //     </div>

  //     {/* post icons  */}
  //     <div className="filedIcons">
  //       <div className="LikeShare">
  //         <Button
  //           text={<ImgTag src={likeBtn} width={23} height={20} />}
  //           onclick={() => clickLike(post?._id)}
  //         />

  //         <Button
  //           text={
  //             <ImgTag
  //               src={"../images/inputIcons/blackIconMessage.png"}
  //               width={20}
  //               height={20}
  //             />
  //           }
  //         />

  //         <Button
  //           text={
  //             <ImgTag
  //               src={"../images/inputIcons/shareBlackIcon3.png"}
  //               width={22}
  //               height={20}
  //             />
  //           }
  //         />
  //       </div>
  //       <div className="saveContent">
  //         <ImgTag
  //           src={"../images/inputIcons/saveBlackIcon3.png"}
  //           width={17}
  //           height={20}
  //         />
  //       </div>
  //     </div>

  //     {/* post description */}
  //     <div className="contentDescription">
  //       <div className="likesOnPost">
  //         <span>{post?.likes?.users?.length} likes</span>
  //       </div>
  //       <div className="postDescription">
  //         <span>{post?.userName} </span> {post.content}
  //       </div>
  //       <div className="viewComments">
  //         {/* {post.comments?.map((comment, index) => {
  //           return (
  //             <div key={index} className="viewCommentList">
  //               <strong>{`${comment.user.userName}`}</strong>
  //               <span>&nbsp; {comment.text} </span>
  //             </div>
  //           );
  //         })} */}
  //         <div className="viewComments" onClick={() => onPressItem(post)}>
  //           <span>{`View all ${post?.comments?.length} comments`}</span>
  //         </div>

  //         <div className="addComments">
  //           <form className="addCommentForm">
  //             <input
  //               type="text"
  //               placeholder="Add a comment... "
  //               // onChange={handleCommetBtn}
  //               name="addComment"
  //               // value={comment}
  //             />
  //             {comment?.length > 0 ? (
  //               <Button
  //                 text={"Post"}
  //                 onclick={(e) => {
  //                   e.preventDefault();

  //                   handleAddComment(post._id);
  //                 }}
  //               />
  //             ) : (
  //               ""
  //             )}
  //             <ImgTag
  //               src={"../images/inputIcons/blackIconComment.png"}
  //               width={10}
  //             />
  //           </form>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
}
// const arePropsEqual = (prevProps, nextProps) => {
//   if (
//     prevProps.post === nextProps.post ||
//     prevProps.authToken === nextProps.authToken
//   ) {
//     return true; // Props are equal
//   }

//   return false;
// };
export default Post;
