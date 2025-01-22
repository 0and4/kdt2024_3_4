package com.berry_comment.entity;

import jakarta.persistence.*;
import lombok.NoArgsConstructor;

import java.util.List;
@Entity
@NoArgsConstructor
public class Album {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    //대표 이미지
    @Column(nullable = false)
    private String imageUrl;

    //앨범 이름
    @Column(nullable = false)
    private String name;

    //아티스트
    @ManyToOne
    @JoinColumn
    private Artist artist;

    //음악
    @OneToMany(mappedBy = "album")
    private List<Song> songList;

    public Album(String imageUrl, String name) {
        this.imageUrl = imageUrl;
        this.name = name;
    }

    public void setArtist(Artist artist) {
        this.artist = artist;
    }
}
