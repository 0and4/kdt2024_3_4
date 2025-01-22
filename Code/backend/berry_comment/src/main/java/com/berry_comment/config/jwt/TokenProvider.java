package com.berry_comment.config.jwt;

import com.berry_comment.entity.RefreshTokenEntity;
import com.berry_comment.entity.UserEntity;
import com.berry_comment.repository.RefreshTokenRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Header;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Date;

@RequiredArgsConstructor
@Service
public class TokenProvider {
    private final JwtProperties jwtProperties;
    private final RefreshTokenRepository refreshTokenRepository;
    //토큰 반환
    public String generateToken(UserEntity userEntity, Duration expiration) {
        Date now = new Date();
        return makeToken(new Date( now.getTime() + expiration.toMillis() ), userEntity);
    }

    private String makeToken(Date date, UserEntity userEntity) {
        return Jwts.builder()
                .setHeaderParam(Header.TYPE, Header.JWT_TYPE)
                .setIssuer(jwtProperties.getIssuer())
                .setIssuedAt(date)
                .claim("id", userEntity.getId())
                .signWith(SignatureAlgorithm.HS256, jwtProperties.getSecretKey())
                .compact();
    }

    //리프레시 토큰 만드는 함수
    public String generateRefreshToken(UserEntity user, Duration expiration) {
        RefreshTokenEntity refreshToken = refreshTokenRepository.findByUser(user).orElseThrow(EntityNotFoundException::new);
        Date now = new Date();
        String refreshTokenString = refreshToken.getRefreshToken();

        //만약 리프레시 토큰이 유효하다면
        if(validate(refreshTokenString)) {
            return refreshTokenString;
        }
        //만약 리프레시 토큰이 유효하지 않다면
        else {
            refreshTokenString = makeToken(new Date( now.getTime() + expiration.toMillis() ), user);
            return refreshTokenString;
        }
    }

    public boolean validate(String token) {
        try {
            Jwts
                    .parser()
                    .setSigningKey(jwtProperties.getSecretKey())
                    .parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public Claims getClaims(String token) {
            return Jwts.parser()
                    .setSigningKey(jwtProperties.getSecretKey())
                    .parseClaimsJws(token)
                    .getBody();

    }
}
