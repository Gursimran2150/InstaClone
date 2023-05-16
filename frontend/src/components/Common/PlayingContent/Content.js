import React, { useState, useEffect } from "react";
import "./Content.css";

import { getPosts } from "../../../apiRequests/postApi";

import Post from "./Post";
import PostModal from "./PostModal";

const Content = () => {
  const [posts, setPosts] = useState([]);
  const [authToken, setAuthToken] = useState("");

  //view comment modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectPost, setSelectPost] = useState(null);

  //get all posts
  const getAllPosts = async () => {
    await getPosts()
      .then((response) => setPosts(response.data.data))
      .catch((err) => console.log(err));
  };

  //handle open post modal
  const handleOpenModal = (post) => {
    setIsModalOpen(true);
    setSelectPost(post);
  };

  //handle close post modal 
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setAuthToken(JSON.parse( localStorage.getItem("token")));
    getAllPosts();
  }, []);




  return (
    <div className="postList">
      {posts.map((post, index) => {
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
