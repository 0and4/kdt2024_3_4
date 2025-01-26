package com.berry_comment.service;

import com.berry_comment.dto.AlbumDto;
import com.berry_comment.dto.ListInfoDto;
import com.berry_comment.entity.Album;
import com.berry_comment.entity.Artist;
import com.berry_comment.repository.AlbumRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;
import java.util.List;

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
}
