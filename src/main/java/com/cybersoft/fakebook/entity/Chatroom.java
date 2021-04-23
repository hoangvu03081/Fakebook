package com.cybersoft.fakebook.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "chatroom")
public class Chatroom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    @Column(name = "is_group")
    private boolean isGroup;

    @ManyToMany(mappedBy = "chatroomSet")
    Set<User> userSet;

    @OneToMany(mappedBy = "chatroom",fetch = FetchType.LAZY)
    private List<ChatMessage> chatMessageList;
}