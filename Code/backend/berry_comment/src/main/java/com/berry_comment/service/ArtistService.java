package com.berry_comment.service;

import com.berry_comment.dto.ArtistSearchAnswerDto;
import com.berry_comment.dto.ListInfoDto;
import com.berry_comment.entity.Artist;
import com.berry_comment.repository.ArtistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.ArrayList;
import java.util.Set;

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
}
