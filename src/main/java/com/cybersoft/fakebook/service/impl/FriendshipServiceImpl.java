package com.cybersoft.fakebook.service.impl;

import com.cybersoft.fakebook.dto.FriendshipDto;
import com.cybersoft.fakebook.dto.UserDto;
import com.cybersoft.fakebook.entity.*;
import com.cybersoft.fakebook.repository.FollowRepository;
import com.cybersoft.fakebook.repository.FriendshipRepository;
import com.cybersoft.fakebook.repository.UserRepository;
import com.cybersoft.fakebook.service.FriendshipService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(rollbackOn = Exception.class)
public class FriendshipServiceImpl implements FriendshipService {

    private FriendshipRepository friendshipRepository;
    private UserRepository userRepository;
    private FollowRepository followRepository;

    public FriendshipServiceImpl(FriendshipRepository friendshipRepository, UserRepository userRepository,FollowRepository followRepository){
        this.friendshipRepository=friendshipRepository;
        this.userRepository=userRepository;
        this.followRepository=followRepository;
    }

    @Override
    public List<FriendshipDto> getAllFriends() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username;
        if (principal instanceof UserDetails)
            username = ((UserDetails)principal).getUsername();
         else username = principal.toString();
        long id = userRepository.findIdByUsername(username);
        List<Friendship> userList = friendshipRepository.getAllFriendship(id);
        List<FriendshipDto> friends = new ArrayList<FriendshipDto>();
        for(Friendship x : userList){
            Optional<User> temp;
            Long idTemp;
            if((idTemp=x.getFriendshipId().getReceiverId())!=id)
                temp=userRepository.findById(idTemp);
            else temp=userRepository.findById(x.getFriendshipId().getRequesterId());
            if(temp.isPresent())
                friends.add(new FriendshipDto(temp.get().getId(),temp.get().getUsername(),temp.get().getName(),temp.get().getAvatar()));
        }
        return friends;
    }

    @Override
    public List<FriendshipDto> getSuggestFriends() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username;
        if (principal instanceof UserDetails)
            username = ((UserDetails)principal).getUsername();
        else username = principal.toString();
        long id = userRepository.findIdByUsername(username);
        List<Long> friendsId=friendshipRepository.findNotFriendsId(id);
        if(friendsId.isEmpty())
            return new ArrayList<FriendshipDto>();
        List<User> userList = userRepository.findAllById(friendsId);
        List<FriendshipDto> friends = new ArrayList<FriendshipDto>();
        for(User temp : userList){
            friends.add(new FriendshipDto(temp.getId(),temp.getUsername(),temp.getName(),temp.getAvatar()));
        }
        return friends;
    }

    @Override
    public List<FriendshipDto> getFriendshipRequest() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username;
        if (principal instanceof UserDetails)
            username = ((UserDetails)principal).getUsername();
        else username = principal.toString();
        long id = userRepository.findIdByUsername(username);
        List<Long> friendsId=friendshipRepository.findNotFriendsId(id);

        List<Friendship> userList = friendshipRepository.getAllFriendshipRequest(id);
        List<FriendshipDto> friends = new ArrayList<FriendshipDto>();
        for(Friendship x : userList){
            Optional<User> temp;
            temp=userRepository.findById(x.getFriendshipId().getRequesterId());
            if(temp.isPresent())
                friends.add(new FriendshipDto(temp.get().getId(),temp.get().getUsername(),temp.get().getName(),temp.get().getAvatar()));
        }
        return friends;


    }

    @Override
    public boolean deleteFriendship(long id) {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username;
        if (principal instanceof UserDetails)
            username = ((UserDetails)principal).getUsername();
        else username = principal.toString();
        long idTemp = userRepository.findIdByUsername(username);
        friendshipRepository.deleteFriendship(id,idTemp);
        return false;
    }

    @Override
    public boolean requestFriendship(long id) {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username;
        if (principal instanceof UserDetails)
            username = ((UserDetails)principal).getUsername();
        else username = principal.toString();
        long requesterId = userRepository.findIdByUsername(username);
        FriendshipId friendshipId = new FriendshipId(requesterId,id);
        friendshipRepository.save(new Friendship(friendshipId,0));
        FollowId followId = new FollowId(requesterId,id);
        followRepository.save(new Follow(followId));

        return true;
    }

    @Override
    public boolean acceptFriendship(long id) {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username;
        if (principal instanceof UserDetails)
            username = ((UserDetails)principal).getUsername();
        else username = principal.toString();
        long receiverId = userRepository.findIdByUsername(username);
        friendshipRepository.acceptFriendship(id,receiverId);
        FollowId followId1 = new FollowId(receiverId,id);
        FollowId followId2 = new FollowId(id,receiverId);
        followRepository.save(new Follow(followId1));
        followRepository.save(new Follow(followId2));
        return true;
    }

}
