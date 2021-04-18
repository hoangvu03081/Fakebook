package com.cybersoft.fakebook.service.impl;

import com.cybersoft.fakebook.dto.PostDto;
import com.cybersoft.fakebook.entity.Post;
import com.cybersoft.fakebook.repository.PostRepository;
import com.cybersoft.fakebook.repository.UserRepository;
import com.cybersoft.fakebook.service.PostService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(rollbackOn = Exception.class)
public class PostServiceImpl implements PostService {

    private PostRepository postRepository;
    private UserRepository userRepository;

    public PostServiceImpl(PostRepository postRepository,UserRepository userRepository){
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    @Override
    public long uploadPost(PostDto postDto) {
        postDto.setUploadTime(LocalDateTime.now());
        Post post = new Post(postDto);
        return postRepository.save(post).getId();
    }

    @Override
    public List<PostDto> getPost(LocalDateTime time) {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username;
        if (principal instanceof UserDetails)
            username = ((UserDetails)principal).getUsername();
        else username = principal.toString();
        long id = userRepository.findIdByUsername(username);
        List<Post> postList = postRepository.getPost(id,time);
        List<PostDto> result = new ArrayList<PostDto>();
        for(Post x : postList)
            result.add(new PostDto(x));
        return result;
    }
}
