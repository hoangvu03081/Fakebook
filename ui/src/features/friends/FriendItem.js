import React, { useEffect } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { fetchFriendsAvatar } from "./friendsSlice";

const getTypes = (index) =>
  index === 0 ? "requests" : index === 1 ? "suggestedFriends" : "friends";

export default function FriendItem({ title, list, accept, deny, onAccept }) {
  const dispatch = useDispatch();
  const { requests, suggestedFriends, friends } = useSelector(
    (state) => state.friends
  );
  useEffect(() => {
    // hàm này sẽ đc đưa lên friends.js
    [requests, suggestedFriends, friends].forEach((arr, index) => {
      if (arr.length)
        arr.forEach((request) => {
          dispatch(
            fetchFriendsAvatar({
              friendId: request.id,
              friendType: getTypes(index),
              avatarId: request.avatar,
            })
          );
        });
    });
  }, [requests.length, suggestedFriends.length, friends.length]);
  return (
    <div className="p-2">
      <h4 className="my-2">{title}</h4>
      <hr className="mb-2" />
      {list.map((item) => (
        <div className="d-flex align-items-center py-2" key={item.id}>
          {item.avatarSrc ? (
            <img
              src={item.avatarSrc}
              className="user-icon user-icon-xlg"
              alt=""
            />
          ) : (
            <AiOutlineUser className="bg-dark text-white user-icon" />
          )}
          <div>
            <p className="fw-semi-bold mb-2">{item.name}</p>
            <button className="btn btn-primary me-2" onClick={() => {onAccept(item.id)}}>{accept}</button>
            {deny && <button className="btn btn-light">{deny}</button>}
          </div>
        </div>
      ))}
    </div>
  );
}
