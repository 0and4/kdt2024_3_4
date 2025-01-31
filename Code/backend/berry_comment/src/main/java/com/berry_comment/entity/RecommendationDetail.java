package com.berry_comment.entity;

import jakarta.persistence.*;

@Entity
public class RecommendationDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @ManyToOne
    private Song song;

    @ManyToOne
    private Recommendation recommendation;

    public RecommendationDetail(Song song, Recommendation recommendation) {
        this.song = song;
        this.recommendation = recommendation;
    }
}
