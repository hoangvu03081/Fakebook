package com.cybersoft.fakebook.repository;

import com.cybersoft.fakebook.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    @Query(value = "SELECT e FROM User e WHERE e.username = :username")
    User findOneByUsername(@Param("username") String username);
}
