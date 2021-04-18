package com.cybersoft.fakebook.entity;

import com.cybersoft.fakebook.dto.UserDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "user")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String username;
    private String name;
    private String email;
    private String password;
    private LocalDate dob;
    private String avatar;


    @ManyToMany
    @JoinTable(name="friendship",
            joinColumns=@JoinColumn(name="receiver_id"),
            inverseJoinColumns=@JoinColumn(name="requester_id")
    )
    private List<User> friends;

    @ManyToMany
    @JoinTable(name="friendship",
            joinColumns=@JoinColumn(name="requester_id"),
            inverseJoinColumns=@JoinColumn(name="receiver_id")
    )
    private List<User> friendOf;

    @ManyToMany
    @JoinTable(name = "follow",
            joinColumns = @JoinColumn(name="follower_id"),
            inverseJoinColumns = @JoinColumn(name = "target_id"))
    private List<User> follows;

    @ManyToMany
    @JoinTable(name = "follow",
            joinColumns = @JoinColumn(name="target_id"),
            inverseJoinColumns = @JoinColumn(name = "follower_id"))
    private List<User> followers;

    @OneToMany(mappedBy = "user",fetch = FetchType.LAZY)
    private List<Post> post;

    public User(UserDto userDto){
        this.id=userDto.getId();
        this.username=userDto.getUsername();
        this.name=userDto.getName();
        this.email=userDto.getEmail();
        this.password=userDto.getPassword();
        this.dob=userDto.getDob();
        this.avatar=userDto.getAvatar();
    }
}
