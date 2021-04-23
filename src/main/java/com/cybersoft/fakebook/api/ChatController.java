package com.cybersoft.fakebook.api;

import com.cybersoft.fakebook.service.ChatService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@RequestMapping("api/chat")
public class ChatController {
    private ChatService chatService;

    @GetMapping("{roomId}")
    public Object getChat(@PathVariable String roomId){
        try{
            return new ResponseEntity<Object>(chatService.getChatMessageByRoomId(Long.parseLong(roomId)),HttpStatus.OK);
        } catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
        }
    }
}
