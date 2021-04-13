package com.cybersoft.fakebook.filter;

import io.jsonwebtoken.Jwts;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class AuthFilter extends BasicAuthenticationFilter {

    private UserDetailsService userDetailsService;

    public AuthFilter(AuthenticationManager authenticationManager,UserDetailsService userDetailsService) {
        super(authenticationManager);
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {

        String authorizationHeader = request.getHeader("Authorization");

        if(authorizationHeader!=null && !authorizationHeader.isEmpty()) {
            String token = authorizationHeader.replace("Bearer","");
            System.out.println("yes");
            String email = Jwts.parser()
                    .setSigningKey("KEYVALUE")
                    .parseClaimsJws(token)
                    .getBody()
                    .getSubject();

            UserDetails userDetails = userDetailsService.loadUserByUsername(email);
            Authentication authentication =
                    new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);

        }

        chain.doFilter(request, response);
    }
}
