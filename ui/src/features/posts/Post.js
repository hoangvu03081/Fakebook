import formatDistance from "date-fns/formatDistance";
import React, { useEffect } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { BiComment, BiLike } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { Card, CardFooter } from "reactstrap";
import { fetchPostImage } from "./postsSlice";

export default function Post({ post }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (post.imageId[0])
      dispatch(fetchPostImage({ postId: post.id, avatarId: post.imageId[0] }));
  }, [post.imageId]);

  const { userInfo } = post;
  if (!userInfo) return null;
  return (
    <Card key={post.id} className="my-3">
      <div className="py-2 px-3">
        <div className="d-flex align-items-center">
          {userInfo.avatarSrc ? (
            <img
              src={userInfo.avatarSrc}
              alt=""
              className="user-icon user-icon-lg"
            />
          ) : (
            <AiOutlineUser className="user-icon user-icon-lg" />
          )}
          <div className="card-header-info">
            <h5>{userInfo.name}</h5>
            <span className="text-secondary">
              {formatDistance(Date.parse(post.uploadTime), new Date(), {
                addSuffix: true,
              })}
            </span>
          </div>
        </div>
        <div className="card-text">{post.content}</div>
      </div>
      {post.imgSrc ? (
        <img
          src={post.imgSrc}
          className="card-img-top"
          alt=""
          style={{ objectFit: "cover" }}
        />
      ) : null}
      <CardFooter className="py-2 px-3">
        <div className="d-flex">
          <div className="reaction-box">
            <BiLike className="mt-1 mr-1" />
            <span>123</span>
          </div>
          <div className="comment-box">
            <BiComment className="mt-1 mr-1" />
            <span>123</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
