package com.cybersoft.fakebook.repository;

import com.cybersoft.fakebook.entity.PostImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostImageRepository extends JpaRepository<PostImage, Long> {
    List<PostImage> getAllByPostId(long postId);
}
