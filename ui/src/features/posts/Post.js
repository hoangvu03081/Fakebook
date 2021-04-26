import Icon, { UserOutlined } from "@ant-design/icons";
import formatDistance from "date-fns/formatDistance";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Card, CardFooter } from "reactstrap";
import {
  fetchPostImage,
  getPostUserAvatar,
  likePost,
  unlikePost,
} from "./postsSlice";

export default function Post({ post }) {
  const dispatch = useDispatch();
  const [animationLike, setAnimationLike] = useState(false);

  useEffect(() => {
    if (post.userInfo && post.userInfo.avatar && !post.userInfo.avatarSrc) {
      dispatch(getPostUserAvatar({ post }));
    }
  }, [post.userInfo]);

  useEffect(() => {
    if (post.imageId.length && post.userInfo && post.userInfo.avatarSrc)
      dispatch(fetchPostImage({ postId: post.id, avatarId: post.imageId[0] }));
  }, [post.imageId, post.userInfo]);

  const onToggleLike = () => {
    if (post.liked === false) {
      setAnimationLike(true);
      dispatch(likePost(post.id));
    } else {
      dispatch(unlikePost(post.id));
      setAnimationLike(false);
    }
  };

  const { userInfo } = post;
  if (!userInfo) return null;
  return (
    <Card key={post.id} className="my-3">
      <div className="py-2 px-3">
        <div className="d-flex align-items-center" style={{ marginTop: 2 }}>
          {userInfo.avatarSrc ? (
            <img
              src={userInfo.avatarSrc}
              alt=""
              className="user-icon user-icon-lg"
            />
          ) : (
            <UserOutlined className="user-icon" />
          )}
          <div className="card-header-info" style={{ paddingTop: 3 }}>
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
          <div
            className={`reaction-box ${animationLike ? "active" : ""}`}
            onClick={onToggleLike}
          >
            <div className="mt-1 mr-1">
              <box-icon
                name="like"
                type={post.liked ? "solid" : "regular"}
              ></box-icon>
            </div>
            <span>{post.likes}</span>
          </div>
          <div className="comment-box">
            <div className="mt-1 mr-1">
              <box-icon name="comment"></box-icon>
            </div>
            <span>123</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
