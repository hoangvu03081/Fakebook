package com.cybersoft.fakebook.service;

import org.springframework.core.io.FileSystemResource;

public interface ImageService {
    void saveAvatar(byte[] bytes, String imageName);
    FileSystemResource find(long id);
}
