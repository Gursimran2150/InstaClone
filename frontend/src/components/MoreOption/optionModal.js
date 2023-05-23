import React, { useState } from "react";
import "./optionModal.css";
import { useDispatch } from "react-redux";
import { deletePostById } from "../../slices/postsSlice";
import EditPost from "../EditPost/EditPost";

const OptionModal = ({
  isOpen,
  handleClose,
  sameUser,
  postId,
  userId,
  post,
  setContent,
}) => {
  const dispatch = useDispatch();
  const [isEditOpen, setIsEditOpen] = useState(false);

  function openEditPost() {
    setIsEditOpen(true);
  }

  //deleting the post
  const deletePost = (id) => {
    dispatch(deletePostById({ id, userId: userId }));
    console.log("post deleted");
    handleClose();
  };
  if (isOpen) {
    return (
      <>
        <div className="optionModelWrapper">
          <div className="options">
            {sameUser() ? (
              <div>
                <button
                  className="deleteBtn"
                  onClick={() => deletePost(postId)}
                >
                  Delete
                </button>
                <button onClick={openEditPost}>Edit</button>
                <button>Hide Like Count</button>
                <button>Turn off Commenting</button>
                <button>Go to Post</button>
                <button>Share to...</button>
                <button>Copy Link</button>
                <button>Embed</button>
                <button onClick={handleClose}>Cancel</button>
              </div>
            ) : (
              <div>
                <button className="deleteBtn">Report</button>
                <button>Not Intersted</button>
                <button>Go to Post</button>
                <button>Share to...</button>
                <button>Copy link</button>
                <button>Embed</button>
                <button>About this account</button>

                <button onClick={handleClose}>Cancel</button>
              </div>
            )}
          </div>
        </div>
        <EditPost
          isOpen={isEditOpen}
          setIsOpen={setIsEditOpen}
          post={post}
          handleClose={handleClose}
          setContent={setContent}
        />
      </>
    );
  } else {
    return null;
  }
};

export default OptionModal;
