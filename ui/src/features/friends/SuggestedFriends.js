import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { renderFriends } from "./Friends";
import {
  fetchFriendAvatar,
  getRequests,
  getSuggestedFriends,
  logout,
} from "./friendsSlice";

export default function SuggestedFriends() {
  const dispatch = useDispatch();
  const suggests = useSelector((state) => state.friends.suggests);
  const requests = useSelector((state) => state.friends.requests);
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    if (token && !suggests.data.length && !requests.data.length) {
      dispatch(getSuggestedFriends(token));
      dispatch(getRequests(token));
    }
  }, []);

  useEffect(() => {
    if (
      suggests.fetched &&
      suggests.data[0] &&
      suggests.data[0].avatar &&
      !suggests.data[0].avatarSrc
    ) {
      suggests.data.forEach((friend) =>
        dispatch(
          fetchFriendAvatar({
            friendId: friend.id,
            avatarId: friend.avatar,
            type: "suggests",
          })
        )
      );
    }
  }, [suggests]);

  useEffect(() => {
    if (
      requests.fetched &&
      requests.data[0] &&
      requests.data[0].avatar &&
      !requests.data[0].avatarSrc
    ) {
      requests.data.forEach((friend) =>
        dispatch(
          fetchFriendAvatar({
            friendId: friend.id,
            avatarId: friend.avatar,
            type: "requests",
          })
        )
      );
    }
  }, [requests]);

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
