package com.berry_comment.service;

import com.berry_comment.dto.ArtistSearchAnswerDto;
import com.berry_comment.dto.ListInfoDto;
import com.berry_comment.entity.Artist;
import com.berry_comment.repository.ArtistRepository;
import lombok.RequiredArgsConstructor;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
public class ArtistService {
    private final ArtistRepository artistRepository;

    public ListInfoDto getInformationArtistByName(String artistName, Pageable pageable) {
        ListInfoDto listInfoDto = new ListInfoDto();
        Slice<Artist> artists = artistRepository.findByNameContaining(artistName, pageable);
        List<ArtistSearchAnswerDto> answerDtoList = new ArrayList<>();
        listInfoDto.setDataList(answerDtoList);
        listInfoDto.setSize(artists.getNumberOfElements());
        artists.forEach(artist -> {
            System.out.println(artist.toString());
            Set<String> genreSet = new HashSet<>();
            artist.getSongs().forEach(song -> {
               String value = song.getSong().getGenre();
               genreSet.add(value);
            });
            ArtistSearchAnswerDto artistSearchAnswerDto = ArtistSearchAnswerDto.builder()
                    .id(artist.getId().intValue())
                    .name(artist.getName())
                    .genre(genreSet.stream().toList())
                    .image(artist.getImage())
                    .build();
            answerDtoList.add(artistSearchAnswerDto);
        });
        return listInfoDto;
    }

    @Transactional
    public Artist saveArtistByIdAndName(int id) {
        //만약 아티스트가 존재한다면
        Optional<Artist> artist = artistRepository.findById((long)id);
        if(!artist.isPresent()){

            String url = "https://www.melon.com/artist/timeline.htm?artistId=" + id;
            try {
                Document document = Jsoup.connect(url).userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36").get();
                String imageUrl = document.getElementById("artistImgArea").attr("src");
                String artistName = document.selectFirst("p.title_atist").ownText();
                Artist newArtist = new Artist((long)id, artistName, imageUrl);
                artistRepository.save(newArtist);
                return newArtist;
            }catch (Exception e){
                e.printStackTrace();
            }
        }
        else {
            return artist.get();
        }
        return null;
    }
}
