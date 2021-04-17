package com.cybersoft.fakebook.dto;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class FriendshipDto {
    private long id;
    private String username;
    private String name;
    private String avatar;
}
