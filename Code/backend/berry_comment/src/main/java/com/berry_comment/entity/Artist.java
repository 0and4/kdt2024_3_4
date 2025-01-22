package com.berry_comment.entity;

import jakarta.persistence.*;
import java.util.List;
@Entity
public class Artist {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    //아티스트 이름
    @Column(nullable = false)
    private String name;

    @OneToMany(mappedBy = "artist")
    private List<Album> albumList;
}
