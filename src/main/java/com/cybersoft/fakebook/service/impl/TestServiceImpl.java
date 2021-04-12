package com.cybersoft.fakebook.service.impl;

import com.cybersoft.fakebook.entity.Test;
import com.cybersoft.fakebook.repository.TestRepository;
import com.cybersoft.fakebook.service.TestService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TestServiceImpl implements TestService {

    private TestRepository testRepository;

    public TestServiceImpl(TestRepository testRepository)
    {
        this.testRepository=testRepository;
    }

    @Override
    public List<Test> findAll() {

        return testRepository.findAll();
    }

    @Override
    public Test findById(int id) {
        return testRepository.getOne(id);
    }


}
