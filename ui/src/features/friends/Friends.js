import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FriendItem from "./FriendItem";
import {
  getFriends,
  getRequestList,
  getSuggestedFriends,
  makeAccept,
  makeRequest,
} from "./friendsSlice";

export default function Friends() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const { request, accept, requests, suggestedFriends, friends } = useSelector(
    (state) => state.friends
  );

  useEffect(() => {
    if (token) {
      dispatch(getRequestList(token));
      dispatch(getSuggestedFriends(token));
      dispatch(getFriends(token));
    }
  }, [token]);
  useEffect(() => {
    if (token) dispatch(getSuggestedFriends(token));
  }, [request]);
  useEffect(() => {
    if (token) {
      dispatch(getRequestList(token));
      dispatch(getFriends(token));
    }
  }, [accept]);
  if (!(suggestedFriends.length || requests.length || friends.length))
    return <div>You have no friends 😭</div>;
  return (
    <React.Fragment>
      {suggestedFriends.length ? (
        <FriendItem
          title="Suggested friends"
          list={suggestedFriends.slice(0, 2)}
          accept="Request"
          deny="Delete"
          onAccept={(id) => {
            dispatch(makeRequest(id));
          }}
        />
      ) : null}
      {requests.length ? (
        <FriendItem
          title="Requests"
          list={requests.slice(0, 5)}
          accept="Accept"
          deny="Deny"
          onAccept={(id) => {
            dispatch(makeAccept(id));
          }}
        />
      ) : null}
      {friends.length ? (
        <FriendItem
          title="Your friends"
          list={friends.slice(0, 20)}
          accept="Chat"
          onAccept={(id) => {console.log("want to chat with", id)}}
        />
      ) : null}
    </React.Fragment>
  );
}
