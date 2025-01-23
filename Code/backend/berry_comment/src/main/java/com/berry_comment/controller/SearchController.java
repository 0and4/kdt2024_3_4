package com.berry_comment.controller;

import com.berry_comment.dto.ListInfoDto;
import com.berry_comment.dto.SongChartDto;
import com.berry_comment.service.ChartService;
import com.berry_comment.service.SongService;
import com.berry_comment.type.SearchType;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@RequiredArgsConstructor
@RequestMapping("/search")
public class SearchController {
    private final SongService songService;
    private final ChartService chartService;
    @GetMapping("/chart")
    public ResponseEntity<?> getChartList(
            @PageableDefault(
                    page = 0,
                    size = 10,
                    sort = "rank",
                    direction = Sort.Direction.ASC)
            Pageable pageable,
            @RequestParam(required = false,name = "dateTime")
            @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
            LocalDateTime localDateTime
    ) {
        SongChartDto songChartDto = chartService.getSongChartDtoList(localDateTime, pageable);

        return ResponseEntity.ok(songChartDto);
    }

    //키워드 검색(곡명, 앨범명)
    //값 (=value)
    @GetMapping("/")
    public ResponseEntity<?> getDetail(
            @RequestParam(name = "keyword") SearchType searchType,
            @RequestParam(name = "value") String value,
            @PageableDefault(
                    page = 0,
                    size = 4
            )Pageable pageable
    ){
        ListInfoDto listInfoDto;
        switch (searchType){
            //곡명일경우
            case SearchType.SONG:
                listInfoDto = songService.getSongList(value,pageable);
                break;
            //앨범일경우 작성하기
            default:
                return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(listInfoDto);
    }
}
