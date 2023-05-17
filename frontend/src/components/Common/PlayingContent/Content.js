import React, { useState, useEffect } from "react";
import "./Content.css";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../../apiRequests/postApi";

import Post from "./Post";
import PostModal from "./PostModal";
import { fetchAllPosts } from "../../../slices/postsSlice";
import { fetchComments } from "../../../slices/commentSlice";

const Content = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.allPosts.data.data);

  //const [posts, setPosts] = useState([]);
  const [authToken, setAuthToken] = useState("");

  //view comment modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectPost, setSelectPost] = useState(null);

  //get all posts
  // const getAllPosts = async () => {
  //   await getPosts()
  //     .then((response) => setPosts(response.data.data))
  //     .catch((err) => console.log(err));
  // };

  //handle open post modal
  const handleOpenModal = (post) => {
    dispatch(fetchComments(post._id));
    setIsModalOpen(true);
    setSelectPost(post);
  };

  //handle close post modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setAuthToken(JSON.parse(localStorage.getItem("token")));
    //getAllPosts();
    dispatch(fetchAllPosts());
    //setPosts(postState);
  }, [dispatch]);

  //console.log(postState);
  return (
    <div className="postList">
      {posts &&
        posts.map((post, index) => {
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
