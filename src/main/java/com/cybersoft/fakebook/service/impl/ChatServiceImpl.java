package com.cybersoft.fakebook.service.impl;

import com.cybersoft.fakebook.dto.ChatMessageDto;
import com.cybersoft.fakebook.entity.ChatMessage;
import com.cybersoft.fakebook.repository.ChatMessageRepository;
import com.cybersoft.fakebook.repository.ChatroomRepository;
import com.cybersoft.fakebook.repository.UserRepository;
import com.cybersoft.fakebook.service.ChatService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;

@Service
@AllArgsConstructor
public class ChatServiceImpl implements ChatService {
    private UserRepository userRepository;
    private ChatroomRepository chatroomRepository;
    private ChatMessageRepository chatMessageRepository;

    @Override
    public List<ChatMessage> getChatMessageByRoomId(long roomId) {
        return chatMessageRepository.getAllByChatroomIdOrderByLocalDateTimeDesc(roomId);
    }

    @Override
    public boolean chat(ChatMessageDto chatMessageDto) {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username;
        if (principal instanceof UserDetails)
            username = ((UserDetails)principal).getUsername();
        else username = principal.toString();
        long id = userRepository.findIdByUsername(username);
        if(chatMessageDto.getSenderId()!=id)
            return false;

        ChatMessage chatMessage = new ChatMessage(chatMessageDto);
        chatMessageRepository.save(chatMessage);
        return true;
    }
}
