package com.berry_comment.controller;

import com.berry_comment.dto.ListInfoDto;
import com.berry_comment.dto.PlayListDto;
import com.berry_comment.dto.RequestAddSongToPlayListDto;
import com.berry_comment.dto.RequestEditPlayListDto;
import com.berry_comment.entity.Song;
import com.berry_comment.service.AlbumService;
import com.berry_comment.service.PlayListService;
import com.berry_comment.service.RecommendService;
import lombok.RequiredArgsConstructor;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;
import com.berry_comment.oauth.PrincipalDetails;
import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/playList/normal")
@RequiredArgsConstructor
public class PlayListController {
    private final PlayListService playListService;

    @PostMapping("/addSong")
    public ResponseEntity<?> addSongToPlayList(
            @RequestBody RequestAddSongToPlayListDto dataDto, Authentication authentication
            ) {
        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
        String userId = (String)principalDetails.getUser().getId();
        return playListService.addSongToPlayList(dataDto, userId);
    }

    @PatchMapping("/edit")
    public ResponseEntity<?> editPlayList(
            @RequestBody RequestEditPlayListDto requestEditPlayListDto,
            Authentication authentication
    ){
        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
        String userId = (String)principalDetails.getUser().getId();
        System.out.println("유저 아이디"+userId);
        System.out.println("유저 아이디"+requestEditPlayListDto.getPlaylistId());
        RequestEditPlayListDto responseDto = playListService.editTitle(requestEditPlayListDto.getPlaylistId(), requestEditPlayListDto.getTitle(), userId);
        return ResponseEntity.ok(responseDto);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createPlayList(
            Authentication authentication,
            //플레이리스트 이름 인자값 필요함
            @RequestBody String playListName){
        if(playListName == null || playListName.isEmpty()){
            Map<String, String> response = new HashMap<>();
            response.put("message", "잘못된 요청입니다.");
            return ResponseEntity.badRequest().body(response);
        }
        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
        String userId = (String)principalDetails.getUser().getId();
        PlayListDto playListDto = playListService.addPlayList(userId, playListName);
        return ResponseEntity.ok(playListDto);
    }


    @GetMapping("/my-thumb")
    public ResponseEntity<?> myThumb(
            @PageableDefault(
                    page = 0,
                    size = 5,
                    sort = "id",
                    direction = Sort.Direction.ASC
            )
            Pageable pageable
    ){
        ListInfoDto listInfoDto = playListService.getPlayListThumbnail(pageable);
        return ResponseEntity.ok(listInfoDto);
    }

    @GetMapping("/my-detail")
    public ResponseEntity<?> myList(
            @RequestParam(name="id") Long id,
            @PageableDefault(
                    page = 0,
                    size = 5,
                    sort = "id",
                    direction = Sort.Direction.ASC
            )
            Pageable pageable,
            Authentication authentication
    ){
        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
        String userId = (String)principalDetails.getUser().getId();
        ListInfoDto listInfoDto = playListService.getPlayList(id, userId, pageable);
        return ResponseEntity.ok(listInfoDto);
    }
}
