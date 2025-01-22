package com.berry_comment.entity;

import jakarta.persistence.*;
import java.util.List;
@Entity
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
}
