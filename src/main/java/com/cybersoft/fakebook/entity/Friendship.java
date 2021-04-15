package com.cybersoft.fakebook.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "friendship")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Friendship {

    @EmbeddedId
    private FriendshipId friendshipId;

    private int status;
}
