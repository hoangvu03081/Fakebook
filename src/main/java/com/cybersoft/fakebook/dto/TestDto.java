package com.cybersoft.fakebook.dto;

import com.cybersoft.fakebook.entity.Test;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TestDto {

    public int id;
    public String username;
    public String content;

    public TestDto(Test entity){
        this.id = entity.getId();
        this.username = entity.getUsername();
        this.content = entity.getContent();
    }
}
