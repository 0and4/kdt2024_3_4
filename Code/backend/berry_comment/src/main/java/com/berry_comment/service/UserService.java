package com.berry_comment.service;

import com.berry_comment.entity.UserEntity;
import com.berry_comment.oauth.PrincipalDetails;
import com.berry_comment.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final MailService mailService;
    private final RedisUtils redisUtils;

    public UserEntity getUserEntity(String userId) {
        return userRepository.findById(userId);
    }
    public String getUserIdByAuthentication(Authentication authentication) {
        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
        return principalDetails.getUser().getId();

    }

    public void updatePassword(String userEmail, String password) {
        UserEntity userEntity = userRepository.findByEmail(userEmail).orElse(null);
        if (userEntity == null) {
            throw new EntityNotFoundException("해당하는 사용자가 없습니다..");
        }
        password = passwordEncoder.encode(password);
        userEntity.setUserPassword(password);
        userRepository.save(userEntity);
        mailService.sendMailPasswordUpdate(userEmail, password);
    }

    public void validateUserCheckByEmailAndPassword(@Email String email, @NotNull String name) {
        UserEntity userEntity = userRepository.findByEmail(email).orElse(null);
        if (userEntity == null) {
            throw new EntityNotFoundException("해당하는 유저가 없습니다.");
        }
        if(!userEntity.getName().equals(name)) {
            throw new EntityNotFoundException("해당하는 유저가 없습니다.");
        }
        String temp = redisUtils.setPassword(email);
        mailService.sendMailValidation(userEntity.getEmail(), temp);
    }
}
