package com.cybersoft.fakebook.service;

import com.cybersoft.fakebook.dto.PostDto;

import java.time.LocalDateTime;
import java.util.List;

public interface PostService {
    long uploadPost(PostDto postDto);
    List<PostDto> getPost(LocalDateTime time);
}
