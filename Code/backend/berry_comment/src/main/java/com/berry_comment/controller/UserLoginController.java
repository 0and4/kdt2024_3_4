package com.berry_comment.controller;

import com.berry_comment.config.jwt.TokenProvider;
import com.berry_comment.config.oauth.ConstantValue;
import com.berry_comment.dto.EmailAndNameCheckDto;
import com.berry_comment.dto.EmailCheckDto;
import com.berry_comment.dto.JoinDto;
import com.berry_comment.dto.TokenResponseDto;
import com.berry_comment.entity.UserEntity;
import com.berry_comment.repository.UserRepository;
import com.berry_comment.service.MailService;
import com.berry_comment.service.RedisUtils;
import com.berry_comment.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.time.Duration;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserLoginController {
    private final MailService mailService;
    private final UserService userService;
    private final RedisUtils redisUtils;

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

    @GetMapping("/oauth/login")
    public void login(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String url = "http://localhost:8080/oauth2/authorization/google";
        response.sendRedirect(url);
    }

    @PostMapping("/join")
    public void join(@RequestBody JoinDto joinDto) {

    }

    @PostMapping("/check-email")
    public ResponseEntity<?> validDateUser(@RequestBody EmailCheckDto emailCheckDto){
        Boolean checked = mailService.checkEmail(emailCheckDto.getEmail(), emailCheckDto.getPassword());
        if (checked){
            //임시 비밀번호 발급
            String password = redisUtils.createTempPass();
            userService.updatePassword(emailCheckDto.getEmail(),password);
            return ResponseEntity.ok("");
        }
        else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @PostMapping("/validate")
    public ResponseEntity<?> validateUser(@RequestBody EmailAndNameCheckDto emailAndNameCheckDto){
        userService.validateUserCheckByEmailAndPassword(emailAndNameCheckDto.getEmail(), emailAndNameCheckDto.getName());
        return ResponseEntity.ok("");
    }


}
