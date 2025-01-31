package com.berry_comment.service;

import com.berry_comment.entity.Song;
import com.berry_comment.repository.SongRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.util.InternalException;
import org.openqa.selenium.NotFoundException;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.File;

@Service
@RequiredArgsConstructor
public class StreamService {
    private final SongRepository songRepository;
    public void getSongFile(HttpServletResponse response, int songId) {
        Song song = songRepository.findById(songId);
        if (song == null) throw new EntityNotFoundException("요청하신 곡이 없습니다.");
        String url = song.getUrl();
        if(url.isEmpty()) throw new NotFoundException("해당 곡을 재생할 수 없습니다.");
        String fileServerUrl = String.format("http://localhost:3000/download?url=%s", url);
        try {
            response.sendRedirect(fileServerUrl);
        }catch (Exception e){
            throw new InternalException("서버에 예상치 못한 오류가 발생하였습니다.");
        }

    }
}
