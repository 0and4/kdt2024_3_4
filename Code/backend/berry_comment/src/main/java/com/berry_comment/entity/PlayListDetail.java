package com.berry_comment.entity;

import jakarta.persistence.*;

@Entity
public class PlayListDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "song_id")
    private Song song;

    @ManyToOne
    @JoinColumn(name = "play_list_id")
    private PlayList playList;

}
