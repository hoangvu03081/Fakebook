import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getISOStringNow } from "../../configs/normalizeFunc";
import Post from "./Post";
import { getPost, getProfilePost } from "./postsSlice";

export const renderPosts = (posts) => {
  return posts.map((post) => <Post post={post} key={post.id} />);
};

function Posts({ type, id }) {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const token = useSelector((state) => state.user.token);
  const fetchedFriends = useSelector((state) => state.friends.friends.fetched);
  useEffect(async () => {
    if (token && fetchedFriends) {
      const ISOString = getISOStringNow();
      switch (type) {
        case "post":
          dispatch(getPost(ISOString));
          break;
        case "profilePost":
          dispatch(getProfilePost(id));
          break;
      }
    }
  }, [type, token, fetchedFriends]);
  return <section className="posts">{renderPosts(posts)}</section>;
}
export default Posts;
