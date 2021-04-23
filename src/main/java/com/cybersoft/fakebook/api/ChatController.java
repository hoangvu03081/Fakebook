package com.cybersoft.fakebook.api;

import com.cybersoft.fakebook.dto.ChatMessageDto;
import com.cybersoft.fakebook.dto.ChatNotification;
import com.cybersoft.fakebook.entity.ChatMessage;
import com.cybersoft.fakebook.service.ChatService;
import com.cybersoft.fakebook.service.UserService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.modelmapper.spi.MatchingStrategy;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import springfox.documentation.annotations.ApiIgnore;

@ApiIgnore
@AllArgsConstructor
@Controller
public class ChatController {
    private SimpMessagingTemplate messagingTemplate;
    private ChatService chatService;
    private UserService userService;

    /*
    @GetMapping("{roomId}")
    public Object getChat(@PathVariable String roomId){
        try{
            return new ResponseEntity<Object>(chatService.getChatMessageByRoomId(Long.parseLong(roomId)),HttpStatus.OK);
        } catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
        }
    }*/

    @MessageMapping("/chat")
    public void processMessage(@Payload ChatMessageDto chatMessageDto) {
        try{

            ModelMapper modelMapper = new ModelMapper();
            modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
            ChatMessage savedChatMessage = chatService.chat(chatMessageDto);
            messagingTemplate.convertAndSendToUser(
                    String.valueOf(chatMessageDto.getRecipientId()),"/queue/messages",
                    new ChatNotification(
                            savedChatMessage.getId(),
                            savedChatMessage.getSenderId(),
                            userService.getUserById(savedChatMessage.getId()).getName()));
        } catch (Exception e){
            e.printStackTrace();
        }

    }

}
