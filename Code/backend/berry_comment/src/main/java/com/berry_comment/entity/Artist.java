package com.berry_comment.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;
@Entity
@NoArgsConstructor
@Getter
//테스트 배포때 지울것
@ToString
public class Artist {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    //아티스트 이름
    @Column(nullable = false)
    private String name;

    @OneToMany(mappedBy = "artist")
    private List<SongOfArtist> Songs;

    //아티스트 대표 이미지
    @Column(nullable = false)
    private String image;

    public Artist(String name, String image) {
        this.name = name;
        this.image = image;
    }
}
