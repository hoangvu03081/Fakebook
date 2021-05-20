package com.cybersoft.fakebook.service.impl;

import com.cybersoft.fakebook.entity.Image;
import com.cybersoft.fakebook.entity.PostImage;
import com.cybersoft.fakebook.entity.User;
import com.cybersoft.fakebook.repository.ImageRepository;
import com.cybersoft.fakebook.repository.PostImageRepository;
import com.cybersoft.fakebook.repository.UserRepository;
import com.cybersoft.fakebook.service.ImageService;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import javax.transaction.Transactional;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional(rollbackOn = Exception.class)
public class ImageServiceImpl implements ImageService {
    private final String projectId = "fakebook-a6d3a";
    private final String bucketName = "fakebook-a6d3a.appspot.com";
    private final String uploadDir = "/src/main/resources/static/";
    private ImageRepository imageRepository;
    private UserRepository userRepository;
    private PostImageRepository postImageRepository;
    private Storage storage;

    public ImageServiceImpl(ImageRepository imageRepository,UserRepository userRepository,PostImageRepository postImageRepository) throws IOException {
        this.imageRepository=imageRepository;
        this.userRepository=userRepository;
        this.postImageRepository=postImageRepository;

        StorageOptions storageOptions = StorageOptions.newBuilder()
                .setProjectId(projectId)
                .setCredentials(GoogleCredentials.fromStream(new
                        FileInputStream("google-credentials.json"))).build();

        storage = storageOptions.getService();
    }

    public Optional<String> getExtensionByStringHandling(String filename) {
        return Optional.ofNullable(filename)
                .filter(f -> f.contains("."))
                .map(f -> f.substring(filename.lastIndexOf(".") + 1));
    }

    @Override
    public long saveAvatar(byte[] bytes, String imageName) {
        try{
            String directory = Paths.get("").toAbsolutePath().toString();
            Path folderPath = Paths.get(directory+uploadDir);
            if(!Files.exists(folderPath))
                Files.createDirectories(folderPath);
            String objectName =  new Date().getTime() + "-" + UUID.randomUUID()+".jpg";
            Path filePath = Paths.get(directory+uploadDir+objectName);
            Files.write(filePath,bytes);
            Image image = new Image(0,objectName);
            long id = imageRepository.save(image).getId();

            BlobId blobId = BlobId.of(bucketName, objectName);
            BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType("image/jpg").build();
            storage.create(blobInfo, Files.readAllBytes(filePath));
            Files.delete(filePath);

            Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            String username;
            if (principal instanceof UserDetails)
                username = ((UserDetails)principal).getUsername();
            else username = principal.toString();

            User user = userRepository.findOneByUsername(username);
            user.setAvatar(String.valueOf(id));
            userRepository.save(user);
            return id;
        } catch (Exception e){
            e.printStackTrace();
            return -1;
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

    @Override
    public void savePostImages(List<MultipartFile> files,long postId) {
        try{
            String directory = Paths.get("").toAbsolutePath().toString();
            Path folderPath = Paths.get(directory+uploadDir);
            if(!Files.exists(folderPath))
                Files.createDirectories(folderPath);
            for(MultipartFile x : files){
                byte[] bytes = x.getBytes();
                String objectName =  new Date().getTime() + "-" + UUID.randomUUID()+".jpg";
                Path filePath = Paths.get(directory+uploadDir+objectName);
                Files.write(filePath,bytes);

                BlobId blobId = BlobId.of(bucketName, objectName);
                BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType("image/jpg").build();
                storage.create(blobInfo, Files.readAllBytes(filePath));
                Files.delete(filePath);

                Image image = new Image(0,objectName);
                long id = imageRepository.save(image).getId();
                PostImage postImage = new PostImage(id,postId);
                postImageRepository.save(postImage);
            }
        } catch (Exception e){
            e.printStackTrace();
        }
    }
}
