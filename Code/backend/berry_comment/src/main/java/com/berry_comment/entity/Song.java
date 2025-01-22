package com.berry_comment.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
@Entity
@Getter
@NoArgsConstructor
public class Song {
    @Id
    //곡 ID
    private Long id;

    @Column(nullable = false)
    //곡이름
    private String track;

    @Column(nullable = false)
    //음악 재생시간
    private int playTime;

    @OneToMany(mappedBy = "song")
    private List<PlayListDetail> playListSongInfoList;

    @ManyToOne
    @JoinColumn
    private Album album;

    public Song(Long id, String track, int playTime) {
        this.id = id;
        this.track = track;
        this.playTime = playTime;
    }

    public void setAlbum(Album album) {
        this.album = album;
    }
}
