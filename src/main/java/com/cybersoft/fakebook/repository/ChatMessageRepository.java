package com.cybersoft.fakebook.repository;

import com.cybersoft.fakebook.entity.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage,Long> {
    List<ChatMessage> getAllByChatroomIdOrderByLocalDateTimeDesc(long chatroomId);
}
