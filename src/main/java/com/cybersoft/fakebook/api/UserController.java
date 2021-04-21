package com.cybersoft.fakebook.api;

import com.cybersoft.fakebook.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private UserService userService;

    public UserController(UserService userService){
        this.userService=userService;
    }
    @GetMapping()
    public Object getProfile(){
        try{
            return new ResponseEntity<Object >(userService.getUserProfile(),HttpStatus.OK);
        } catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
    }

    @GetMapping("{id}")
    public Object getProfile(@PathVariable String id){
        try{
            return new ResponseEntity<Object>(userService.getUserProfileById(Long.parseLong(id)),HttpStatus.OK);
        } catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
        }
    }
}
