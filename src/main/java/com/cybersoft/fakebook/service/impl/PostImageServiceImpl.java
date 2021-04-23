package com.cybersoft.fakebook.service.impl;

import com.cybersoft.fakebook.entity.PostImage;
import com.cybersoft.fakebook.repository.PostImageRepository;
import com.cybersoft.fakebook.service.PostImageService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@Service
public class PostImageServiceImpl implements PostImageService {

    private PostImageRepository postImageRepository;

    @Override
    public List<Long> getPostImageIdByPostId(long id) {
        List<PostImage> postImageList = postImageRepository.getAllByPostId(id);
        List<Long> result = new ArrayList<Long>();
        for(PostImage x : postImageList)
            result.add(x.getId());
        return result;
    }
}
