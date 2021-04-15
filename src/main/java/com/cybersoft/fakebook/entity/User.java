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
