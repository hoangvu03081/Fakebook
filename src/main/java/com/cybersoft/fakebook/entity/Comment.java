package com.cybersoft.fakebook.entity;


import com.cybersoft.fakebook.dto.CommentDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "comment")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String content;

    @Column(name = "upload_time")
    private LocalDateTime uploadTime;

    @Column(name = "user_id")
    private long userId;

    @Column(name = "post_id")
    private long postId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id",updatable = false,insertable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id",updatable = false,insertable = false)
    private Post post;

    public Comment(CommentDto commentDto){
        this.id=commentDto.getId();
        this.content=commentDto.getContent();
        this.uploadTime = commentDto.getUploadTime();
        this.userId = commentDto.getUserId();
        this.postId = commentDto.getPostId();
    }
}
