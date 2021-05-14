import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { renderFriends } from "./Friends";
import { getRequests, getSuggestedFriends } from "./friendsSlice";

export default function SuggestedFriends() {
  const dispatch = useDispatch();
  const suggests = useSelector((state) => state.friends.suggests);
  const requests = useSelector((state) => state.friends.requests);

  useEffect(() => {
    dispatch(getSuggestedFriends());
    dispatch(getRequests());
  }, []);
  return (
    <section className="p-4 w-100 mb-3">
      {requests.length ? (
        <>
          <h4>Requests to add friend</h4>
          {renderFriends(requests)}
        </>
      ) : null}

      {suggests.length ? (
        <>
          <h4>Suggested friends</h4>
          {renderFriends(suggests)}
        </>
      ) : null}
    </section>
  );
}
