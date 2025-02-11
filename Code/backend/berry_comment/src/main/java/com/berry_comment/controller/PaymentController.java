package com.berry_comment.controller;

import com.berry_comment.dto.KaKaoReadyResponse;
import com.berry_comment.dto.KakaoApproveResponse;
import com.berry_comment.entity.Payment;
import com.berry_comment.entity.UserEntity;
import com.berry_comment.repository.PaymentRepository;
import com.berry_comment.repository.UserRepository;
import com.berry_comment.service.KaKaoPayService;
import com.berry_comment.service.UserService;
import com.berry_comment.type.RoleUser;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/payment")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3030")
public class PaymentController {
    private final KaKaoPayService kaKaoPayService;
    private final UserService userService;
    private final PaymentRepository paymentRepository;
    private final UserRepository userRepository;
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
        // ✅ tid를 프론트로 넘겨서 저장하도록 수정
        String redirectUrl = "http://localhost:3030/mypage?tid=" + kakaoApproveResponse.getTid();
        return ResponseEntity.status(302).header("Location", redirectUrl).build();
//        return ResponseEntity.ok(kakaoApproveResponse);
    }

    /**
     * 결제 진행 중 취소
     */
    @GetMapping("/cancel")
    public ResponseEntity<Void> cancel() {
//        throw new RuntimeException("오류 발생");
        // 결제 취소 시 /mypage로 리디렉션하며 alert을 표시
        String redirectUrl = "http://localhost:3030/mypage";
        return ResponseEntity.status(302).header("Location", redirectUrl).build();
    }

    /**
     * 결제실패
     */

    @GetMapping("/fail")
    public ResponseEntity<Void> fail() {
//        throw new RuntimeException("오류 발생");
        // 결제 실패 시 /mypage로 리디렉션하며 alert을 표시
        String redirectUrl = "http://localhost:3030/mypage";
        return ResponseEntity.status(302).header("Location", redirectUrl).build();
    }

    @PostMapping("/cancel-subscription/{tid}")
    public ResponseEntity<?> cancelSubscription(
            @PathVariable String tid,
            Authentication authentication
    ) {
        String userId = userService.getUserIdByAuthentication(authentication);
        UserEntity user = userService.getUserById(userId);

        // 해당 tid를 가진 결제 내역을 찾기
        Optional<Payment> paymentOptional = paymentRepository.findById(tid);

        if (paymentOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("결제 정보를 찾을 수 없습니다.");
        }

        Payment payment = paymentOptional.get();

        // 결제한 유저와 현재 유저가 동일한지 확인
        if (!payment.getUser().getId().equals(user.getId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("해당 결제를 취소할 권한이 없습니다.");
        }

        // 결제 정보 삭제
        paymentRepository.delete(payment);

        // 유저 권한을 NORMAL로 변경
        user.setRoleUser(RoleUser.NORMAL);
        userRepository.save(user);

        return ResponseEntity.ok("구독이 성공적으로 해지되었습니다.");
    }

}
