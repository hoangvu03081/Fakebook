package com.cybersoft.fakebook.service;


import com.cybersoft.fakebook.dto.FriendshipDto;
import com.cybersoft.fakebook.dto.UserDto;
import com.cybersoft.fakebook.entity.Friendship;

import java.util.List;

public interface FriendshipService {
    List<FriendshipDto> getAllFriends();
    List<FriendshipDto> getSuggestFriends();
    List<FriendshipDto> getFriendshipRequest();
    List<FriendshipDto> getFriendshipRequestSent();
    boolean deleteFriendship(long id);
    boolean requestFriendship(long id);
    boolean acceptFriendship(long id);


}
