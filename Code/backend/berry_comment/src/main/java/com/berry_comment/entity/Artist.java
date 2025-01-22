package com.berry_comment.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
@Entity
@NoArgsConstructor
@Getter
public class Artist {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    //아티스트 이름
    @Column(nullable = false)
    private String name;

    @OneToMany(mappedBy = "artist")
    private List<Album> albumList;

    public Artist(String name) {
        this.name = name;
    }
}
