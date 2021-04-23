package com.cybersoft.fakebook.util;

import com.cybersoft.fakebook.entity.ChatProtocol;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.atmosphere.config.managed.Decoder;

import javax.inject.Inject;
import java.io.IOException;

public class ProtocolDecoder implements Decoder<String, ChatProtocol> {

    @Inject
    private ObjectMapper mapper;

    @Override
    public ChatProtocol decode(String s) {
        try {
            return mapper.readValue(s, ChatProtocol.class);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}