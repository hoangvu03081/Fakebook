import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "reactstrap";
import { renderFriends } from "./Friends";
import { friendSearch } from "./friendsSlice";

export default function Search() {
  const dispatch = useDispatch();
  const searchResults = useSelector((state) => state.friends.search);
  return (
    <div className="search d-flex flex-column align-items-center p-4">
      <Input
        style={{
          borderRadius: 50,
          width: 300,
          padding: 20,
          fontSize: 20,
          height: 50,
        }}
        type="text"
        name="text"
        placeholder="Search on Fakebook"
        onKeyUp={(e) => {
          dispatch(friendSearch(e.target.value));
        }}
      />
      <br />
      {renderFriends(searchResults)}
    </div>
  );
}
