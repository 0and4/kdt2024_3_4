package com.berry_comment.service;

import com.berry_comment.dto.AlbumDto;
import com.berry_comment.dto.ListInfoDto;
import com.berry_comment.entity.Album;
import com.berry_comment.entity.Artist;
import com.berry_comment.repository.AlbumRepository;
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

import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class AlbumService {
    private final AlbumRepository albumRepository;
    public ListInfoDto getAlbumListByName(String albumName, Pageable pageable) {
        Slice<Album> albumSlice = albumRepository.findByNameContaining(albumName, pageable);
        ListInfoDto listInfoDto = new ListInfoDto();
        //배열에 들어갈 타입 지정
        //AlbumDto이다.
        ArrayList<AlbumDto> albumDtos = new ArrayList<>();
        listInfoDto.setDataList(albumDtos);
        listInfoDto.setSize(albumSlice.getNumberOfElements());
        albumSlice.getContent().forEach(album -> {

            Set<String> artists = new HashSet<>();
            album.getSongList().forEach(song -> {
                song.getSongOfArtistList().forEach(artist -> {
                    artists.add(artist.getArtist().getName());
                });
            });

            StringBuilder stringBuilder = new StringBuilder();
            List<String> artistList = artists.stream().toList();
            for(int i = 0; i< artistList.size(); i++){
                if(i != 0){
                    stringBuilder.append(", ");
                }
                stringBuilder.append(artistList.get(i));
            }

            AlbumDto albumDto = AlbumDto.builder()
                    .id(album.getId().intValue())
                    .name(album.getName())
                    .url(album.getImageUrl())
                    .artist(stringBuilder.toString())
                    .build();
            albumDtos.add(albumDto);
        });

        return listInfoDto;
    }

    @Transactional
    public Album saveAlbumById(int albumId){
        Optional<Album> returnValue = albumRepository.findById((long) albumId);
        if(returnValue.isPresent()){
            return returnValue.get();
        }
        String url = "https://www.melon.com/album/detail.htm?albumId=" + albumId;
        try {
            Document document = Jsoup.connect(url).userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36").get();
            Element tBodyElement = document.getElementsByTag("tbody").first();
            Elements tBodyElements = tBodyElement.getElementsByTag("tr");

            tBodyElements.stream().forEach(element -> {
                Element songElementTd = element.getElementsByTag("td").get(3);
                String href = songElementTd.selectFirst("a").attr("href");
                Pattern pattern = Pattern.compile("\\d+"); // 숫자(0~9)를 추출
                Matcher matcher = pattern.matcher(href);
                int cnt = 0;
                while (matcher.find()) {
                    cnt++;
                    if(cnt == 2){
                        String number = matcher.group();
                        System.out.println("추출된 숫자: " + number);
                        //음악 저장 진행...로직 짜기!!
//                      songService.saveSongById(Integer.parseInt(number));
                    }
                }
            });
            String albumName = document.selectXpath("//*[@id=\"conts\"]/div[2]/div/div[2]/div[1]/div[1]").first().ownText();
            String albumImageUrl = document.getElementById("d_album_org").selectFirst("img").attr("src");
            Album newAlbum = new Album((long)albumId, albumName, albumImageUrl);
            albumRepository.save(newAlbum);
            return newAlbum;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
