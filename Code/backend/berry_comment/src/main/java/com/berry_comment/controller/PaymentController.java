package com.berry_comment.controller;

import com.berry_comment.dto.KaKaoReadyResponse;
import com.berry_comment.dto.KakaoApproveResponse;
import com.berry_comment.service.KaKaoPayService;
import com.berry_comment.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payment")
@RequiredArgsConstructor
public class PaymentController {
    private final KaKaoPayService kaKaoPayService;
    private final UserService userService;
    @GetMapping("/ready")
    public KaKaoReadyResponse readyToKakaoPay(
            Authentication authentication
    ){
        //유저 정보를 가져오기
        String userId = userService.getUserIdByAuthentication(authentication);

        return kaKaoPayService.kaKaoReady(userId);
    }

    //결제 성공
    @GetMapping("/success")
    public ResponseEntity<?> successToKakaoPay(
            @RequestParam("pg_token") String pgToken
    ){
        KakaoApproveResponse kakaoApproveResponse = kaKaoPayService.approveResponse(pgToken);
        return ResponseEntity.ok(kakaoApproveResponse);
    }

    /**
     * 결제 진행 중 취소
     */
    @GetMapping("/cancel")
    public void cancel() {

        throw new RuntimeException("오류 발생");
    }

    /**
     * 결제실패
     */

    @GetMapping("/fail")
    public void fail() {

        throw new RuntimeException("오류 발생");
    }
}
