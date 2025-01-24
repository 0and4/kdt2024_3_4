package com.berry_comment.repository;

import com.berry_comment.entity.Song;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SongRepository extends JpaRepository<Song,Long> {
    Song findById(long id);

    //특정 문자열이 들어간 음악을 찾습니다.
    Slice<Song> findByTrackContaining(String track, Pageable pageable);
}
