package com.cybersoft.fakebook.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@EqualsAndHashCode
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FriendshipId implements Serializable {
    @Column(name = "requester_id")
    private long requesterId;
    @Column(name = "receiver_id")
    private long receiverId;
}
