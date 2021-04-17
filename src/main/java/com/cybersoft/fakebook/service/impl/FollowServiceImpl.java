package com.cybersoft.fakebook.service.impl;

import com.cybersoft.fakebook.entity.Follow;
import com.cybersoft.fakebook.entity.FollowId;
import com.cybersoft.fakebook.repository.FollowRepository;
import com.cybersoft.fakebook.repository.UserRepository;
import com.cybersoft.fakebook.service.FollowService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(rollbackOn = Exception.class)
public class FollowServiceImpl implements FollowService {

    private FollowRepository followRepository;
    private UserRepository userRepository;

    public FollowServiceImpl(FollowRepository followRepository,UserRepository userRepository){
        this.followRepository=followRepository;
        this.userRepository=userRepository;
    }

    @Override
    public List<Long> getFollowId() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username;
        if (principal instanceof UserDetails)
            username = ((UserDetails)principal).getUsername();
        else username = principal.toString();
        long id = userRepository.findIdByUsername(username);
        return followRepository.getFollowsId(id);
    }

    @Override
    public boolean deleteFollow(long targetId) {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username;
        if (principal instanceof UserDetails)
            username = ((UserDetails)principal).getUsername();
        else username = principal.toString();
        long id = userRepository.findIdByUsername(username);
        Optional<Follow> follow = followRepository.findById(new FollowId(id,targetId));
        if(follow.isPresent())
        {
            followRepository.delete(follow.get());
            return true;
        }
        return false;
    }

    @Override
    public boolean addFollow(long targetId) {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username;
        if (principal instanceof UserDetails)
            username = ((UserDetails)principal).getUsername();
        else username = principal.toString();
        long id = userRepository.findIdByUsername(username);
        followRepository.save(new Follow(new FollowId(id,targetId)));
        return true;
    }


}
