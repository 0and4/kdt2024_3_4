package com.berry_comment.service;

import com.berry_comment.dto.ListInfoDto;
import com.berry_comment.dto.SongChartDto;
import com.berry_comment.dto.SongDto;
import com.berry_comment.entity.Album;
import com.berry_comment.entity.Song;
import com.berry_comment.repository.AlbumRepository;
import com.berry_comment.repository.SongRepository;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.RequiredArgsConstructor;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class SongService {
    private final SongRepository songRepository;
    private final AlbumService albumService;
    private final LastFmService lastFmService;
    private final AlbumRepository albumRepository;

    //곡이름으로 검색한 결과
    public ListInfoDto getSongList(String track, Pageable pageable) {
        //키워드별 검색 음악 목록 가져오기
        Slice<Song> songSlice = songRepository.findByTrackContaining(track, pageable);
        List<SongDto> songDtos = new ArrayList<>();
        for (Song song : songSlice) {
            StringBuilder artist = new StringBuilder();
            for (int i = 0; i < song.getSongOfArtistList().size(); i++) {
                if (i != 0) {
                    artist.append(", ");
                }
                artist.append(song.getSongOfArtistList().get(i).getArtist().getName());
            }
            SongDto songDto = SongDto.builder()
                    .id(song.getId().intValue())
                    .track(song.getTrack())
                    .image(song.getAlbum().getImageUrl())
                    .artist(artist.toString())
                    .playTime(song.getPlayTime())
                    .build();
            songDtos.add(songDto);
        }
        return ListInfoDto.builder()
                .size(songDtos.size())
                .dataList(songDtos)
                .build();
    }

    public Song saveSongById(int songId) {
        Song song = songRepository.findById((long) songId);
        if(song != null){
            return song;
        }
        String url = "https://www.melon.com/song/detail.htm?songId=" + songId;
        try {
            Document document = Jsoup.connect(url).userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36").get();
            String track = document.selectXpath("//*[@id=\"downloadfrm\"]/div/div/div[2]/div[1]/div[1]").first().ownText();
            int playTime = 0;
            int albumId = 0;
            String genre;
            String musicUrl = "";
            String lyric = "";
            //앨범 아이디 가져오기
            Element albumIdElement = document.selectXpath("//*[@id=\"downloadfrm\"]/div/div/div[2]/div[2]/dl/dd[1]/a").first();
            String href = albumIdElement.selectFirst("a").attr("href");
            Pattern pattern = Pattern.compile("\\d+"); // 숫자(0~9)를 추출
            Matcher matcher = pattern.matcher(href);
            if (matcher.find()) {
                albumId = Integer.parseInt(matcher.group(1));
            }

            Album album = albumRepository.findById((long)albumId).get();
            Elements elements = document.getElementsByTag("dd");
            genre = elements.get(2).text();
            System.out.println("장르 "+ genre);
            Element artistNameElement = document.selectXpath("//*[@id=\"downloadfrm\"]/div/div/div[2]/div[1]/div[2]").first();
            Elements artistLinks = artistNameElement.select("a.artist_name");
            for (Element artistLink : artistLinks) {
                JsonNode jsonNode = lastFmService.getSongPlayTime(track, artistLink.attr("title"));
                if(jsonNode.has("error")){
                    continue;
                }
                playTime = jsonNode.get("track").get("duration").asInt();
                musicUrl = getSongUrl(jsonNode.get("track").get("url").asText());
            }
            //가사 가져오기
            lyric = document.getElementById("d_video_summary").text();
            song = new Song((long)songId, track, playTime, album, genre, musicUrl, lyric);
            songRepository.save(song);
        }catch (Exception e) {
        }
        return song;
    }

    private String getSongUrl(String url) {
        String youtubeUrl = "";
        try {
            Document document = Jsoup.connect(url).userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36").get();
            Element link = document.selectFirst("a.image-overlay-playlink-link");
            if (link != null) {
                String href = link.attr("href");
                youtubeUrl = href;
            } else {
                youtubeUrl = "";
            }
        } catch (IOException e) {
            return "";
        }
        return youtubeUrl;
    }

}
