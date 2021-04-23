package com.cybersoft.fakebook.repository;

import com.cybersoft.fakebook.entity.Chatroom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatroomRepository extends JpaRepository<Chatroom,Long> {
}
