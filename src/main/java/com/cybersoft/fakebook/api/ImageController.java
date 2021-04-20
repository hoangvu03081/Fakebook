package com.cybersoft.fakebook.api;

import com.cybersoft.fakebook.service.ImageService;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;

@RestController
@RequestMapping("api/image")
@CrossOrigin(origins = "http://localhost:3000")
public class ImageController {

    private ImageService imageService;

    public ImageController(ImageService imageService){
        this.imageService=imageService;
    }

    @PostMapping(value="avatar/upload", consumes = "multipart/form-data")
    public Object uploadAvatar(@RequestParam("file")MultipartFile file){
        try{
            return new ResponseEntity<Object>(imageService.saveAvatar(file.getBytes(), file.getOriginalFilename()),HttpStatus.CREATED);
        } catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value = "{imageId}", produces = MediaType.IMAGE_JPEG_VALUE)
    FileSystemResource downloadImage(@PathVariable Long imageId) throws Exception {
        return imageService.find(imageId);
    }
}
