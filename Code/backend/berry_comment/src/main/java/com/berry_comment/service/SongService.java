package com.berry_comment.service;

import com.berry_comment.entity.Song;
import com.berry_comment.repository.SongRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SongService {
    private final SongRepository songRepository;

}
