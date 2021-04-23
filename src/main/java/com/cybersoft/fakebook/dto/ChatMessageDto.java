package com.cybersoft.fakebook.dto;

import lombok.*;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
public class ChatMessageDto {
    private long id;
    private long chatroomId;
    private long senderId;
    private long recipientId;
    private String content;
    private LocalDateTime localDateTime;
}
