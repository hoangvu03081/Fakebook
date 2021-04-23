package com.cybersoft.fakebook.dto;

import com.cybersoft.fakebook.entity.Comment;
import lombok.*;

import javax.persistence.Column;
import javax.validation.constraints.NotEmpty;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class CommentDto {

    private long id;

    @NotEmpty
    private String content;
    private LocalDateTime uploadTime;
    private long userId;
    private long postId;

    public CommentDto(Comment comment){
        this.id = comment.getId();
        this.content = comment.getContent();
        this.uploadTime = comment.getUploadTime();
        this.userId = comment.getUserId();
        this.postId = comment.getPostId();
    }
}
