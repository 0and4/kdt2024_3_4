package com.berry_comment.service;

import com.berry_comment.dto.RequestAddSongToPlayListDto;
import com.berry_comment.entity.PlayList;
import com.berry_comment.entity.UserEntity;
import com.berry_comment.repository.PlayListRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestAttributes;
import java.util.List;
@Service
@RequiredArgsConstructor
public class PlayListService {
    public static final String MY_FAVOURITE_SONG = "내가 좋아하는 노래";
    private final PlayListRepository playListRepository;
    public void createMyFavouriteSongList(UserEntity user) {
        PlayList playList = new PlayList(MY_FAVOURITE_SONG, user);
        playListRepository.save(playList);
    }

    public void addSongToPlayList(RequestAddSongToPlayListDto dataDto, String userId) {
        dataDto.getPlaylistIds().forEach(playlistId -> {
            playListRepository.findById((long)playlistId).ifPresent(playList -> {
                
            });
        });
    }
}
