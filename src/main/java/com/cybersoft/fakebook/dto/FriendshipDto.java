package com.cybersoft.fakebook.dto;


import lombok.*;

import javax.validation.constraints.NotEmpty;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class FriendshipDto {
    private long id;
    @NotEmpty
    private String username;
    @NotEmpty
    private String name;
    private String avatar;
}
