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
  const fetchedFriendAvatar = useSelector(
    (state) => state.friends.friends.fetchedFriendAvatar
  );
  const fetchedAvatar = useSelector((state) => state.user.fetchedAvatar);
  const friends = useSelector((state) => state.friends.friends.data);

  useEffect(() => {
    if (
      token &&
      id &&
      (fetchedFriendAvatar || friends.length === 0 || type === "profilePost") &&
      fetchedAvatar
    ) {
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
  }, [token, fetchedFriendAvatar, fetchedAvatar]);

  return <section className="posts">{renderPosts(posts)}</section>;
}
export default Posts;
