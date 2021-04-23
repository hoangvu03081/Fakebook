package com.cybersoft.fakebook.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private long id;
    @NotEmpty
    @Length(max = 36)
    private String username;
    @NotEmpty
    private String name;
    @NotEmpty
    private String email;
    private String password;
    private LocalDate dob;
    @NotEmpty
    private String avatar;
}
