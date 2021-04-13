package com.cybersoft.fakebook.service.impl;

import com.cybersoft.fakebook.dto.LoginDto;
import com.cybersoft.fakebook.service.AuthService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class AuthServiceImpl implements AuthService {

    private AuthenticationManager authenticationManager;

    public AuthServiceImpl(AuthenticationManager authenticationManager){
        this.authenticationManager=authenticationManager;
    }

    @Override
    public String login(LoginDto loginDto) {
        Authentication authentication = new UsernamePasswordAuthenticationToken(loginDto.getUsername(),loginDto.getPassword());
        authenticationManager.authenticate(authentication);

        final long JWT_EXPIRATION = 86400000L;
        final String key = "markzuckervu";

        Date now = new Date();
        Date expireDate = new Date(now.getTime() + JWT_EXPIRATION);

        String token = Jwts.builder()
                .setSubject(loginDto.getUsername())
                .setIssuedAt(now)
                .setExpiration(expireDate)
                .signWith(SignatureAlgorithm.HS512, key)
                .compact();

        return token;
    }
}
