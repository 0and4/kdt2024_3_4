package com.berry_comment.repository;

import com.berry_comment.entity.Chart;
import com.berry_comment.entity.ChartDetail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;

public interface ChartRepository extends JpaRepository<Chart, Long> {
    //시간 기준으로 값 입력받기
    Chart findByDateTime(LocalDateTime date);
}
