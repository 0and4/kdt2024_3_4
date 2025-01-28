package com.berry_comment.service;

import com.berry_comment.dto.PlayListDto;
import com.berry_comment.dto.RequestAddSongToPlayListDto;
import com.berry_comment.entity.PlayList;
import com.berry_comment.entity.PlayListDetail;
import com.berry_comment.entity.Song;
import com.berry_comment.entity.UserEntity;
import com.berry_comment.repository.PlayListDetailRepository;
import com.berry_comment.repository.PlayListRepository;
import com.berry_comment.repository.SongRepository;
import com.berry_comment.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestAttributes;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class PlayListService {
    public static final String MY_FAVOURITE_SONG = "내가 좋아하는 노래";
    private final PlayListRepository playListRepository;
    private final SongRepository songRepository;
    private final PlayListDetailRepository playListDetailRepository;
    private final UserRepository userRepository;

    public void createMyFavouriteSongList(UserEntity user) {
        PlayList playList = new PlayList(MY_FAVOURITE_SONG, user);
        playListRepository.save(playList);
    }

    public ResponseEntity<?> addSongToPlayList(RequestAddSongToPlayListDto dataDto, String userId) {
        dataDto.getPlaylistIds().forEach(playlistId -> {
            playListRepository.findById((long)playlistId).ifPresent(playList -> {
                Song song = songRepository.findById((long) dataDto.getSongId());
                //잘못된 곡을 요청하였다면..
                if(song == null) {
                    throw new EntityNotFoundException("요청하신 곡의 정보가 없습니다.");
                }
                PlayListDetail playListDetail = new PlayListDetail(song, playList);

                //해당 곡을 저장..
                playListDetailRepository.save(playListDetail);
            });
        });
        //여기까지 제대로 실행이 되었다면..
        Map<String, String> response = new HashMap<>();
        response.put("message", "저장이 제대로 되었습니다.");
        return ResponseEntity.ok(response);
    }

    public PlayListDto addPlayList(String userId, String playListName) {
        //유저를 가져오기
        UserEntity user = userRepository.findById(userId);
        PlayList playList = new PlayList(playListName, user);
        playListRepository.save(playList);
        PlayListDto playListDto = PlayListDto.builder()
                .id(playList.getId().intValue())
                .name(playListName)
                .build();
        return playListDto;
    }
}
