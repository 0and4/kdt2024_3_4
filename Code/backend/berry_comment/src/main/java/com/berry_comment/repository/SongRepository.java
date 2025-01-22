package com.berry_comment.repository;

import com.berry_comment.entity.Song;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SongRepository extends JpaRepository<Song,Integer> {
}
