package com.cybersoft.fakebook.repository;

import com.cybersoft.fakebook.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post,Long> {
}
