package com.berry_comment.controller;

import com.berry_comment.dto.RequestAddSongToPlayListDto;
import com.berry_comment.entity.Song;
import com.berry_comment.service.PlayListService;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.berry_comment.oauth.PrincipalDetails;
import java.security.Principal;

@Service
@RestController
@RequestMapping("/playList")
public class PlayListController {
    private PlayListService playListService;
    @PostMapping("/addSong")
    public void addSongToPlayList(
            @RequestBody RequestAddSongToPlayListDto dataDto, Authentication authentication
            ) {
        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
        String userId = (String)principalDetails.getUser().getId();
        playListService.addSongToPlayList(dataDto, userId);
    }
}
