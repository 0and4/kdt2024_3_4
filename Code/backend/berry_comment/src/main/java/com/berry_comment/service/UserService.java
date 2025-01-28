package com.berry_comment.service;

import com.berry_comment.entity.UserEntity;
import com.berry_comment.oauth.PrincipalDetails;
import com.berry_comment.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    public UserEntity getUserEntity(String userId) {
        return userRepository.findById(userId);
    }
    public String getUserIdByAuthentication(Authentication authentication) {
        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
        return principalDetails.getUser().getId();

    }
}
