package com.cybersoft.fakebook.service.impl;

import com.cybersoft.fakebook.dto.ChatMessageDto;
import com.cybersoft.fakebook.entity.ChatMessage;
import com.cybersoft.fakebook.repository.ChatMessageRepository;
import com.cybersoft.fakebook.repository.ChatroomRepository;
import com.cybersoft.fakebook.repository.UserRepository;
import com.cybersoft.fakebook.service.ChatService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class ChatServiceImpl implements ChatService {
    private UserRepository userRepository;
    private ChatroomRepository chatroomRepository;
    private ChatMessageRepository chatMessageRepository;

    @Override
    public List<ChatMessageDto> getChatMessageByRoomId(long roomId) {
        List<ChatMessage> chatMessages=chatMessageRepository.getAllByChatroomIdOrderByLocalDateTimeDesc(roomId);
        List<ChatMessageDto> result = new ArrayList<>();
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        for(ChatMessage x :chatMessages)
            result.add(modelMapper.map(x,ChatMessageDto.class));
        return result;
    }

    @Override
    public ChatMessage chat(ChatMessageDto chatMessageDto) throws IllegalAccessException {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username;
        if (principal instanceof UserDetails)
            username = ((UserDetails)principal).getUsername();
        else username = principal.toString();
        long id = userRepository.findIdByUsername(username);
        if(chatMessageDto.getSenderId()!=id)
            throw new IllegalAccessException("User id does not match token id");

        ChatMessage chatMessage = new ChatMessage(chatMessageDto);
        return chatMessageRepository.save(chatMessage);

    }
}
