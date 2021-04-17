package com.cybersoft.fakebook.repository;

import com.cybersoft.fakebook.entity.Follow;
import com.cybersoft.fakebook.entity.FollowId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FollowRepository extends JpaRepository<Follow, FollowId> {

    @Query("SELECT e.followId.targetId FROM Follow e WHERE e.followId.followerId=:id")
    List<Long> getFollowsId(@Param("id") long id);
}
