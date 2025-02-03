package com.berry_comment.entity;

import com.berry_comment.type.RoleUser;
import com.berry_comment.type.TypeUser;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
@Table(name = "user_entity")
public class UserEntity {
    @Id
    @Column(unique = true, nullable = false)
    //사용자 Id
    private String id;

    @Column(nullable = false)
    //사용자 이름
    private String name;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, unique = true)
    //사용자 이메일
    private String email;

    @Column(nullable = false)
    //사용자 닉네임
    private String nickname;

    @Column(nullable = false)
    //구독 여부 확인
    @Enumerated(value = EnumType.STRING)
    private RoleUser roleUser;
    
    @Column(nullable = false)
    @Enumerated(value = EnumType.STRING)
    //oauth2유저인지 일반유저인지 확인
    private TypeUser typeUser;

    @OneToOne(mappedBy = "user")
    private RefreshTokenEntity refreshToken;

    //플레이리스트 관련
    @OneToMany(mappedBy = "user",orphanRemoval = true)
    private List<PlayList> playList;

    //결제관련
    @OneToMany(mappedBy = "user")
    private List<Payment> paymentList;

    @Builder
    public UserEntity(String id, String name, String password, String email, String nickname , RoleUser roleUser, TypeUser typeUser) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.email = email;
        this.nickname = nickname;
        this.roleUser = roleUser;
        this.typeUser = typeUser;
    }

    public void setRoleUser(RoleUser roleUser) {
        this.roleUser = roleUser;
    }

    public void setUserPassword(String password) {
        this.password = password;
    }
}
