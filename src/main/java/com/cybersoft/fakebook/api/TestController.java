package com.cybersoft.fakebook.api;

import com.cybersoft.fakebook.entity.Test;
import com.cybersoft.fakebook.service.TestService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/test")
public class TestController {

    private final TestService testService;

    public TestController(TestService testService){
        System.out.println("Test");
        this.testService=testService;
    }

    @GetMapping("")
    public Object get(){
        try {
            List<Test> jsonObject = testService.findAll();
            return new ResponseEntity<Object>(jsonObject, HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
    }
}
