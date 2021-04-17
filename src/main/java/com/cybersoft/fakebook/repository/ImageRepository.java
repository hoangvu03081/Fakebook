package com.cybersoft.fakebook.repository;

import com.cybersoft.fakebook.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image,Long> {
}
