import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { renderFriends } from './Friends';
import { fetchFriendAvatar, getSuggestedFriends } from './friendsSlice';

export default function SuggestedFriends() {
      
  const dispatch = useDispatch();
  const suggests = useSelector((state) => state.friends.suggests);

  useEffect(async () => {
    dispatch(getSuggestedFriends());
  }, []);
  
  useEffect(async () => {
    if (suggests.length) {
      suggests.forEach((friend) => {
        dispatch(fetchFriendAvatar({friendId: friend.id, avatarId: friend.avatar, type: "suggests"}));
      });
    }
  }, [suggests.length]);

  
  return (
    <section
      className="contacts p-4 bg-light rounded w-100 mb-3"
      style={{ left: 0, right: 0, top: 0 }}
    >
      <h4>Suggested Friends</h4>
      {renderFriends(suggests)}
    </section>
  )
}
