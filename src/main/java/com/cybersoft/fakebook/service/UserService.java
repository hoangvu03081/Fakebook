package com.cybersoft.fakebook.service;

import com.cybersoft.fakebook.dto.UserDto;
import com.cybersoft.fakebook.entity.User;

import java.util.List;

public interface UserService {
    User getUserById(long id);
    User getUserByUsername(String username);
    List<User> getAllUser();
    boolean addUser(UserDto dto);
    boolean deleteUserById(long id);
    boolean updateUser(UserDto dto);

}
