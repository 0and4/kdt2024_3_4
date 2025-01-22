package com.berry_comment.entity;

import jakarta.persistence.*;
import java.util.List;
@Entity
public class Song {
    @Id
    //곡 ID
    private Long id;

    @Column(nullable = false)
    //곡이름
    private String track;

    @Column(nullable = false)
    //아티스트
    private String artist;

    @Column(nullable = false)
    //음악 재생시간
    private int playTime;

    @OneToMany(mappedBy = "song")
    private List<PlayListDetail> playListSongInfoList;

    @ManyToOne
    @JoinColumn
    private Album album;
}
