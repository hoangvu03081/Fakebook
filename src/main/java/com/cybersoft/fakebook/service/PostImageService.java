package com.cybersoft.fakebook.service;

import java.util.List;

public interface PostImageService {
    List<Long> getPostImageIdByPostId(long id);
}
