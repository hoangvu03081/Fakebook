import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { renderFriends } from "./Friends";
import {
  fetchFriendAvatar,
  getRequests,
  getSuggestedFriends,
} from "./friendsSlice";

export default function SuggestedFriends() {
  const dispatch = useDispatch();
  const suggests = useSelector((state) => state.friends.suggests);
  const requests = useSelector((state) => state.friends.requests);

  useEffect(async () => {
    dispatch(getSuggestedFriends());
    dispatch(getRequests());
  }, []);
  useEffect(async () => {
    if (suggests.fetched) {
      suggests.data.forEach((friend) => {
        dispatch(
          fetchFriendAvatar({
            friendId: friend.id,
            avatarId: friend.avatar,
            type: "suggests",
          })
        );
      });
    }
  }, [suggests.fetched]);

  const renderRequests = () => {
    if (requests.fetched && requests.data.length) {
      return (
        <>
          <h4>Requests to add friend</h4>
          {renderFriends(requests.data)}
        </>
      );
    }
    return null;
  };
  const renderSuggests = () => {
    if (suggests.fetched && suggests.data.length) {
      return (
        <>
          <h4>Suggested friends</h4>
          {renderFriends(suggests.data)}
        </>
      );
    }

    return null;
  };

  return (
    <section className="p-4 w-100 mb-3">
      {renderRequests()}
      {renderSuggests()}
    </section>
  );
}
