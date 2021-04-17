package com.cybersoft.fakebook.api;

import com.cybersoft.fakebook.dto.LoginDto;
import com.cybersoft.fakebook.dto.UserDto;
import com.cybersoft.fakebook.service.AuthService;
import com.cybersoft.fakebook.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.naming.AuthenticationException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private AuthService authService;
    private UserService userService;

    public AuthController(AuthService authService, UserService userService) {
        this.authService = authService;
        this.userService = userService;
    }

    @PostMapping("register")
    public Object post(@RequestBody UserDto userDto) {
        try {
            Map<String,String> errorList = new HashMap<String,String>();
            int checkExist = userService.checkExistingUser(userDto);
            if(checkExist==1)
                errorList.put("username:","username already exists");
            if(checkExist==2)
                errorList.put("email:","email already exists");
            if(checkExist==3){
                errorList.put("username:","username already exists");
                errorList.put("email:","email already exists");
            }
            if(!errorList.isEmpty())
                return new ResponseEntity<Object>(errorList,HttpStatus.BAD_REQUEST);
            userService.addUser(userDto);
            return new ResponseEntity(HttpStatus.ACCEPTED);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity(HttpStatus.BAD_REQUEST);
    }

    @PostMapping("login")
    public Object login(@RequestBody LoginDto loginDto) {
        try {
            String token = authService.login(loginDto);
            return new ResponseEntity<Object>(token, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
    }
}
