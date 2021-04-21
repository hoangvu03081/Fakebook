package com.cybersoft.fakebook.util;

import com.cybersoft.fakebook.entity.Message;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.atmosphere.config.managed.Decoder;

import javax.inject.Inject;
import java.io.IOException;

public class JacksonDecoder implements Decoder<String, Message> {

    @Inject
    private ObjectMapper mapper;

    @Override
    public Message decode(String s) {
        try {
            return mapper.readValue(s, Message.class);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}