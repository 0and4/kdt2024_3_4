package com.berry_comment.service;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Slf4j
@Service
//smtp 메일 보내기
@RequiredArgsConstructor
public class MailService {
    private final JavaMailSender mailSender;

    private final RedisUtils redisUtils;
    public void sendMailJoinSuccess(String email){
        SimpleMailMessage message = new SimpleMailMessage();
        try {
            message.setTo(email);
            message.setSubject("베리 코멘트");
            message.setText("회원가입을 축하드립니다.");
            mailSender.send(message);
            log.info("메일 발송 성공!");
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public void sendMailPasswordUpdate(String email, String password){
        SimpleMailMessage message = new SimpleMailMessage();
        try {
            message.setTo(email);
            message.setSubject("비밀번호 변경안내");
            message.setText("새로 갱신된 비밀번호는 " + password + "입니다.");
            mailSender.send(message);
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    public void sendMailValidation(String email, String password){
        SimpleMailMessage message = new SimpleMailMessage();
        try {
            message.setTo(email);
            message.setSubject("인증 번호 안내");
            message.setText("인증 번호는 " + password+"입니다.");
            mailSender.send(message);
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    public Boolean checkEmail(@Email String email, @NotEmpty String password) {
        String validatePass = (String) redisUtils.getData(email);
        if (validatePass.equals(password)) {
            redisUtils.delData(email);
            return true;
        }
        return false;
    }
}
