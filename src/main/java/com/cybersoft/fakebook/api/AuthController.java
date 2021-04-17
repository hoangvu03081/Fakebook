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
import java.util.List;

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
            List<String> errorList = new ArrayList<String>();
            int checkExist = userService.checkExistingUser(userDto);
            if(checkExist==1)
                errorList.add(new String("Username already existed"));
            if(checkExist==2)
                errorList.add(new String("Email already existed"));
            if(checkExist==3){
                errorList.add(new String("Username already existed"));
                errorList.add(new String("Email already existed"));
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
