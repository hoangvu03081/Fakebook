package com.cybersoft.fakebook.api;

import com.cybersoft.fakebook.dto.PostDto;
import com.cybersoft.fakebook.entity.Image;
import com.cybersoft.fakebook.service.ImageService;
import com.cybersoft.fakebook.service.PostService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Optional;

@RestController
@RequestMapping("api/post")
public class PostController {

    private ImageService imageService;
    private PostService postService;

    public PostController(ImageService imageService,PostService postService){
        this.imageService=imageService;
        this.postService=postService;
    }

    @PostMapping(value="upload")
    public Object uploadPostImages(@RequestPart("postDto")  PostDto postDto,
                                   @RequestPart(value = "files",required = false) Optional<MultipartFile[]> files){
        try{
            long postId = postService.uploadPost(postDto);
            if(files.isPresent())
                imageService.savePostImages(Arrays.asList(files.get()),postId);
            return new ResponseEntity<Object>(HttpStatus.CREATED);
        } catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping()
    public Object getPost(@RequestParam("time") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime time){
        try{
            System.out.println(time.toString());
            return new ResponseEntity<Object>(postService.getPost(time),HttpStatus.OK);
        } catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("{id}")
    public Object getProfilePost(@PathVariable String id){
        try{
            return new ResponseEntity<Object>(postService.getProfilePost(Long.parseLong(id)),HttpStatus.OK);
        } catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("like/{postId}")
    public Object likePost(@PathVariable String postId){
        try{
            postService.likePost(Long.parseLong(postId));
            return new ResponseEntity<Object>(HttpStatus.ACCEPTED);
        } catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("unlike/{postId}")
    public Object unlikePost(@PathVariable String postId){
        try{
            postService.unlikePost(Long.parseLong(postId));
            return new ResponseEntity<Object>(HttpStatus.ACCEPTED);
        } catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
        }
    }

}
