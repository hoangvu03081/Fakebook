package com.cybersoft.fakebook.repository;

import com.cybersoft.fakebook.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post,Long> {

    @Query(value = "(SELECT p.*\n" +
            "FROM\n" +
            "     post p\n" +
            "LEFT JOIN user u on p.user_id = u.id\n" +
            "LEFT JOIN follow f on u.id = f.target_id\n" +
            "WHERE f.follower_id=:id AND upload_time<=:uploadTime)\n" +
            "UNION (\n" +
            "    SELECT *\n" +
            "    FROM\n" +
            "        post p\n" +
            "    WHERE p.user_id=:id\n" +
            ")\n" +
            "ORDER BY upload_time desc;",nativeQuery = true)
    List<Post> getPost(@Param("id") long id, @Param("uploadTime") LocalDateTime uploadTime);

    @Query("SELECT p FROM Post p WHERE p.userId=:id ORDER BY p.uploadTime DESC ")
    List<Post> getProfilePost(@Param("id") long id);
}
