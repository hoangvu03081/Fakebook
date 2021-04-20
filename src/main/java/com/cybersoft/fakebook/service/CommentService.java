package com.cybersoft.fakebook.service;

import com.cybersoft.fakebook.dto.CommentDto;

import java.util.List;

public interface CommentService {
    long postComment(CommentDto commentDto);
    boolean deleteComment(long id);
    long editComment(CommentDto commentDto);
    List<CommentDto> getComment(long postId);
}
