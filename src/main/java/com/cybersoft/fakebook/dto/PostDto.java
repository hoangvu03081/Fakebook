package com.cybersoft.fakebook.dto;

import com.cybersoft.fakebook.entity.Post;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class PostDto {
    private long id;
    private String content;
    private int likes;
    private long userId;
    private LocalDateTime uploadTime;
    private boolean liked;

    public PostDto(Post post){
        this.id=post.getId();
        this.content=post.getContent();
        this.likes=post.getLikes();
        this.userId=post.getUserId();
        this.uploadTime=post.getUploadTime();
    }
}
