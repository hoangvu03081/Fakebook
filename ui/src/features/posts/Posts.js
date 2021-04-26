import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Post from "./Post";
import { getPostUserInfo } from "./postsSlice";

function Posts({ posts }) {
  const dispatch = useDispatch();
  useEffect(() => {
    if (posts.length) posts.forEach((post) => dispatch(getPostUserInfo(post)));
  }, [posts.length]);

  return (
    <>
      {posts.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </>
  );
}
export default Posts;
