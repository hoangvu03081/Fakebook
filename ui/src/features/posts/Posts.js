import React from "react";
import Post from "./Post";

function Posts({ posts }) {
  return (
    <>
      {posts.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </>
  );
}
export default Posts;
