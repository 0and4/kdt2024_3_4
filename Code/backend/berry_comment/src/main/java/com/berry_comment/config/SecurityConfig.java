package com.berry_comment.config;

import com.berry_comment.config.jwt.JwtAuthorizationFilter;
import com.berry_comment.config.jwt.TokenProvider;
import com.berry_comment.config.oauth.OAuth2SuccessHandler;
import com.berry_comment.config.oauth.PrincipalOauthUserService;
import com.berry_comment.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.header.writers.frameoptions.XFrameOptionsHeaderWriter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final PrincipalOauthUserService principalOauthUserService;
    private final OAuth2SuccessHandler oAuth2SuccessHandler;
    private final CorsConfig corsConfig;
    private final UserRepository userRepository;
    private final TokenProvider tokenProvider;
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, AuthenticationManager authenticationManager) throws Exception {
        http
                // CORS 비활성화
                .cors(AbstractHttpConfigurer::disable)
                .formLogin(AbstractHttpConfigurer::disable);

        http
                .csrf((crsf)-> crsf.ignoringRequestMatchers(new AntPathRequestMatcher("/h2-console/**")));

        http
                .authorizeHttpRequests(authorizeRequests -> authorizeRequests
                        .requestMatchers("/user/**").permitAll()// 로그인 API 허용
                        .requestMatchers("/h2-console/**").permitAll()// H2 콘솔 요청 허용
                        .requestMatchers("/song/chart/**").hasAuthority("NORMAL")
                        .requestMatchers("/stream/**").hasAuthority("NORMAL")
                        .requestMatchers("/playList/**").hasAuthority("PREMIUM")
                        .anyRequest().permitAll() // 나머지 요청은 인증 필요X

                );

        //커스텀 필터 적용
        http
                .addFilter(corsConfig.corsFilter());
        http
                .addFilter(new JwtAuthorizationFilter(authenticationManager, userRepository, tokenProvider));
        // 세션 사용 X
        http
                .sessionManagement(httpSecuritySessionManagementConfigurer ->
                        httpSecuritySessionManagementConfigurer.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        http
                .csrf(AbstractHttpConfigurer::disable);
        // OAuth2 설정
        http
                .oauth2Login(httpSecurityOAuth2LoginConfigurer -> httpSecurityOAuth2LoginConfigurer
                        .userInfoEndpoint(userInfoEndpointConfig ->
                                userInfoEndpointConfig
                                        .userService(principalOauthUserService)
                        )
                        .successHandler(oAuth2SuccessHandler)
                );

        // H2 콘솔을 위한 CSP 설정
        http
                .headers(headers -> headers
                        .addHeaderWriter(new XFrameOptionsHeaderWriter(
                                XFrameOptionsHeaderWriter.XFrameOptionsMode.SAMEORIGIN
                        ))
                );

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

}
