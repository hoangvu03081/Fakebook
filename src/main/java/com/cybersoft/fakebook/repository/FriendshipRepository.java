package com.cybersoft.fakebook.repository;

import com.cybersoft.fakebook.dto.FriendshipDto;
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

    @Query(value="SELECT u2.id" +
            "      FROM user u1\n" +
            "      JOIN user u2 on u1.id != u2.id\n" +
            " LEFT JOIN friendship f1 on u1.id = f1.requester_id\n" +
            "                     and u2.id = f1.receiver_id\n" +
            " LEFT JOIN friendship f2 on u2.id = f2.requester_id\n" +
            "                     and u1.id = f2.receiver_id\n" +
            "     WHERE u1.id = :id\n" +
            "     AND ((f1.requester_id IS NULL AND f1.receiver_id) IS NULL AND (f2.requester_id IS NULL AND f2.receiver_id IS NULL)) LIMIT 10",nativeQuery = true)
    List<Long> findNotFriendsId(@Param("id") long id);
}
