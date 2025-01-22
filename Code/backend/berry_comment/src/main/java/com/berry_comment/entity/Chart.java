package com.berry_comment.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;
@Entity
public class Chart {
    //차트 정보를 나타내는 데이터베이스...?
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column
    //생성된 차트날짜
    private LocalDateTime dateTime;

    @OneToMany(mappedBy = "chart")
    private List<ChartDetail> chartDetailList;
}
