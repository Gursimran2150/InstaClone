import React, { useState, useEffect, useMemo } from "react";
import "./Content.css";
import { useDispatch, useSelector } from "react-redux";
import Post from "./Post";
import PostModal from "./PostModal";
import { fetchAllPosts } from "../../../slices/postsSlice";
import { fetchComments } from "../../../slices/commentSlice";

const Content = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.allPosts.data.data);

  const authToken = useMemo(
    () => JSON.parse(localStorage.getItem("token")),
    []
  );
  const memoizedPosts = useMemo(() => posts, [posts]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectPost, setSelectPost] = useState(null);

  const handleOpenModal = useMemo(
    () => (post) => {
      console.log("open model function");
      dispatch(fetchComments(post._id));
      setIsModalOpen(true);
      setSelectPost(post);
    },
    [dispatch]
  );

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    console.log("render home");
    dispatch(fetchAllPosts());
  }, [dispatch]);

  console.log("Parent rendering");

  return (
    <div className="postList">
      {memoizedPosts &&
        memoizedPosts.map((post, index) => {
          return (
            <Post
              post={post}
              key={index}
              onPressItem={handleOpenModal}
              authToken={authToken}
            />
          );
        })}
      <PostModal
        post={selectPost}
        postList={posts}
        isOpen={isModalOpen}
        handleClose={handleCloseModal}
      />
    </div>
  );
};

export default Content;
