import { UserOutlined } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input } from "reactstrap";
import { comment as commentAction } from "./postsSlice";

export default function Comment({ comments, show, postId, userId }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  const [comment, setComment] = useState("");
  const [expand, setExpand] = useState(false);
  const userComment = () => (
    <div className="d-flex">
      {user.avatarSrc ? (
        <img className="user-icon" src={user.avatarSrc} alt={user.name} />
      ) : (
        <UserOutlined className="user-icon" />
      )}
      <Input
        type="text"
        name="comment"
        placeholder="Write a comment"
        value={comment}
        onChange={(e) => {
          setComment(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            dispatch(commentAction({ content: comment, postId, userId }));
            setComment("");
          }
        }}
      />
    </div>
  );

  const renderComment = () => {
    return comments.reduce((acc, comment) => {
      if (comment.userInfo) {
        acc.push(
          <div key={comment.id} className="d-flex">
            {comment.userInfo.avatarSrc ? (
              <img
                className="user-icon"
                src={comment.userInfo.avatarSrc}
                alt={comment.userInfo.name}
              />
            ) : null}
            <div>
              <p className="username comment">{comment.userInfo.name}</p>
              <p className="comment content">{comment.content}</p>
            </div>
          </div>
        );
        return acc;
      }
    }, []);
  };

  const renderRelevant = () => {
    if (comments.find((comment) => comment.userId === userId)) {
      return comments.reduce((acc, comment) => {
        if (comment.userInfo && acc.length < 2 && comment.userId === userId) {
          acc.unshift(
            <div key={comment.id} className="d-flex">
              {comment.userInfo.avatarSrc ? (
                <img
                  className="user-icon"
                  src={comment.userInfo.avatarSrc}
                  alt={comment.userInfo.name}
                />
              ) : null}
              <div>
                <p className="username comment">{comment.userInfo.name}</p>
                <p className="comment content">{comment.content}</p>
              </div>
            </div>
          );
        }
        return acc;
      }, []);
    } else {
      return comments.reduce((acc, comment) => {
        if (comment.userInfo && acc.length < 2) {
          acc.unshift(
            <div key={comment.id} className="d-flex">
              {comment.userInfo.avatarSrc ? (
                <img
                  className="user-icon"
                  src={comment.userInfo.avatarSrc}
                  alt={comment.userInfo.name}
                />
              ) : null}
              <div>
                <p className="username comment">{comment.userInfo.name}</p>
                <p className="comment content">{comment.content}</p>
              </div>
            </div>
          );
        }
        return acc;
      }, []);
    }
  };
  // show = true => show
  // show = false => hide
  // expand = true => expand
  // expand = false => minify
  return (
    <div className="py-2 px-3">
      {comments.length > 2 && !expand ? (
        <span
          className="text-secondary font-weight-bold stat ml-1"
          onClick={() => setExpand(true)}
        >
          See more {comments.length - 2} comments
        </span>
      ) : null}
      {show ? (expand ? renderComment() : renderRelevant()) : null}
      {userComment()}
    </div>
  );
}
