package com.cybersoft.fakebook.service.impl;

import com.cybersoft.fakebook.dto.PostDto;
import com.cybersoft.fakebook.entity.Post;
import com.cybersoft.fakebook.repository.PostRepository;
import com.cybersoft.fakebook.service.PostService;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;

@Service
@Transactional(rollbackOn = Exception.class)
public class PostServiceImpl implements PostService {

    private PostRepository postRepository;

    public PostServiceImpl(PostRepository postRepository){
        this.postRepository = postRepository;
    }

    @Override
    public long uploadPost(PostDto postDto) {
        postDto.setUploadTime(LocalDateTime.now());
        Post post = new Post(postDto);
        return postRepository.save(post).getId();
    }
}
