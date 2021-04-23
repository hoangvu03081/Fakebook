package com.cybersoft.fakebook.service;

import com.cybersoft.fakebook.dto.ChatMessageDto;
import com.cybersoft.fakebook.entity.ChatMessage;

import java.util.List;

public interface ChatService {
    List<ChatMessage> getChatMessageByRoomId(long roomId);
    boolean chat(ChatMessageDto chatMessageDto);
}
