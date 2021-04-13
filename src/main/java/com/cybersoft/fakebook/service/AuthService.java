package com.cybersoft.fakebook.service;

import com.cybersoft.fakebook.dto.LoginDto;

public interface AuthService {
    String login(LoginDto loginDto);
}
