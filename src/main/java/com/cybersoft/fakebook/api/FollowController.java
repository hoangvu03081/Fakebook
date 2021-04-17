package com.cybersoft.fakebook.api;

import com.cybersoft.fakebook.service.FollowService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/follow")
public class FollowController {

    private FollowService followService;

    public FollowController(FollowService followService){
        this.followService=followService;
    }

    @GetMapping()
    public Object get(){
        try{
            return new ResponseEntity<Object>(followService.getFollowId(),HttpStatus.OK);
        } catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("{id}")
    public Object delete(@PathVariable String id){
        try{
            if(followService.deleteFollow(Long.parseLong(id)))
                return new ResponseEntity<Object>(HttpStatus.OK);
            else return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
        } catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
    }

    @PostMapping("{id}")
    public Object create(@PathVariable String id){
        try{
            if(followService.addFollow(Long.parseLong(id)))
                return new ResponseEntity<Object>(HttpStatus.OK);
            else return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
        } catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
    }

}
