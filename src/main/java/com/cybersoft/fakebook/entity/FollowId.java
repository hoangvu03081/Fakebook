package com.cybersoft.fakebook.entity;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class FollowId implements Serializable {
    @Column(name = "follower_id")
    private long followerId;
    @Column(name = "target_id")
    private long targetId;
}
