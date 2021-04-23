package com.cybersoft.fakebook.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotEmpty;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginDto {
    @NotEmpty
    String username;
    @Length(min=6,max = 128)
    String password;
}
