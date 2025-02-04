package com.berry_comment.controller;

import com.berry_comment.dto.ListInfoDto;
import com.berry_comment.oauth.PrincipalDetails;
import com.berry_comment.service.PlayListService;
import com.berry_comment.service.RecommendService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;


@RequestMapping("/playList/recommend")
@RequiredArgsConstructor
@RestController
public class PlayListControllerAdvance {
    private final RecommendService recommendService;
    @GetMapping("/thumb")
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

    @GetMapping("/detail")
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
    @PostMapping("/add")
    public ResponseEntity<?> recommendAddSongToPlayList(
            @RequestParam(name="id") int id,
            Authentication authentication
    ){
        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
        String userId = (String)principalDetails.getUser().getId();
        recommendService.addPlayListFromRecommendation(userId, id);
        return ResponseEntity.ok("");
    }


}
