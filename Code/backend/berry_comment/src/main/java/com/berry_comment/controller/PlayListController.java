package com.berry_comment.controller;

import com.berry_comment.dto.ListInfoDto;
import com.berry_comment.dto.PlayListDto;
import com.berry_comment.dto.RequestAddSongToPlayListDto;
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
@RequestMapping("/playList")
@RequiredArgsConstructor
public class PlayListController {
    private final PlayListService playListService;
    private final RecommendService recommendService;

    @PostMapping("/addSong")
    public ResponseEntity<?> addSongToPlayList(
            @RequestBody RequestAddSongToPlayListDto dataDto, Authentication authentication
            ) {
        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
        String userId = (String)principalDetails.getUser().getId();
        ResponseEntity<?> response = playListService.addSongToPlayList(dataDto, userId);
        return response;
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

    @GetMapping("/recommend-thumb")
    public ResponseEntity<?> recommendThumb(
            @PageableDefault(
                    page = 0,
                    size = 10,
                    sort = "id",
                    direction = Sort.Direction.ASC)
            Pageable pageable
    ){
        ListInfoDto listInfoDto = recommendService.getRecommendation(pageable);
        return ResponseEntity.ok(listInfoDto);
    }

    @GetMapping("/recommend-detail")
    public ResponseEntity<?> recommendDetail(
            @RequestParam(name = "id") int id,
            @PageableDefault(
                    page = 0,
                    size = 10,
                    sort = "id",
                    direction = Sort.Direction.ASC
            )
            Pageable pageable)
    {
        ListInfoDto listInfoDto = recommendService.getRecommendationDetail(id, pageable);
        return ResponseEntity.ok(listInfoDto);
    }

    //AI기반 플레이리스트 추가하기
    @PostMapping("/recommend-add")
    public ResponseEntity<?> recommendAddSongToPlayList(
            @RequestParam(name="id") int id,
            Authentication authentication
    ){
        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
        String userId = (String)principalDetails.getUser().getId();
        recommendService.addPlayListFromRecommendation(userId, id);
        return ResponseEntity.ok("");
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
