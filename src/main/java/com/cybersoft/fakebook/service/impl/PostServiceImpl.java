package com.cybersoft.fakebook.service.impl;

import com.cybersoft.fakebook.dto.PostDto;
import com.cybersoft.fakebook.entity.Post;
import com.cybersoft.fakebook.entity.User;
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
    public long uploadPost(PostDto postDto) throws IllegalAccessException {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username;
        if (principal instanceof UserDetails)
            username = ((UserDetails)principal).getUsername();
        else username = principal.toString();
        long id = userRepository.findIdByUsername(username);
        if(postDto.getUserId()!=id)
            throw new IllegalAccessException("User Id posted does not match token id");
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
        {
            PostDto postDto = new PostDto(x);
            postDto.setLiked(likedPostStatus(postDto.getId()));
            result.add(postDto);
        }
        return result;
    }

    @Override
    public List<PostDto> getProfilePost(long id) {
        List<Post> postList = postRepository.getProfilePost(id);
        List<PostDto> result = new ArrayList<PostDto>();
        for(Post x : postList)
        {
            PostDto postDto = new PostDto(x);
            postDto.setLiked(likedPostStatus(postDto.getId()));
            result.add(postDto);
        }
        return result;

    }

    @Override
    public List<PostDto> getProfilePostByTime(long id, LocalDateTime time) {
        List<Post> postList = postRepository.getProfilePostFromTime(id,time);
        List<PostDto> result = new ArrayList<PostDto>();
        for(Post x : postList)
        {
            PostDto postDto = new PostDto(x);
            postDto.setLiked(likedPostStatus(postDto.getId()));
            result.add(postDto);
        }
        return result;
    }

    @Override
    public void likePost(long postId) {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username;
        if (principal instanceof UserDetails)
            username = ((UserDetails)principal).getUsername();
        else username = principal.toString();
        User user = userRepository.findOneByUsername(username);
        user.getLikedPosts().add(postRepository.getOne(postId));
        userRepository.save(user);
        postRepository.likePost(postId);
    }

    @Override
    public void unlikePost(long postId) {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username;
        if (principal instanceof UserDetails)
            username = ((UserDetails)principal).getUsername();
        else username = principal.toString();
        User user = userRepository.findOneByUsername(username);
        user.getLikedPosts().remove(postRepository.getOne(postId));
        userRepository.save(user);
        postRepository.unlikePost(postId);
    }

    @Override
    public boolean likedPostStatus(long postId){
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username;
        if (principal instanceof UserDetails)
            username = ((UserDetails)principal).getUsername();
        else username = principal.toString();
        User user = userRepository.findOneByUsername(username);
        if(user.getLikedPosts().contains(postRepository.getOne(postId)))
            return true;
        return false;
    }
}
