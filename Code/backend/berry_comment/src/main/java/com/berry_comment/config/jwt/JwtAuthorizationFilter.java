package com.berry_comment.config.jwt;

import com.berry_comment.entity.UserEntity;
import com.berry_comment.oauth.PrincipalDetails;
import com.berry_comment.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import java.io.IOException;
import java.util.ArrayList;

public class JwtAuthorizationFilter extends BasicAuthenticationFilter {
    private final UserRepository userRepository;
    private final TokenProvider tokenProvider;

    //필터를 무시하는 url들
    private ArrayList<String> excludedUrls;

    public JwtAuthorizationFilter(AuthenticationManager authenticationManager, UserRepository userRepository, TokenProvider tokenProvider) {
        super(authenticationManager);
        this.userRepository = userRepository;
        this.tokenProvider = tokenProvider;
        excludedUrls = new ArrayList<>();
        //허용되는 url 얘는 토큰이 필요없어요~~
        excludedUrls.add("/login");
        excludedUrls.add("/favicon.ico");
        excludedUrls.add("/h2-console");

        //결제 관련 리다이렉트 하는 곳..
        excludedUrls.add("/payment/success");
        excludedUrls.add("/payment/fail");
        excludedUrls.add("/payment/cancel");
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        //Authorization 헤더를 찾기
        System.out.println("필터 함수 실행..");
        System.out.println(request.getRequestURL());

        if(excludedUrls.stream().anyMatch(request.getRequestURL().toString()::contains)) {
            System.out.println("인증이 필요없는 경로입니다.");
            chain.doFilter(request, response);
            return;
        }
        String authorizationHeader = request.getHeader("Authorization");
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            chain.doFilter(request, response);

        }
        System.out.println("header: " + authorizationHeader);
        //token을 가져옵니다.
        String token = authorizationHeader.replace("Bearer ", "");
        System.out.println("token: " + token);
        //토큰 유효성검사
        if(!tokenProvider.validate(token)) {
            //토큰이 유효하지가 않음
            throw new ServletException("token is invalid");
        }
        //토큰에서 유저아이디를 가져옵니다..
        String userId = tokenProvider.getClaims(token).get("id").toString();
        if(userId != null) {
            UserEntity user = userRepository.findById(userId);
            //만약 유저가 널값이라면
            if(user == null) {
                throw new EntityNotFoundException("유저가 없습니다.");
            }
            PrincipalDetails principalDetails = new PrincipalDetails(user);
            Authentication authentication = new UsernamePasswordAuthenticationToken(
                    principalDetails,
                    null,
                    principalDetails.getAuthorities()
            );
            
            //유저 아이디가 널일때 예외처리가 필요함
            
            //강제로 시큐어리티 세션에 접근하여 값을 저장
            SecurityContextHolder.getContext().setAuthentication(authentication);
            System.out.println("토큰 필터 제대로 적용... 사용자확인함..");
        }
        chain.doFilter(request, response);
    }
}
