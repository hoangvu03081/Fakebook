package com.cybersoft.fakebook.service.impl;

import com.cybersoft.fakebook.dto.CommentDto;
import com.cybersoft.fakebook.entity.Comment;
import com.cybersoft.fakebook.repository.CommentRepository;
import com.cybersoft.fakebook.service.CommentService;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(rollbackOn = Exception.class)
public class CommentServiceImpl implements CommentService {

    private CommentRepository commentRepository;

    public CommentServiceImpl(CommentRepository commentRepository){
        this.commentRepository=commentRepository;
    }

    @Override
    public long postComment(CommentDto commentDto) {
        Comment comment = new Comment(commentDto);
        comment.setUploadTime(LocalDateTime.now());
        return commentRepository.save(comment).getId();
    }

    @Override
    public boolean deleteComment(long id) {
        commentRepository.deleteById(id);
        return true;
    }

    @Override
    public long editComment(CommentDto commentDto) {
        Comment temp = commentRepository.getOne(commentDto.getId());
        temp.setContent(commentDto.getContent());
        return temp.getId();
    }

    @Override
    public List<CommentDto> getComment(long postId) {
        List<Comment> commentList=commentRepository.getPostComment(postId);
        List<CommentDto> result = new ArrayList<CommentDto>();
        for(Comment x : commentList)
            result.add(new CommentDto(x));

        return result;
    }
}
