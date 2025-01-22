package com.berry_comment.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class RefreshTokenEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @JoinColumn
    @OneToOne
    private UserEntity user;

    @Column(nullable = false)
    private String refreshToken;

    public RefreshTokenEntity update(String newRefreshToken) {
        this.refreshToken = newRefreshToken;
        return this;
    }

    public RefreshTokenEntity(String refreshToken) {
        this.refreshToken = refreshToken;
    }
}
