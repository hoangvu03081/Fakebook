package com.cybersoft.fakebook.util;

import com.cybersoft.fakebook.entity.Message;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.atmosphere.config.managed.Encoder;

import javax.inject.Inject;
import java.io.IOException;

/**
 * Encode a {@link Message} into a String
 */


public class JacksonEncoder implements Encoder<Message, String> {

    @Inject
    private ObjectMapper mapper;

    @Override
    public String encode(Message m) {
        try {
            return mapper.writeValueAsString(m);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}