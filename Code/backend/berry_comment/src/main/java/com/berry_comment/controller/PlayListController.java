package com.berry_comment.controller;

import com.berry_comment.dto.PlayListDto;
import com.berry_comment.dto.RequestAddSongToPlayListDto;
import com.berry_comment.entity.Song;
import com.berry_comment.service.PlayListService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.berry_comment.oauth.PrincipalDetails;
import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

@Service
@RestController
@RequestMapping("/playList")
@RequiredArgsConstructor
public class PlayListController {
    private final PlayListService playListService;
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
}
