package com.cybersoft.fakebook.api;

import com.cybersoft.fakebook.dto.PostDto;
import com.cybersoft.fakebook.entity.Image;
import com.cybersoft.fakebook.service.ImageService;
import com.cybersoft.fakebook.service.PostService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
}
