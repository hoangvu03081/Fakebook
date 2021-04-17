package com.cybersoft.fakebook.service.impl;

import com.cybersoft.fakebook.dto.FriendshipDto;
import com.cybersoft.fakebook.dto.UserDto;
import com.cybersoft.fakebook.entity.User;
import com.cybersoft.fakebook.repository.UserRepository;
import com.cybersoft.fakebook.service.UserService;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository){
        this.userRepository=userRepository;
    }

    @Override
    public User getUserById(long id) {
        return userRepository.getOne(id);
    }

    @Override
    public User getUserByUsername(String username) {
        return userRepository.findOneByUsername(username);
    }

    @Override
    public List<User> getAllUser() {
        return userRepository.findAll();
    }

    @Override
    public int checkExistingUser(UserDto userDto) {
        int errorType=0;
        if(userRepository.findOneByUsername(userDto.getUsername())!=null)
            errorType+=1;
        if(!userRepository.findUsersByEmail(userDto.getEmail()).isEmpty())
            errorType+=2;
        return errorType;
    }

    @Override
    public boolean addUser(UserDto dto) {
        User entity = new User(dto);
        entity.setPassword(BCrypt.hashpw(entity.getPassword(),BCrypt.gensalt()));
        userRepository.save(entity);
        return false;
    }

    @Override
    public boolean deleteUserById(long id) {
        userRepository.delete(getUserById(id));
        return true;
    }

    @Override
    public boolean updateUser(UserDto dto) {
        return false;
    }

    @Override
    public FriendshipDto getUserProfile() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username;
        if (principal instanceof UserDetails)
            username = ((UserDetails)principal).getUsername();
        else username = principal.toString();
        User user = userRepository.findOneByUsername(username);
        if(user!=null){
            FriendshipDto result = new FriendshipDto(user.getId(),user.getUsername(),user.getName(),user.getAvatar());
            return result;
        }

        return null;
    }


}
