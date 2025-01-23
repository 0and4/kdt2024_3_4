package com.berry_comment.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
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
    @JoinColumn(name = "album_id")
    private Album album;

    @OneToMany(mappedBy = "song", orphanRemoval = true)
    private List<SongOfArtist> songOfArtistList;

    public Song(Long id, String track, int playTime, Album album) {
        this.id = id;
        this.track = track;
        this.playTime = playTime;
        this.album = album;
    }
}
