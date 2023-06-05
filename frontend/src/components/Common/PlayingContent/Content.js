import React, { useState, useEffect, useMemo } from "react";
import "./Content.css";
import { useDispatch, useSelector } from "react-redux";
import Post from "./Post";
import PostModal from "./PostModal";
import { fetchAllPosts } from "../../../slices/postsSlice";
import { fetchComments } from "../../../slices/commentSlice";

const Content = ({ handleChnageClick }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.allPosts.data.data);

  const authToken = useMemo(
    () => JSON.parse(localStorage.getItem("token")),
    []
  );
  const memoizedPosts = useMemo(() => posts, [posts]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectPost, setSelectPost] = useState(null);

  const [likesCount, setLikesCount] = useState(0);

  const [data, setData] = useState({});

  const handleOpenModal = useMemo(
    () =>
      ({ post, tempLikeCount, clickLike }) => {
        console.log("open model function");

        dispatch(fetchComments(post._id));
        setLikesCount(tempLikeCount);

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
  console.log("data-:", data);

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
              setData={setData}
              handleChnageClick={handleChnageClick}
            />
          );
        })}
      <PostModal
        post={selectPost}
        postList={posts}
        isOpen={isModalOpen}
        handleClose={handleCloseModal}
        likesCount={likesCount}
        data={data}
      />
    </div>
  );
};

export default Content;
