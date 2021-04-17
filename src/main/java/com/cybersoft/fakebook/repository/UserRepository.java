package com.cybersoft.fakebook.repository;

import com.cybersoft.fakebook.dto.FriendshipDto;
import com.cybersoft.fakebook.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    @Query(value = "SELECT e FROM User e WHERE e.username = :username")
    User findOneByUsername(@Param("username") String username);

    @Query(value = "SELECT e.id from User e where e.username=:username")
    int findIdByUsername(@Param("username") String username);

    List<User> findUsersByEmail(String email);



}
