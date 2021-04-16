package com.cybersoft.fakebook.service.impl;

import com.cybersoft.fakebook.dto.FriendshipDto;
import com.cybersoft.fakebook.dto.UserDto;
import com.cybersoft.fakebook.entity.Friendship;
import com.cybersoft.fakebook.entity.FriendshipId;
import com.cybersoft.fakebook.entity.User;
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

    public FriendshipServiceImpl(FriendshipRepository friendshipRepository, UserRepository userRepository){
        this.friendshipRepository=friendshipRepository;
        this.userRepository=userRepository;
    }

    @Override
    public List<FriendshipDto> getAllFriends() {
        if(SecurityContextHolder.getContext()==null)
            System.out.println("getContext()");
        else if(SecurityContextHolder.getContext().getAuthentication()==null)
            System.out.println("getContext().getAuthentication()");
        else System.out.println("getContext().getAuthentication().getPrincipal()");
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
                friends.add(new FriendshipDto(temp.get().getId(),temp.get().getUsername(),temp.get().getAvatar()));
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
        return true;
    }
}
