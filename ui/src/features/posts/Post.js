import { UserOutlined } from "@ant-design/icons";
import formatDistance from "date-fns/formatDistance";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Card, CardFooter } from "reactstrap";
import Comment from "./Comment";
import { likePost, unlikePost } from "./postsSlice";

export default function Post({ post }) {
  const dispatch = useDispatch();
  const [animationLike, setAnimationLike] = useState(false);

  const onToggleLike = () => {
    if (post.liked === false) {
      setAnimationLike(true);
      dispatch(likePost(post.id));
    } else {
      dispatch(unlikePost(post.id));
      setAnimationLike(false);
    }
  };

  const [showComment, setShowComment] = useState(true);

  const userInfo = post.userInfo;
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
      <div className="d-flex justify-content-end">
        <span className="text-secondary stat mr-2">{post.likes} likes</span>
        <span
          className="text-secondary stat mr-4"
          onClick={() => setShowComment(!showComment)}
        >
          {post.comments?.length ? post.comments?.length : 0} comments
        </span>
      </div>
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
          </div>
          <div className="comment-box">
            <div className="mt-1 mr-1">
              <box-icon name="comment"></box-icon>
            </div>
          </div>
        </div>
      </CardFooter>
      <Comment
        comments={post.comments}
        show={showComment}
        postId={post.id}
        userId={userInfo.id}
        setShowComment={setShowComment}
      />
    </Card>
  );
}
