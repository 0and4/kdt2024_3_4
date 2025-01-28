package com.berry_comment.controller;

import com.berry_comment.service.StreamService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.support.ResourceRegion;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/stream")
@RequiredArgsConstructor
public class StreamController {
    private final StreamService streamService;
    @GetMapping("/play/{songId}")
    public void stream(
            @PathVariable(name = "songId") int songId,
            HttpServletResponse response
            ) {
        streamService.getSongFile(response,songId);
    }
}
