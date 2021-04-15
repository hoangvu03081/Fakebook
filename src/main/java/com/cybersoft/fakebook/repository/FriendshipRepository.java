package com.cybersoft.fakebook.repository;

import com.cybersoft.fakebook.entity.Friendship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FriendshipRepository extends JpaRepository<Friendship,Long> {

    @Query("SELECT e FROM Friendship e WHERE (e.friendshipId.receiverId=:id or e.friendshipId.requesterId=:id) AND e.status=1")
    List<Friendship> getAllFriendship(@Param("id") long id);


    @Modifying
    @Query(value = "UPDATE Friendship e SET e.status=1 where e.friendshipId.requesterId=:requestId AND e.friendshipId.receiverId=:receiveId")
    void acceptFriendship(@Param("requestId") long requestId, @Param("receiveId") long receiveId);

    @Modifying
    @Query(value = "DELETE FROM Friendship e WHERE (e.friendshipId.receiverId=:id1 and e.friendshipId.requesterId=:id2) OR (e.friendshipId.receiverId=:id2 and e.friendshipId.requesterId=:id1)")
    void deleteFriendship(@Param("id1") long id1,@Param("id2") long id2);
}
