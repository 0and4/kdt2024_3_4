package com.berry_comment.entity;

import jakarta.persistence.*;

@Entity
public class ChartDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "chart_id")
    private Chart chart;

    @ManyToOne
    @JoinColumn(name = "song_id")
    private Song song;

    @Column(nullable = false)
    private int rank;

    public ChartDetail(Chart chart,Song song, int rank) {
        this.chart = chart;
        this.song = song;
        this.rank = rank;
    }
}
