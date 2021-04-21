package com.cybersoft.fakebook.entity;

import com.cybersoft.fakebook.dto.PostDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "post")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String content;
    private int likes;

    @Column(name = "user_id")
    private long userId;

    @Column(name = "upload_time")
    private LocalDateTime uploadTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id",updatable = false,insertable = false)
    private User user;

    @OneToMany(mappedBy = "post",fetch = FetchType.LAZY)
    private List<PostImage> postImage;

    @OneToMany(mappedBy = "post", fetch = FetchType.LAZY)
    private List<Comment> comment;

    @ManyToMany(mappedBy = "likedPosts")
    Set<User> likedUsers;

    public Post(PostDto postDto){
        this.id=postDto.getId();
        this.content=postDto.getContent();
        this.likes=postDto.getLikes();
        this.userId=postDto.getUserId();
        this.uploadTime=postDto.getUploadTime();
    }
}
