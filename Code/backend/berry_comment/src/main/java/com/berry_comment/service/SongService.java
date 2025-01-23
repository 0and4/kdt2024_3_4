package com.berry_comment.service;

import com.berry_comment.dto.ListInfoDto;
import com.berry_comment.dto.SongChartDto;
import com.berry_comment.dto.SongDto;
import com.berry_comment.entity.Song;
import com.berry_comment.repository.SongRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SongService {
    private final SongRepository songRepository;

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
}
