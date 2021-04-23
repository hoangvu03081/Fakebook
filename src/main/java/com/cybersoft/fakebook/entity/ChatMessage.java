package com.cybersoft.fakebook.entity;

import com.cybersoft.fakebook.dto.ChatMessageDto;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
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
@Table(name = "chat_message")
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class ChatMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "chatroom_id")
    private long chatroomId;
    @Column(name="sender_id")
    private long senderId;
    @Column(name="recipient_id")
    private long recipientId;
    private String content;
    private LocalDateTime localDateTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chatroom_id",insertable = false,updatable = false)
    private Chatroom chatroom;

    public ChatMessage(ChatMessageDto chatMessageDto) {
        this.id = chatMessageDto.getId();
        this.chatroomId = chatMessageDto.getChatroomId();
        this.senderId = chatMessageDto.getSenderId();
        this.recipientId = chatMessageDto.getRecipientId();
        this.content = chatMessageDto.getContent();
        this.localDateTime = LocalDateTime.now();
    }
}
