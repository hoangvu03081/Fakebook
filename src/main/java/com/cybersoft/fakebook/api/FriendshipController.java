package com.cybersoft.fakebook.api;

import com.cybersoft.fakebook.service.FriendshipService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/friendship")
public class FriendshipController {

    private FriendshipService friendshipService;

    public FriendshipController(FriendshipService friendshipService){
        this.friendshipService=friendshipService;
    }

    @GetMapping()
    public Object getFriendList(){
        try {
            return new ResponseEntity<Object>(friendshipService.getAllFriends(),HttpStatus.OK);
        } catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
    }

    @GetMapping("suggest")
    public Object getSuggestFriendList(){
        try {
            return new ResponseEntity<Object>(friendshipService.getSuggestFriends(),HttpStatus.OK);
        } catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
    }

    @PutMapping("accept/{id}")
    public Object acceptRequest(@PathVariable String id){
        try {
            friendshipService.acceptFriendship(Long.parseLong(id));
            return new ResponseEntity<Object>(HttpStatus.OK);
        } catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
    }

    @PostMapping("request/{id}")
    public Object requestFriendship(@PathVariable String id){
        try {
            friendshipService.requestFriendship(Long.parseLong(id));
            return new ResponseEntity<Object>(HttpStatus.CREATED);
        } catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("delete/{id}")
    public Object deleteFriendship(@PathVariable String id){
        try {
            friendshipService.deleteFriendship(Long.parseLong(id));
            return new ResponseEntity<Object>(HttpStatus.OK);
        } catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
    }
}
