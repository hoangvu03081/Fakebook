package com.cybersoft.fakebook.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "post_image")
public class PostImage {
    @Id
    private long id;
    @Column(name = "post_id")
    private long postId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id",insertable = false,updatable = false)
    private Post post;

    public PostImage(long id, long postId) {
        this.id=id;
        this.postId=postId;
    }
}