package com.cybersoft.fakebook.service;

import org.springframework.core.io.FileSystemResource;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ImageService {
    void saveAvatar(byte[] bytes, String imageName);
    FileSystemResource find(long id);
    void savePostImages(List<MultipartFile> files,long postId);
}
