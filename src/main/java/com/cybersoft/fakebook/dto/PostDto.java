package com.cybersoft.fakebook.dto;

import com.cybersoft.fakebook.entity.Post;
import lombok.*;

import javax.validation.constraints.NotEmpty;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class PostDto {
    private long id;
    @NotEmpty
    private String content;
    private int likes;
    private long userId;
    private LocalDateTime uploadTime;
    private boolean liked;
    private List<Long> imageId;

    public PostDto(Post post){
        this.id=post.getId();
        this.content=post.getContent();
        this.likes=post.getLikes();
        this.userId=post.getUserId();
        this.uploadTime=post.getUploadTime();
    }
}
