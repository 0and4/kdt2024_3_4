package com.berry_comment.config.oauth;

import com.berry_comment.config.jwt.TokenProvider;
import com.berry_comment.entity.UserEntity;
import com.berry_comment.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.time.Duration;

@RequiredArgsConstructor
@Component
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final TokenProvider tokenProvider;
    private final UserRepository userRepository;

    //리프레시 토큰 유효시간
    public static final Duration REFRESH_TOKEN_TIMEOUT = ConstantValue.REFRESH_TOKEN_EXPIRE;

    //액세스 토큰 유효시간
    public static final Duration ACCESS_TOKEN_TIMEOUT = ConstantValue.ACCESS_TOKEN_EXPIRE;

    public static final String URI = "/user/login/oauth2/success";

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        System.out.println("인증에 성공하셨습니다.");
        //accessToken 및 refreshToken 발급
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        //만약 유저가 없다면 오류 발생시키기
        UserEntity user = userRepository.findByEmail(oAuth2User.getAttributes().get("email").toString()).orElseThrow(EntityNotFoundException::new);
        String accessToken = tokenProvider.generateToken(user, ACCESS_TOKEN_TIMEOUT);
        String refreshToken = tokenProvider.generateRefreshToken(user, REFRESH_TOKEN_TIMEOUT);
        request.getSession().setAttribute("access_token", accessToken);
        request.getSession().setAttribute("refresh_token", refreshToken);
        String uri = UriComponentsBuilder.fromUriString(URI).build().toString();
        System.out.println("리다이렉트 경로 "+ uri);
//        getRedirectStrategy().sendRedirect(request, response, uri);
        response.sendRedirect("http://localhost:3000/");
    }
}
