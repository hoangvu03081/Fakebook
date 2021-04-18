package com.cybersoft.fakebook.dto;

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
}
