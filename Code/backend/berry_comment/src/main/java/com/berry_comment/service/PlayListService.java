package com.berry_comment.service;

import com.berry_comment.dto.*;
import com.berry_comment.entity.PlayList;
import com.berry_comment.entity.PlayListDetail;
import com.berry_comment.entity.Song;
import com.berry_comment.entity.UserEntity;
import com.berry_comment.repository.PlayListDetailRepository;
import com.berry_comment.repository.PlayListRepository;
import com.berry_comment.repository.SongRepository;
import com.berry_comment.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authorization.AuthorizationDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestAttributes;

import java.util.ArrayList;
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
    private final RecommendService recommendService;
    private final SongService songService;

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

    public ListInfoDto getPlayListThumbnail(Pageable pageable) {
        Slice<PlayList> playListSlice = playListRepository.findAll(pageable);
        List<PlayListDto> playListDtoList = new ArrayList<>();
        playListSlice.forEach(playList -> {
            PlayListDto playListDto = PlayListDto.builder()
                    .id(playList.getId().intValue())
                    .name(playList.getPlayListName())
                    .build();
            playListDtoList.add(playListDto);
        });
        return ListInfoDto.builder()
                .size(playListDtoList.size())
                .dataList(playListDtoList)
                .build();
    }

    public ListInfoDto getPlayList(Long id, String userId, Pageable pageable) {
        validate(id, userId);
        Slice<Long> integerSlice = playListDetailRepository.findSongIdByPlayListId(id, pageable);
        List<SongDto> songDtoList = new ArrayList<>();
        integerSlice.toList().forEach(playListDetail -> {
            songDtoList.add(songService.getSong(playListDetail));
        });
        return ListInfoDto.builder()
                .size(songDtoList.size())
                .dataList(songDtoList)
                .build();
    }

    private void validate(Long id, String userId) {
        PlayList playList = playListRepository.findById(id).orElse(null);
        if(playList == null) {
            throw new EntityNotFoundException("해당하는 플레이리스트의 정보를 찾을 수 없습니다.");
        }
        if(!userId.equals(playList.getUser().getId())) {
            throw new AuthorizationDeniedException("권한이 없습니다.");
        }
    }

    public RequestEditPlayListDto editTitle(Long playlistId, String title, String userId) {
        validate(playlistId, userId);
        PlayList playList = playListRepository.findById(playlistId).orElse(null);
        playList.setPlayListName(title);
        playListRepository.save(playList);
        return RequestEditPlayListDto.builder()
                .playlistId(playlistId)
                .title(title)
                .build();
    }

    public boolean deletePlayList(Long playlistId, String userId) {
        PlayList playList = playListRepository.findById(playlistId)
                .orElseThrow(() -> new IllegalArgumentException("플레이리스트를 찾을 수 없습니다."));

        if (!playList.getUser().getId().equals(userId)) {
            return false; // 권한이 없는 경우
        }

        playListRepository.delete(playList);
        return true;
    }

}
