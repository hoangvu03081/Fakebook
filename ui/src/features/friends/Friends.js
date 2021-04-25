import React from "react";
import { useEffect } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchFriendAvatar, getFriendList } from "./friendsSlice";

export const renderFriends = (friends) => {
  return friends.map((friend) => (
    <Link
      key={friend.id}
      className="user d-flex align-items-center rounded cursor-pointer"
      to={`/profile/${friend.id}`}
    >
      {friend.avatarSrc ? (
        <img className="user-icon" src={friend.avatarSrc} alt="" />
      ) : (
        <AiOutlineUser className="user-icon" />
      )}
      <span className="username">{friend.name}</span>
    </Link>
  ));
};

export default function Friends() {
  const dispatch = useDispatch();
  const friends = useSelector((state) => state.friends.friends);

  useEffect(async () => {
    dispatch(getFriendList());
  }, []);

  useEffect(async () => {
    if (friends.fetched) {
      friends.data.forEach((friend) => {
        dispatch(
          fetchFriendAvatar({
            friendId: friend.id,
            avatarId: friend.avatar,
            type: "friends",
          })
        );
      });
    }
  }, [friends.fetched]);

  return (
    <section
      className="contacts p-4 bg-light rounded w-100 mb-3"
    >
      <h4>Contacts</h4>
      {renderFriends(friends.data)}
    </section>
  );
}
