package com.berry_comment.controller;

import com.berry_comment.config.jwt.TokenProvider;
import com.berry_comment.config.oauth.ConstantValue;
import com.berry_comment.dto.TokenResponseDto;
import com.berry_comment.entity.UserEntity;
import com.berry_comment.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserLoginController {
    //Oauth 로그인시 다시 리다이렉트 되는 경로입니다....
    //구현하기 개빡세네
    //왜 되는지는 모르겠는데 일단 둡시다..
    @GetMapping("/login/oauth2/success")
    public ResponseEntity<TokenResponseDto> oauth2Success(HttpServletRequest request) {
        TokenResponseDto tokenResponseDto = new TokenResponseDto();
        tokenResponseDto.setAccessToken(request.getSession().getAttribute("access_token").toString());
        tokenResponseDto.setRefreshToken(request.getSession().getAttribute("refresh_token").toString());
        return ResponseEntity.ok().body(tokenResponseDto);
    }

    @GetMapping("/user/profile")
    public ResponseEntity<String> getUserInfo(){
        return ResponseEntity.ok("This is the user profile");
    }
}
