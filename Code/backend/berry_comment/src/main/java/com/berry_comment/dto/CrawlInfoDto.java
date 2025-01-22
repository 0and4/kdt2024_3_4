package com.berry_comment.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class CrawlInfoDto {
    //곡 아이디
    private int songId;

    //곡 이름
    private String song;

    //아티스트
    private String artist;

    //앨범
    private String album;

    //이미지 url
    private String url;

    //랭킹
    private int rank;

}
