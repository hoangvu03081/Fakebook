package com.cybersoft.fakebook.service;

import java.util.List;

public interface FollowService {
    List<Long> getFollowId();
    boolean deleteFollow(long targetId);
    boolean addFollow(long targetId);
}
