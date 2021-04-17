package com.cybersoft.fakebook.service.impl;

import com.cybersoft.fakebook.entity.Image;
import com.cybersoft.fakebook.entity.User;
import com.cybersoft.fakebook.repository.ImageRepository;
import com.cybersoft.fakebook.repository.UserRepository;
import com.cybersoft.fakebook.service.ImageService;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.transaction.Transactional;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;

@Service
@Transactional(rollbackOn = Exception.class)
public class ImageServiceImpl implements ImageService {
    private final String uploadDir = "/src/main/resources/static/";
    private ImageRepository imageRepository;
    private UserRepository userRepository;

    public ImageServiceImpl(ImageRepository imageRepository,UserRepository userRepository){
        this.imageRepository=imageRepository;
        this.userRepository=userRepository;
    }

    @Override
    public void saveAvatar(byte[] bytes, String imageName) {
        try{
            String directory = Paths.get("").toAbsolutePath().toString();
            Path folderPath = Paths.get(directory+uploadDir);
            if(!Files.exists(folderPath))
                Files.createDirectories(folderPath);
            Path filePath = Paths.get(directory+uploadDir+new Date().getTime() + "-" + imageName);
            Files.write(filePath,bytes);
            Image image = new Image(0,filePath.toAbsolutePath().toString());
            long id = imageRepository.save(image).getId();

            Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            String username;
            if (principal instanceof UserDetails)
                username = ((UserDetails)principal).getUsername();
            else username = principal.toString();

            User user = userRepository.findOneByUsername(username);
            user.setAvatar(String.valueOf(id));
            userRepository.save(user);
        } catch (Exception e){
            e.printStackTrace();
        }
    }

    public FileSystemResource find(long id) {
        try {
            Image image = imageRepository.findById(id)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
            return new FileSystemResource(Paths.get(image.getLocation()));
        } catch (Exception e) {
            throw new RuntimeException();
        }
    }
}
