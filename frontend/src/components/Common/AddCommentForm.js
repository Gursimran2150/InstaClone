import React, { useEffect } from "react";
import Button from "../Button";
import ImgTag from "../ImgTag";

//add comment form
const AddCommentForm = ({
  handleAddComment,
  handleCommetBtn,
  postCommentBtn,
  postId,
  currentIndex,
  index,
}) => {
  // useEffect(()=<)
  return (
    <div>
      <form className="addCommentForm">
        {/* <input
          type="text"
          placeholder="Add a comment... "
          onChange={handleCommetBtn}
          name="addComment"
          id={index}
        /> */}

        {postCommentBtn == currentIndex ? (
          <Button
            text={"Post"}
            onclick={(e) => {
              handleAddComment(postId);
            }}
          />
        ) : (
          ""
        )}
        <ImgTag src={"../images/inputIcons/blackIconComment.png"} width={10} />
      </form>
    </div>
  );
};

export default AddCommentForm;
