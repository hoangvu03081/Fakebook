package com.cybersoft.fakebook.service;

import com.cybersoft.fakebook.dto.PostDto;

import java.time.LocalDateTime;
import java.util.List;

public interface PostService {
    long uploadPost(PostDto postDto) throws IllegalAccessException;
    List<PostDto> getPost(LocalDateTime time);
    List<PostDto> getProfilePost(long id);
    void likePost(long postId);
    void unlikePost(long postId);
    boolean likedPostStatus(long postId);
}
