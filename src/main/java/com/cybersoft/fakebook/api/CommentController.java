package com.cybersoft.fakebook.api;

import com.cybersoft.fakebook.dto.CommentDto;
import com.cybersoft.fakebook.service.CommentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("api/comment")
@CrossOrigin
public class CommentController {

    private CommentService commentService;

    public CommentController(CommentService commentService){
        this.commentService=commentService;
    }

    @GetMapping("{postId}")
    public Object getPostComment(@PathVariable String postId){
        try{
            return new ResponseEntity<Object>(commentService.getComment(Long.parseLong(postId)),HttpStatus.OK);
        } catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping()
    public Object postComment(@Valid @RequestBody CommentDto commentDto){
        try{
            return new ResponseEntity<Object>(commentService.postComment(commentDto),HttpStatus.CREATED);
        } catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping()
    public Object editComment(@Valid @RequestBody CommentDto commentDto){
        try{
            return new ResponseEntity<Object>(commentService.editComment(commentDto),HttpStatus.OK);
        } catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("{id}")
    public Object deleteComment(@PathVariable String id){
        try{
            return new ResponseEntity<Object>(commentService.deleteComment(Long.parseLong(id)),HttpStatus.OK);
        } catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
        }
    }

}
